/*************************************************************************/
/*  TRANSACTOR 2.0 - FINANCIAL CALCULATIONS
/*  Property transaction cost calculations and financial modeling
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { api } from "./_generated/api"

/*************************************************************************/
/*  STAMP DUTY CALCULATIONS
/*************************************************************************/

export const calculateStampDuty = query({
  args: {
    propertyValue: v.number(),
    state: v.union(
      v.literal("NSW"),
      v.literal("VIC"),
      v.literal("QLD"),
      v.literal("WA"),
      v.literal("SA"),
      v.literal("TAS"),
      v.literal("ACT"),
      v.literal("NT")
    ),
    isFirstHome: v.optional(v.boolean()),
    isInvestor: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { propertyValue, state, isFirstHome = false, isInvestor = false } = args

    let stampDuty = 0
    const exemptions: Array<{ type: string; amount: number }> = []
    const concessions: Array<{ type: string; amount: number }> = []

    // State-specific stamp duty calculations
    switch (state) {
      case "NSW":
        stampDuty = calculateNSWStampDuty(propertyValue)
        if (isFirstHome && propertyValue <= 650000) {
          const concession = Math.min(
            stampDuty,
            calculateFirstHomeBonus(propertyValue, "NSW")
          )
          stampDuty -= concession
          concessions.push({ type: "First Home Buyer", amount: concession })
        }
        break

      case "VIC":
        stampDuty = calculateVICStampDuty(propertyValue)
        if (isFirstHome && propertyValue <= 750000) {
          const concession = Math.min(
            stampDuty,
            calculateFirstHomeBonus(propertyValue, "VIC")
          )
          stampDuty -= concession
          concessions.push({ type: "First Home Buyer", amount: concession })
        }
        break

      case "QLD":
        stampDuty = calculateQLDStampDuty(propertyValue)
        if (isFirstHome && propertyValue <= 550000) {
          exemptions.push({ type: "First Home Concession", amount: stampDuty })
          stampDuty = 0
        }
        break

      // Add other states as needed
      default:
        stampDuty = propertyValue * 0.04 // Generic 4% calculation
    }

    return {
      stampDuty: Math.round(stampDuty),
      exemptions,
      concessions,
      state,
      propertyValue,
      isFirstHome,
      isInvestor,
    }
  },
})

/*************************************************************************/
/*  LOAN CALCULATIONS
/*************************************************************************/

export const calculateLoanRepayments = query({
  args: {
    loanAmount: v.number(),
    interestRate: v.number(), // Annual percentage
    loanTerm: v.number(), // Years
    repaymentFrequency: v.union(
      v.literal("weekly"),
      v.literal("fortnightly"),
      v.literal("monthly")
    ),
    loanType: v.optional(
      v.union(v.literal("principal_and_interest"), v.literal("interest_only"))
    ),
  },
  handler: async (ctx, args) => {
    const {
      loanAmount,
      interestRate,
      loanTerm,
      repaymentFrequency,
      loanType = "principal_and_interest",
    } = args

    const annualRate = interestRate / 100
    let periodsPerYear: number

    switch (repaymentFrequency) {
      case "weekly":
        periodsPerYear = 52
        break
      case "fortnightly":
        periodsPerYear = 26
        break
      case "monthly":
        periodsPerYear = 12
        break
    }

    const periodicRate = annualRate / periodsPerYear
    const totalPayments = loanTerm * periodsPerYear

    let repaymentAmount: number
    let totalInterest: number

    if (loanType === "interest_only") {
      repaymentAmount = loanAmount * periodicRate
      totalInterest = repaymentAmount * totalPayments
    } else {
      // Principal and Interest calculation
      if (periodicRate === 0) {
        repaymentAmount = loanAmount / totalPayments
        totalInterest = 0
      } else {
        repaymentAmount =
          (loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPayments))) /
          (Math.pow(1 + periodicRate, totalPayments) - 1)
        totalInterest = repaymentAmount * totalPayments - loanAmount
      }
    }

    return {
      repaymentAmount: Math.round(repaymentAmount * 100) / 100,
      totalInterest: Math.round(totalInterest),
      totalRepayments: Math.round(repaymentAmount * totalPayments),
      loanDetails: {
        loanAmount,
        interestRate,
        loanTerm,
        repaymentFrequency,
        loanType,
        periodsPerYear,
        totalPayments,
      },
    }
  },
})

export const calculateBorrowingCapacity = query({
  args: {
    income: v.object({
      gross: v.number(),
      net: v.number(),
      frequency: v.union(
        v.literal("weekly"),
        v.literal("monthly"),
        v.literal("annually")
      ),
    }),
    expenses: v.object({
      living: v.number(),
      creditCards: v.optional(v.number()),
      loans: v.optional(v.number()),
      other: v.optional(v.number()),
    }),
    deposit: v.number(),
    interestRate: v.number(), // Current market rate
    loanTerm: v.optional(v.number()),
    debtToIncomeRatio: v.optional(v.number()), // Max DTI ratio
  },
  handler: async (ctx, args) => {
    const {
      income,
      expenses,
      deposit,
      interestRate,
      loanTerm = 30,
      debtToIncomeRatio = 0.5,
    } = args

    // Convert income to annual
    let annualIncome: number
    switch (income.frequency) {
      case "weekly":
        annualIncome = income.gross * 52
        break
      case "monthly":
        annualIncome = income.gross * 12
        break
      case "annually":
        annualIncome = income.gross
        break
    }

    // Calculate total monthly expenses
    const monthlyExpenses =
      expenses.living +
      (expenses.creditCards || 0) +
      (expenses.loans || 0) +
      (expenses.other || 0)

    // Calculate available income for loan repayments
    const monthlyIncome = annualIncome / 12
    const availableIncome = monthlyIncome - monthlyExpenses

    // Calculate maximum loan amount based on serviceability
    const maxMonthlyPayment = availableIncome * 0.8 // 80% of available income
    const monthlyRate = interestRate / 100 / 12
    const totalPayments = loanTerm * 12

    let maxLoanAmount: number
    if (monthlyRate === 0) {
      maxLoanAmount = maxMonthlyPayment * totalPayments
    } else {
      maxLoanAmount =
        (maxMonthlyPayment * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))
    }

    // Apply debt-to-income ratio limits
    const maxLoanByDTI = annualIncome * debtToIncomeRatio

    // Take the lower of the two calculations
    const finalMaxLoan = Math.min(maxLoanAmount, maxLoanByDTI)

    // Calculate maximum property price
    const maxPropertyPrice = finalMaxLoan + deposit

    return {
      maxLoanAmount: Math.round(finalMaxLoan),
      maxPropertyPrice: Math.round(maxPropertyPrice),
      maxMonthlyPayment: Math.round(maxMonthlyPayment),
      availableIncome: Math.round(availableIncome),
      debtToIncomeRatio: Math.round((finalMaxLoan / annualIncome) * 100) / 100,
      calculations: {
        annualIncome: Math.round(annualIncome),
        monthlyIncome: Math.round(monthlyIncome),
        monthlyExpenses: Math.round(monthlyExpenses),
        deposit,
        interestRate,
        loanTerm,
      },
    }
  },
})

/*************************************************************************/
/*  TRANSACTION COST CALCULATIONS
/*************************************************************************/

export const calculateTransactionCosts = query({
  args: {
    propertyValue: v.number(),
    state: v.union(
      v.literal("NSW"),
      v.literal("VIC"),
      v.literal("QLD"),
      v.literal("WA"),
      v.literal("SA"),
      v.literal("TAS"),
      v.literal("ACT"),
      v.literal("NT")
    ),
    loanAmount: v.optional(v.number()),
    isFirstHome: v.optional(v.boolean()),
    includeOptional: v.optional(
      v.object({
        buildingInspection: v.optional(v.boolean()),
        pestInspection: v.optional(v.boolean()),
        valuation: v.optional(v.boolean()),
        insurance: v.optional(v.boolean()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const {
      propertyValue,
      state,
      loanAmount = 0,
      isFirstHome = false,
      includeOptional = {},
    } = args

    const costs = []
    let totalCosts = 0

    // Stamp duty
    const stampDutyResult: any = await ctx.runQuery(api.financials.calculateStampDuty, {
      propertyValue,
      state,
      isFirstHome,
    })
    costs.push({
      category: "Government",
      item: "Stamp Duty",
      amount: stampDutyResult.stampDuty,
      mandatory: true,
    })
    totalCosts += stampDutyResult.stampDuty

    // Legal/Conveyancing fees
    const conveyancingFee = Math.max(1500, propertyValue * 0.001)
    costs.push({
      category: "Legal",
      item: "Conveyancing",
      amount: conveyancingFee,
      mandatory: true,
    })
    totalCosts += conveyancingFee

    // Registration fees
    const registrationFee = getRegistrationFee(state)
    costs.push({
      category: "Government",
      item: "Title Registration",
      amount: registrationFee,
      mandatory: true,
    })
    totalCosts += registrationFee

    // Mortgage registration (if loan)
    if (loanAmount > 0) {
      const mortgageRegistration = getMortgageRegistrationFee(state)
      costs.push({
        category: "Government",
        item: "Mortgage Registration",
        amount: mortgageRegistration,
        mandatory: true,
      })
      totalCosts += mortgageRegistration

      // Lenders Mortgage Insurance (LMI)
      const lvrRatio = loanAmount / propertyValue
      if (lvrRatio > 0.8) {
        const lmiCost = calculateLMI(loanAmount, propertyValue)
        costs.push({
          category: "Insurance",
          item: "Lenders Mortgage Insurance",
          amount: lmiCost,
          mandatory: true,
        })
        totalCosts += lmiCost
      }
    }

    // Optional costs
    if (includeOptional.buildingInspection) {
      costs.push({
        category: "Inspection",
        item: "Building Inspection",
        amount: 500,
        mandatory: false,
      })
      totalCosts += 500
    }

    if (includeOptional.pestInspection) {
      costs.push({
        category: "Inspection",
        item: "Pest Inspection",
        amount: 300,
        mandatory: false,
      })
      totalCosts += 300
    }

    if (includeOptional.valuation) {
      costs.push({
        category: "Assessment",
        item: "Property Valuation",
        amount: 400,
        mandatory: false,
      })
      totalCosts += 400
    }

    if (includeOptional.insurance) {
      const annualInsurance = propertyValue * 0.002 // 0.2% of property value
      costs.push({
        category: "Insurance",
        item: "Building Insurance (Annual)",
        amount: annualInsurance,
        mandatory: false,
      })
      totalCosts += annualInsurance
    }

    // Categorize costs
    const costsByCategory = costs.reduce(
      (acc, cost) => {
        if (!acc[cost.category]) {
          acc[cost.category] = []
        }
        acc[cost.category].push(cost)
        return acc
      },
      {} as Record<string, typeof costs>
    )

    return {
      totalCosts: Math.round(totalCosts),
      mandatoryCosts: Math.round(
        costs.filter(c => c.mandatory).reduce((sum, c) => sum + c.amount, 0)
      ),
      optionalCosts: Math.round(
        costs.filter(c => !c.mandatory).reduce((sum, c) => sum + c.amount, 0)
      ),
      costsByCategory,
      breakdown: costs.map(cost => ({
        ...cost,
        amount: Math.round(cost.amount),
      })),
      summary: {
        propertyValue,
        state,
        loanAmount,
        isFirstHome,
        stampDutyBreakdown: stampDutyResult,
      },
    }
  },
})

/*************************************************************************/
/*  INVESTMENT ANALYSIS
/*************************************************************************/

export const calculateRentalYield = query({
  args: {
    propertyValue: v.number(),
    weeklyRent: v.number(),
    expenses: v.optional(
      v.object({
        management: v.optional(v.number()), // Percentage
        maintenance: v.optional(v.number()), // Annual amount
        insurance: v.optional(v.number()), // Annual amount
        rates: v.optional(v.number()), // Annual amount
        vacancy: v.optional(v.number()), // Percentage
      })
    ),
  },
  handler: async (ctx, args) => {
    const { propertyValue, weeklyRent, expenses = {} } = args

    const annualRent = weeklyRent * 52

    // Calculate expenses
    const managementFees = annualRent * (expenses.management || 0.08) // Default 8%
    const maintenance = expenses.maintenance || propertyValue * 0.01 // Default 1%
    const insurance = expenses.insurance || propertyValue * 0.002 // Default 0.2%
    const rates = expenses.rates || propertyValue * 0.01 // Default 1%
    const vacancyLoss = annualRent * (expenses.vacancy || 0.04) // Default 4%

    const totalExpenses = managementFees + maintenance + insurance + rates + vacancyLoss
    const netRent = annualRent - totalExpenses

    const grossYield = (annualRent / propertyValue) * 100
    const netYield = (netRent / propertyValue) * 100

    return {
      grossYield: Math.round(grossYield * 100) / 100,
      netYield: Math.round(netYield * 100) / 100,
      annualRent: Math.round(annualRent),
      netAnnualRent: Math.round(netRent),
      expenses: {
        management: Math.round(managementFees),
        maintenance: Math.round(maintenance),
        insurance: Math.round(insurance),
        rates: Math.round(rates),
        vacancy: Math.round(vacancyLoss),
        total: Math.round(totalExpenses),
      },
      calculations: {
        propertyValue,
        weeklyRent,
        expenseRatio: Math.round((totalExpenses / annualRent) * 100) / 100,
      },
    }
  },
})

/*************************************************************************/
/*  UTILITY FUNCTIONS
/*************************************************************************/

// NSW Stamp Duty calculation
function calculateNSWStampDuty(value: number): number {
  if (value <= 14000) return (1.25 * value) / 100
  if (value <= 32000) return 175 + (1.5 * (value - 14000)) / 100
  if (value <= 85000) return 445 + (1.75 * (value - 32000)) / 100
  if (value <= 319000) return 1372.5 + (3.5 * (value - 85000)) / 100
  if (value <= 1064000) return 9562.5 + (4.5 * (value - 319000)) / 100
  return 43087.5 + (5.5 * (value - 1064000)) / 100
}

// VIC Stamp Duty calculation
function calculateVICStampDuty(value: number): number {
  if (value <= 25000) return (1.4 * value) / 100
  if (value <= 130000) return 350 + (2.4 * (value - 25000)) / 100
  if (value <= 960000) return 2870 + (5 * (value - 130000)) / 100
  return 44370 + (6.5 * (value - 960000)) / 100
}

// QLD Stamp Duty calculation
function calculateQLDStampDuty(value: number): number {
  if (value <= 5000) return 0
  if (value <= 75000) return (1.5 * (value - 5000)) / 100
  if (value <= 540000) return 1050 + (3.5 * (value - 75000)) / 100
  if (value <= 1000000) return 17325 + (4.5 * (value - 540000)) / 100
  return 38025 + (5.75 * (value - 1000000)) / 100
}

// First Home Buyer calculations
function calculateFirstHomeBonus(value: number, state: string): number {
  switch (state) {
    case "NSW":
      if (value <= 650000) return Math.max(0, 8750 - (value - 650000) * 0.25)
      return 0
    case "VIC":
      if (value <= 600000) return calculateVICStampDuty(value)
      if (value <= 750000)
        return (calculateVICStampDuty(value) * (750000 - value)) / 150000
      return 0
    default:
      return 0
  }
}

// Registration fees by state
function getRegistrationFee(state: string): number {
  const fees: Record<string, number> = {
    NSW: 126.7,
    VIC: 126.9,
    QLD: 195.3,
    WA: 174.0,
    SA: 174.0,
    TAS: 133.9,
    ACT: 419.0,
    NT: 158.0,
  }
  return fees[state] || 150
}

// Mortgage registration fees by state
function getMortgageRegistrationFee(state: string): number {
  const fees: Record<string, number> = {
    NSW: 126.7,
    VIC: 126.9,
    QLD: 195.3,
    WA: 174.0,
    SA: 174.0,
    TAS: 133.9,
    ACT: 419.0,
    NT: 158.0,
  }
  return fees[state] || 150
}

// LMI calculation (simplified)
function calculateLMI(loanAmount: number, propertyValue: number): number {
  const lvrRatio = loanAmount / propertyValue

  if (lvrRatio <= 0.8) return 0
  if (lvrRatio <= 0.85) return loanAmount * 0.006
  if (lvrRatio <= 0.9) return loanAmount * 0.012
  if (lvrRatio <= 0.95) return loanAmount * 0.024
  return loanAmount * 0.034
}
