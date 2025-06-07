/*************************************************************************/
/*  TRANSACTOR 2.0 - COMPREHENSIVE SEEDING DATA
/*  Realistic Australian Property Market Data for Development & Testing
/*  Based on planning documentation requirements
/*************************************************************************/

import { Id } from "./_generated/dataModel"

/*************************************************************************/
/*  SERVICE PROVIDERS - MARKETPLACE SEEDING
/*************************************************************************/

export const serviceProviders = [
  // Melbourne Conveyancers
  {
    businessName: "Collins Street Conveyancing",
    serviceType: "conveyancing" as const,
    credentials: {
      licenseNumber: "LC001234",
      accreditation: ["Law Institute of Victoria", "ACDC"],
      yearsExperience: 15,
      insuranceDetails: "Professional Indemnity $2M",
    },
    serviceAreas: ["3000", "3141", "3121", "3142", "3181"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 1200,
      details:
        "$1,200 fixed fee for standard purchases. Includes searches, contract review, settlement.",
    },
    ratings: {
      averageRating: 4.8,
      totalReviews: 156,
      responseTime: 4,
      completionRate: 96,
    },
    availability: {
      currentCapacity: 18,
      maxCapacity: 25,
      nextAvailable: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days
    },
    status: "active" as const,
  },
  {
    businessName: "Richmond Property Legal",
    serviceType: "conveyancing" as const,
    credentials: {
      licenseNumber: "LC005678",
      accreditation: ["Law Institute of Victoria"],
      yearsExperience: 8,
      insuranceDetails: "Professional Indemnity $1.5M",
    },
    serviceAreas: ["3121", "3123", "3124", "3141", "3181"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 950,
      details: "$950 for apartments, $1,100 for houses. First home buyer discount 10%.",
    },
    ratings: {
      averageRating: 4.6,
      totalReviews: 89,
      responseTime: 6,
      completionRate: 94,
    },
    availability: {
      currentCapacity: 12,
      maxCapacity: 20,
      nextAvailable: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    },
    status: "active" as const,
  },
  {
    businessName: "Brighton Bay Legal Services",
    serviceType: "conveyancing" as const,
    credentials: {
      licenseNumber: "LC009012",
      accreditation: ["Law Institute of Victoria", "ACDC"],
      yearsExperience: 22,
      insuranceDetails: "Professional Indemnity $3M",
    },
    serviceAreas: ["3186", "3187", "3188", "3189", "3142"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 1650,
      details:
        "$1,650 premium service. Includes priority processing, extended hours support.",
    },
    ratings: {
      averageRating: 4.9,
      totalReviews: 234,
      responseTime: 2,
      completionRate: 98,
    },
    availability: {
      currentCapacity: 15,
      maxCapacity: 18,
      nextAvailable: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days
    },
    status: "active" as const,
  },

  // Sydney Conveyancers
  {
    businessName: "Harbour City Conveyancing",
    serviceType: "conveyancing" as const,
    credentials: {
      licenseNumber: "LC101234",
      accreditation: ["Law Society of NSW", "ACDC"],
      yearsExperience: 18,
      insuranceDetails: "Professional Indemnity $2.5M",
    },
    serviceAreas: ["2000", "2060", "2061", "2062", "2065"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 1400,
      details:
        "$1,400 standard fee. Includes all searches, contract review, PEXA settlement.",
    },
    ratings: {
      averageRating: 4.7,
      totalReviews: 198,
      responseTime: 5,
      completionRate: 95,
    },
    availability: {
      currentCapacity: 22,
      maxCapacity: 30,
      nextAvailable: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
    },
    status: "active" as const,
  },
  {
    businessName: "Parramatta Property Partners",
    serviceType: "conveyancing" as const,
    credentials: {
      licenseNumber: "LC105678",
      accreditation: ["Law Society of NSW"],
      yearsExperience: 12,
      insuranceDetails: "Professional Indemnity $2M",
    },
    serviceAreas: ["2150", "2151", "2152", "2153", "2154"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 1100,
      details: "$1,100 for standard purchases. Bulk discount for multiple properties.",
    },
    ratings: {
      averageRating: 4.5,
      totalReviews: 156,
      responseTime: 8,
      completionRate: 92,
    },
    availability: {
      currentCapacity: 16,
      maxCapacity: 25,
      nextAvailable: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    },
    status: "active" as const,
  },

  // Brisbane Conveyancers
  {
    businessName: "River City Legal",
    serviceType: "conveyancing" as const,
    credentials: {
      licenseNumber: "LC201234",
      accreditation: ["Queensland Law Society", "ACDC"],
      yearsExperience: 14,
      insuranceDetails: "Professional Indemnity $2M",
    },
    serviceAreas: ["4000", "4005", "4006", "4007", "4064"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 980,
      details: "$980 standard fee. No hidden costs, includes all standard searches.",
    },
    ratings: {
      averageRating: 4.6,
      totalReviews: 142,
      responseTime: 6,
      completionRate: 94,
    },
    availability: {
      currentCapacity: 14,
      maxCapacity: 20,
      nextAvailable: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days
    },
    status: "active" as const,
  },

  // Mortgage Brokers - Melbourne
  {
    businessName: "Melbourne Home Finance",
    serviceType: "mortgage_broker" as const,
    credentials: {
      licenseNumber: "MB401234",
      accreditation: ["MFAA", "CRB"],
      yearsExperience: 11,
      insuranceDetails: "Professional Indemnity $1M",
    },
    serviceAreas: ["3000", "3121", "3141", "3181", "3186", "3187"],
    pricing: {
      feeStructure: "percentage" as const,
      details: "Lender paid commission. No client fees for standard loans.",
    },
    ratings: {
      averageRating: 4.8,
      totalReviews: 267,
      responseTime: 3,
      completionRate: 97,
    },
    availability: {
      currentCapacity: 35,
      maxCapacity: 50,
      nextAvailable: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    },
    status: "active" as const,
  },
  {
    businessName: "First Home Loan Specialists",
    serviceType: "mortgage_broker" as const,
    credentials: {
      licenseNumber: "MB405678",
      accreditation: ["FBAA", "CRB"],
      yearsExperience: 7,
      insuranceDetails: "Professional Indemnity $1M",
    },
    serviceAreas: ["3000", "3181", "3121", "3141", "3123", "3124"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 0,
      details: "Free for first home buyers. Lender commission only.",
    },
    ratings: {
      averageRating: 4.9,
      totalReviews: 189,
      responseTime: 2,
      completionRate: 98,
    },
    availability: {
      currentCapacity: 28,
      maxCapacity: 40,
      nextAvailable: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    },
    status: "active" as const,
  },

  // Building Inspectors
  {
    businessName: "Complete Building Inspections",
    serviceType: "building_inspector" as const,
    credentials: {
      licenseNumber: "BI601234",
      accreditation: ["RICS", "MBA"],
      yearsExperience: 16,
      insuranceDetails: "Professional Indemnity $2M, Public Liability $10M",
    },
    serviceAreas: ["3000", "3121", "3141", "3181", "3186", "3187", "3123"],
    pricing: {
      feeStructure: "fixed" as const,
      basePrice: 450,
      details: "$450 for combined building & pest inspection. Same day reports.",
    },
    ratings: {
      averageRating: 4.7,
      totalReviews: 324,
      responseTime: 12,
      completionRate: 96,
    },
    availability: {
      currentCapacity: 8,
      maxCapacity: 12,
      nextAvailable: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
    },
    status: "active" as const,
  },
]

/*************************************************************************/
/*  SAMPLE PROPERTIES - REALISTIC LISTINGS
/*************************************************************************/

export const sampleProperties = [
  // Melbourne Properties
  {
    address: {
      street: "45 Flinders Lane",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      country: "AU" as const,
    },
    coordinates: { lat: -37.817, lon: 144.9686 },
    propertyDetails: {
      type: "apartment" as const,
      bedrooms: 1,
      bathrooms: 1,
      carSpaces: 0,
      buildingSize: 52,
      yearBuilt: 2018,
    },
    valuation: {
      estimatedValue: 485000,
      lastUpdated: Date.now() - 7 * 24 * 60 * 60 * 1000,
      source: "domain" as const,
      confidence: "high" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
  {
    address: {
      street: "123 Swan Street",
      suburb: "Richmond",
      state: "VIC",
      postcode: "3121",
      country: "AU" as const,
    },
    coordinates: { lat: -37.8197, lon: 144.9942 },
    propertyDetails: {
      type: "townhouse" as const,
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      landSize: 120,
      buildingSize: 95,
      yearBuilt: 2020,
    },
    valuation: {
      estimatedValue: 725000,
      lastUpdated: Date.now() - 3 * 24 * 60 * 60 * 1000,
      source: "corelogic" as const,
      confidence: "high" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
  {
    address: {
      street: "67 Chapel Street",
      suburb: "South Yarra",
      state: "VIC",
      postcode: "3141",
      country: "AU" as const,
    },
    coordinates: { lat: -37.8386, lon: 144.9888 },
    propertyDetails: {
      type: "apartment" as const,
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      buildingSize: 78,
      yearBuilt: 2019,
    },
    valuation: {
      estimatedValue: 650000,
      lastUpdated: Date.now() - 5 * 24 * 60 * 60 * 1000,
      source: "domain" as const,
      confidence: "medium" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
  {
    address: {
      street: "234 High Street",
      suburb: "Northcote",
      state: "VIC",
      postcode: "3070",
      country: "AU" as const,
    },
    coordinates: { lat: -37.7655, lon: 144.995 },
    propertyDetails: {
      type: "house" as const,
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      landSize: 350,
      buildingSize: 140,
      yearBuilt: 1985,
    },
    valuation: {
      estimatedValue: 890000,
      lastUpdated: Date.now() - 10 * 24 * 60 * 60 * 1000,
      source: "corelogic" as const,
      confidence: "high" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },

  // Sydney Properties
  {
    address: {
      street: "88 George Street",
      suburb: "Sydney",
      state: "NSW",
      postcode: "2000",
      country: "AU" as const,
    },
    coordinates: { lat: -33.8688, lon: 151.2093 },
    propertyDetails: {
      type: "apartment" as const,
      bedrooms: 1,
      bathrooms: 1,
      carSpaces: 0,
      buildingSize: 48,
      yearBuilt: 2017,
    },
    valuation: {
      estimatedValue: 685000,
      lastUpdated: Date.now() - 4 * 24 * 60 * 60 * 1000,
      source: "domain" as const,
      confidence: "high" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
  {
    address: {
      street: "156 Parramatta Road",
      suburb: "Leichhardt",
      state: "NSW",
      postcode: "2040",
      country: "AU" as const,
    },
    coordinates: { lat: -33.8836, lon: 151.1584 },
    propertyDetails: {
      type: "house" as const,
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      landSize: 280,
      buildingSize: 120,
      yearBuilt: 1995,
    },
    valuation: {
      estimatedValue: 1250000,
      lastUpdated: Date.now() - 6 * 24 * 60 * 60 * 1000,
      source: "corelogic" as const,
      confidence: "medium" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
  {
    address: {
      street: "45 Church Street",
      suburb: "Parramatta",
      state: "NSW",
      postcode: "2150",
      country: "AU" as const,
    },
    coordinates: { lat: -33.815, lon: 151.001 },
    propertyDetails: {
      type: "apartment" as const,
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      buildingSize: 85,
      yearBuilt: 2021,
    },
    valuation: {
      estimatedValue: 780000,
      lastUpdated: Date.now() - 2 * 24 * 60 * 60 * 1000,
      source: "domain" as const,
      confidence: "high" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },

  // Brisbane Properties
  {
    address: {
      street: "77 Queen Street",
      suburb: "Brisbane",
      state: "QLD",
      postcode: "4000",
      country: "AU" as const,
    },
    coordinates: { lat: -27.4698, lon: 153.0251 },
    propertyDetails: {
      type: "apartment" as const,
      bedrooms: 2,
      bathrooms: 2,
      carSpaces: 1,
      buildingSize: 75,
      yearBuilt: 2019,
    },
    valuation: {
      estimatedValue: 520000,
      lastUpdated: Date.now() - 8 * 24 * 60 * 60 * 1000,
      source: "domain" as const,
      confidence: "high" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
  {
    address: {
      street: "234 Brunswick Street",
      suburb: "New Farm",
      state: "QLD",
      postcode: "4005",
      country: "AU" as const,
    },
    coordinates: { lat: -27.4667, lon: 153.0515 },
    propertyDetails: {
      type: "house" as const,
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      landSize: 405,
      buildingSize: 165,
      yearBuilt: 1920,
    },
    valuation: {
      estimatedValue: 850000,
      lastUpdated: Date.now() - 12 * 24 * 60 * 60 * 1000,
      source: "corelogic" as const,
      confidence: "medium" as const,
    },
    stakeholders: [],
    status: "active" as const,
  },
]

/*************************************************************************/
/*  MARKET INTELLIGENCE DATA
/*************************************************************************/

export const marketData = [
  // Melbourne Markets
  {
    suburb: "Melbourne",
    postcode: "3000",
    propertyType: "apartment" as const,
    metrics: {
      medianPrice: 520000,
      priceGrowth: {
        quarterly: 2.1,
        yearly: 8.5,
        fiveYear: 42.3,
      },
      salesVolume: 156,
      daysOnMarket: 32,
      auctionClearanceRate: 78,
      rentalYield: 4.2,
    },
    demographics: {
      populationGrowth: 2.8,
      medianAge: 31,
      medianIncome: 68500,
      ownerOccupierRate: 45,
    },
    infrastructure: {
      transportScore: 10,
      schoolRatings: [950, 920, 975],
      amenitiesScore: 9,
      futureProjects: ["Metro Tunnel", "Queen Victoria Market Renewal"],
    },
    dataSource: "corelogic" as const,
    timestamp: Date.now(),
  },
  {
    suburb: "Richmond",
    postcode: "3121",
    propertyType: "townhouse" as const,
    metrics: {
      medianPrice: 785000,
      priceGrowth: {
        quarterly: 3.2,
        yearly: 11.2,
        fiveYear: 48.7,
      },
      salesVolume: 89,
      daysOnMarket: 28,
      auctionClearanceRate: 82,
      rentalYield: 3.8,
    },
    demographics: {
      populationGrowth: 1.9,
      medianAge: 34,
      medianIncome: 72000,
      ownerOccupierRate: 52,
    },
    infrastructure: {
      transportScore: 9,
      schoolRatings: [890, 920, 905],
      amenitiesScore: 8,
      futureProjects: ["Richmond Station Upgrade"],
    },
    dataSource: "domain" as const,
    timestamp: Date.now(),
  },
  {
    suburb: "South Yarra",
    postcode: "3141",
    propertyType: "apartment" as const,
    metrics: {
      medianPrice: 680000,
      priceGrowth: {
        quarterly: 1.8,
        yearly: 7.3,
        fiveYear: 38.2,
      },
      salesVolume: 234,
      daysOnMarket: 35,
      auctionClearanceRate: 75,
      rentalYield: 4.1,
    },
    demographics: {
      populationGrowth: 2.1,
      medianAge: 29,
      medianIncome: 85000,
      ownerOccupierRate: 38,
    },
    infrastructure: {
      transportScore: 9,
      schoolRatings: [920, 945, 930],
      amenitiesScore: 9,
      futureProjects: ["Chapel Street Revitalization"],
    },
    dataSource: "corelogic" as const,
    timestamp: Date.now(),
  },

  // Sydney Markets
  {
    suburb: "Sydney",
    postcode: "2000",
    propertyType: "apartment" as const,
    metrics: {
      medianPrice: 750000,
      priceGrowth: {
        quarterly: 1.5,
        yearly: 6.2,
        fiveYear: 35.8,
      },
      salesVolume: 198,
      daysOnMarket: 38,
      auctionClearanceRate: 71,
      rentalYield: 3.9,
    },
    demographics: {
      populationGrowth: 3.2,
      medianAge: 32,
      medianIncome: 75000,
      ownerOccupierRate: 42,
    },
    infrastructure: {
      transportScore: 10,
      schoolRatings: [980, 965, 955],
      amenitiesScore: 10,
      futureProjects: ["Sydney Metro West", "Central Station Upgrade"],
    },
    dataSource: "domain" as const,
    timestamp: Date.now(),
  },
  {
    suburb: "Parramatta",
    postcode: "2150",
    propertyType: "apartment" as const,
    metrics: {
      medianPrice: 820000,
      priceGrowth: {
        quarterly: 4.1,
        yearly: 14.2,
        fiveYear: 52.1,
      },
      salesVolume: 167,
      daysOnMarket: 25,
      auctionClearanceRate: 85,
      rentalYield: 4.3,
    },
    demographics: {
      populationGrowth: 4.1,
      medianAge: 35,
      medianIncome: 68000,
      ownerOccupierRate: 48,
    },
    infrastructure: {
      transportScore: 8,
      schoolRatings: [870, 890, 885],
      amenitiesScore: 7,
      futureProjects: ["Parramatta Light Rail", "Powerhouse Museum"],
    },
    dataSource: "corelogic" as const,
    timestamp: Date.now(),
  },

  // Brisbane Markets
  {
    suburb: "Brisbane",
    postcode: "4000",
    propertyType: "apartment" as const,
    metrics: {
      medianPrice: 545000,
      priceGrowth: {
        quarterly: 3.8,
        yearly: 12.5,
        fiveYear: 45.2,
      },
      salesVolume: 142,
      daysOnMarket: 22,
      auctionClearanceRate: 68,
      rentalYield: 4.8,
    },
    demographics: {
      populationGrowth: 2.9,
      medianAge: 33,
      medianIncome: 62000,
      ownerOccupierRate: 46,
    },
    infrastructure: {
      transportScore: 8,
      schoolRatings: [880, 900, 875],
      amenitiesScore: 8,
      futureProjects: ["Cross River Rail", "Queen's Wharf Development"],
    },
    dataSource: "domain" as const,
    timestamp: Date.now(),
  },
]

/*************************************************************************/
/*  FINANCIAL REFERENCE DATA
/*************************************************************************/

export const interestRates = [
  {
    lender: "Commonwealth Bank",
    productType: "Variable Owner Occupier",
    rate: 6.19,
    comparisonRate: 6.21,
    features: ["Offset Account", "Redraw Facility", "Split Loans"],
    lastUpdated: Date.now(),
  },
  {
    lender: "Westpac",
    productType: "Variable Owner Occupier",
    rate: 6.25,
    comparisonRate: 6.27,
    features: ["Offset Account", "Redraw Facility"],
    lastUpdated: Date.now(),
  },
  {
    lender: "ANZ",
    productType: "Fixed 3 Year Owner Occupier",
    rate: 6.09,
    comparisonRate: 6.34,
    features: ["Rate Lock", "Extra Repayments"],
    lastUpdated: Date.now(),
  },
  {
    lender: "NAB",
    productType: "Variable First Home Buyer",
    rate: 5.99,
    comparisonRate: 6.01,
    features: ["Offset Account", "No Monthly Fees", "First Home Buyer Package"],
    lastUpdated: Date.now(),
  },
  {
    lender: "Macquarie Bank",
    productType: "Variable Investment",
    rate: 6.45,
    comparisonRate: 6.47,
    features: ["Offset Account", "Interest Only Option"],
    lastUpdated: Date.now(),
  },
]

export const stampDutyRates = {
  VIC: {
    rates: [
      { threshold: 25000, rate: 1.4 },
      { threshold: 130000, rate: 2.4 },
      { threshold: 960000, rate: 5.5 },
      { threshold: Infinity, rate: 6.5 },
    ],
    firstHomeBuyerExemption: 600000,
    foreignBuyerSurcharge: 8.0,
  },
  NSW: {
    rates: [
      { threshold: 14000, rate: 1.25 },
      { threshold: 32000, rate: 1.5 },
      { threshold: 85000, rate: 1.75 },
      { threshold: 319000, rate: 3.5 },
      { threshold: 1033000, rate: 4.5 },
      { threshold: Infinity, rate: 5.5 },
    ],
    firstHomeBuyerExemption: 800000,
    foreignBuyerSurcharge: 8.0,
  },
  QLD: {
    rates: [
      { threshold: 5000, rate: 1.5 },
      { threshold: 75000, rate: 3.5 },
      { threshold: 540000, rate: 4.5 },
      { threshold: 1000000, rate: 5.75 },
      { threshold: Infinity, rate: 6.75 },
    ],
    firstHomeBuyerExemption: 700000,
    foreignBuyerSurcharge: 7.0,
  },
}

export const firstHomeBuyerGrants = {
  VIC: {
    amount: 10000,
    priceThreshold: 750000,
    propertyType: "new",
    description: "First Home Owner Grant for new builds up to $750,000",
  },
  NSW: {
    amount: 10000,
    priceThreshold: 750000,
    propertyType: "new",
    description:
      "First Home Owner Grant for new builds, plus stamp duty exemption up to $800,000",
  },
  QLD: {
    amount: 15000,
    priceThreshold: 750000,
    propertyType: "new",
    description: "First Home Owner Grant for new builds up to $750,000",
  },
}

/*************************************************************************/
/*  SAMPLE USER PERSONAS
/*************************************************************************/

export const sampleUserProfiles = {
  chloe: {
    user: {
      email: "chloe.smith@example.com",
      role: "buyer" as const,
      profile: {
        firstName: "Chloe",
        lastName: "Smith",
        preferredName: "Chloe",
      },
      preferences: {
        notifications: { email: true, sms: true, push: true },
        timezone: "Australia/Melbourne",
        language: "en" as const,
      },
      status: "active" as const,
    },
    financialProfile: {
      employment: {
        status: "employed" as const,
        income: { gross: 85000, net: 65000, frequency: "annually" as const },
        employer: "Tech Startup Melbourne",
        yearsInRole: 2.5,
        stability: "permanent" as const,
      },
      assets: { savings: 45000, propertyEquity: 0, superannuation: 32000, other: 5000 },
      liabilities: {
        creditCards: 2500,
        personalLoans: 0,
        existingMortgage: 0,
        other: 1200,
      },
      borrowingCapacity: {
        amount: 425000,
        calculatedAt: Date.now(),
        assumptions: { rate: 6.2, term: 30, expenses: 3200 },
        stressTestPassed: true,
      },
      firstHomeBuyer: true,
      governmentGrants: { eligible: ["VIC_FHOG"], applied: [], received: [] },
      verified: false,
    },
  },
  raj: {
    user: {
      email: "raj.patel@example.com",
      role: "seller" as const,
      profile: {
        firstName: "Raj",
        lastName: "Patel",
        preferredName: "Raj",
      },
      preferences: {
        notifications: { email: true, sms: false, push: true },
        timezone: "Australia/Melbourne",
        language: "en" as const,
      },
      status: "active" as const,
    },
    financialProfile: {
      employment: {
        status: "employed" as const,
        income: { gross: 120000, net: 89000, frequency: "annually" as const },
        employer: "Engineering Consulting",
        yearsInRole: 8,
        stability: "permanent" as const,
      },
      assets: {
        savings: 65000,
        propertyEquity: 450000,
        superannuation: 185000,
        other: 15000,
      },
      liabilities: {
        creditCards: 5500,
        personalLoans: 0,
        existingMortgage: 400000,
        other: 0,
      },
      borrowingCapacity: {
        amount: 850000,
        calculatedAt: Date.now(),
        assumptions: { rate: 6.2, term: 25, expenses: 4200 },
        stressTestPassed: true,
      },
      firstHomeBuyer: false,
      governmentGrants: { eligible: [], applied: [], received: [] },
      verified: true,
    },
  },
  sarah: {
    user: {
      email: "sarah.wong@example.com",
      role: "investor" as const,
      profile: {
        firstName: "Sarah",
        lastName: "Wong",
        preferredName: "Sarah",
      },
      preferences: {
        notifications: { email: true, sms: true, push: false },
        timezone: "Australia/Sydney",
        language: "en" as const,
      },
      status: "active" as const,
    },
    financialProfile: {
      employment: {
        status: "employed" as const,
        income: { gross: 145000, net: 105000, frequency: "annually" as const },
        employer: "Investment Banking",
        yearsInRole: 6,
        stability: "permanent" as const,
      },
      assets: {
        savings: 125000,
        propertyEquity: 530000,
        superannuation: 220000,
        other: 45000,
      },
      liabilities: {
        creditCards: 8500,
        personalLoans: 0,
        existingMortgage: 420000,
        other: 0,
      },
      borrowingCapacity: {
        amount: 950000,
        calculatedAt: Date.now(),
        assumptions: { rate: 6.45, term: 30, expenses: 5200 },
        stressTestPassed: true,
      },
      firstHomeBuyer: false,
      governmentGrants: { eligible: [], applied: [], received: [] },
      verified: true,
    },
  },
}
