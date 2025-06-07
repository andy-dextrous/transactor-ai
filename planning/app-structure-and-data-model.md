# Transactor 2.0 - App Structure & Data Model

**Version:** 1.0  
**Date:** January 2025  
**Purpose:** Comprehensive technical blueprint for the AI-driven property concierge platform

---

## 1. Application Architecture Overview

### 1.1 Technology Stack Integration

Based on the package.json analysis, the application leverages:

- **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom design system
- **Real-time Backend**: Convex for database, auth, and AI agents
- **AI Orchestration**: `@convex-dev/agent` for durable AI workflows
- **Animations**: GSAP with React integration
- **Data Visualization**: Recharts for financial tools
- **Form Management**: React Hook Form with Zod validation

### 1.2 Agent-First Architecture Philosophy

The application operates as an **AI orchestration platform** where every user interaction triggers intelligent agent workflows. The system emphasizes:

1. **Proactive Intelligence**: Agents anticipate user needs rather than waiting for commands
2. **Context Persistence**: Every conversation and action builds on previous context
3. **Workflow Automation**: Complex property transactions are decomposed into managed workflows
4. **Real-time Collaboration**: All stakeholders share a unified, live workspace

---

## 2. Route Structure & User Journeys

### 2.1 Core Route Architecture

```
/
├── (onboarding)/
│   ├── role-selection        # Initial role picker with chat interface
│   ├── buyer-onboarding      # Property search & financial readiness
│   ├── seller-onboarding     # Property details & market analysis
│   ├── investor-onboarding   # Portfolio goals & strategy
│   └── professional-setup    # Service provider registration
│
├── dashboard/
│   ├── chat                  # Persistent AI conversation thread
│   ├── timeline              # Visual milestone tracker
│   ├── documents             # AI-enhanced document management
│   ├── connections           # Professional network & marketplace
│   ├── finance-lab           # Financial calculators & tools
│   ├── equity-studio         # Property valuation & equity analysis
│   └── notifications         # Smart alerts & reminders
│
├── marketplace/
│   ├── providers/[type]      # Conveyancers, brokers, inspectors
│   ├── quotes                # Request & manage quotes
│   └── reviews               # Provider ratings & feedback
│
├── workflows/
│   ├── purchase/[propertyId] # End-to-end buying journey
│   ├── sale/[propertyId]     # End-to-end selling journey
│   └── finance/[applicationId] # Loan application tracking
│
└── api/
    ├── convex/               # Convex endpoints
    ├── webhooks/             # External system integrations
    └── agents/               # AI agent management
```

### 2.2 User Journey Flows

#### 2.2.1 First-Time Buyer Journey (Chloe, 28)

**Entry Point**: `/` → Role selection → "I want to buy my first home"

**Agent Orchestration Flow**:

1. **OrchestratorAgent** spins up **BuyerAgent** + **FinanceAgent**
2. **Chat Onboarding** (5-10 minutes):
   - Financial situation assessment
   - Deposit savings & borrowing capacity
   - Property preferences (location, type, budget)
   - First-home buyer grants eligibility check

**Primary Routes & AI Functions**:

- `/dashboard/chat` - Persistent conversation with BuyerAgent
- `/dashboard/finance-lab` - Stamp duty calculators, loan scenarios
- `/dashboard/timeline` - Auto-generated purchase milestones
- `/marketplace/providers/conveyancer` - Matched professionals with quotes

**AI-Powered UX**:

- Auto-populated property searches based on chat preferences
- Proactive alerts: "New listings match your criteria"
- Financial coaching: "Increase your deposit by $50/week to save $8,000 in stamp duty"
- Timeline management: "Contract signed! Your cooling-off period ends in 4 days"

#### 2.2.2 Upgrader Seller Journey (Raj, 41)

**Entry Point**: `/` → "I want to sell and buy simultaneously"

**Agent Orchestration Flow**:

1. **OrchestratorAgent** creates linked **SellerAgent** + **BuyerAgent**
2. **Dual Timeline Management** - coordinated settlement dates
3. **EquityAgent** calculates available capital from current property

**Key Routes & AI Functions**:

- `/dashboard/equity-studio` - Current property valuation & usable equity
- `/workflows/sale/[currentProperty]` - Sale timeline with marketing milestones
- `/workflows/purchase/[targetProperty]` - Purchase timeline synchronized with sale
- `/dashboard/chat` - Unified conversation managing both transactions

**AI-Powered UX**:

- Cross-transaction risk monitoring: "Your sale settlement is 2 weeks after purchase - consider bridging finance"
- Market timing advice: "List now for spring market, target purchase in 6 weeks"
- Equity optimization: "Your home's value increased $80K - here's how to leverage this"

#### 2.2.3 Professional User Journey (Kylie, Conveyancer)

**Entry Point**: `/` → "I'm a conveyancer seeking leads"

**Agent Orchestration Flow**:

1. **ProviderAgent** manages professional profile & availability
2. **MatchAgent** surfaces relevant client opportunities
3. **WorkflowAgent** automates client communication & milestone updates

**Primary Routes & AI Functions**:

- `/dashboard/leads` - AI-matched client opportunities
- `/dashboard/workflows` - Active client transaction tracking
- `/marketplace/profile` - Professional profile & rating management
- `/dashboard/chat` - Multi-client conversation management

**AI-Powered UX**:

- Lead qualification: "3 high-match buyers need conveyancing in your area"
- Automated client updates: "Milestone reached - client automatically notified"
- Workload optimization: "Current capacity allows 2 more clients this month"

#### 2.2.4 Post-Purchase Legal Support Journey (Michael, Recent Buyer)

**Entry Point**: `/` → "I need legal help after buying my property"

**Agent Orchestration Flow**:

1. **OrchestratorAgent** spins up **LegalAgent** + **ConveyancerAgent**
2. **Issue Analysis**: AI-powered assessment of legal problem scope
3. **Document Review**: Automated analysis of purchase contracts and related documents

**Primary Routes & AI Functions**:

- `/dashboard/chat` - Legal issue consultation with specialized agent
- `/dashboard/legal/document-analysis` - AI-powered contract and document review
- `/marketplace/providers/legal-conveyancer` - Specialized post-purchase conveyancer matching
- `/dashboard/legal/resolution-strategy` - AI-guided dispute resolution planning

**AI-Powered UX**:

- Issue categorization: "This appears to be a title defect - here's what you need to know"
- Document analysis: "Your contract includes clause 18.3 which protects you in this situation"
- Professional matching: "3 conveyancers specialize in post-purchase disputes in your area"
- Timeline management: "Statutory time limit for this claim is 45 days - act now"

#### 2.2.5 Equity Investment Journey (Sarah, Homeowner Investor)

**Entry Point**: `/` → "I want to use my home's equity to invest"

**Agent Orchestration Flow**:

1. **OrchestratorAgent** creates **EquityAgent** + **InvestmentAgent** + **FinanceAgent**
2. **Equity Assessment**: Current property valuation and available equity calculation
3. **Investment Strategy**: AI-powered investment opportunity analysis based on risk profile

**Primary Routes & AI Functions**:

- `/dashboard/equity-studio/current-property` - Real-time equity analysis and growth tracking
- `/dashboard/investment-strategy` - Personalized investment recommendations
- `/dashboard/finance-lab/equity-lending` - Comparison of equity release products
- `/marketplace/providers/investment-broker` - Specialized investment finance brokers
- `/dashboard/portfolio-manager` - Integrated multi-property portfolio management

**AI-Powered UX**:

- Equity tracking: "Your home equity increased $15K this quarter - investment capacity up 20%"
- Risk analysis: "Based on your profile, consider 70% equity utilization maximum"
- Market timing: "Current investment market conditions favor 2-bedroom apartments in growth suburbs"
- Portfolio optimization: "Balance your portfolio with this property type to reduce risk by 15%"

---

## 3. Convex Data Model

### 3.1 Core Entity Tables

#### 3.1.1 User Management

```typescript
// users table
{
  _id: Id<"users">,
  authId: string,
  email: string,
  phone?: string,
  role: "buyer" | "seller" | "investor" | "conveyancer" | "broker" | "inspector",
  profile: {
    firstName: string,
    lastName: string,
    preferredName?: string,
    avatar?: string
  },
  preferences: {
    notifications: {
      email: boolean,
      sms: boolean,
      push: boolean
    },
    timezone: string,
    language: "en" | "zh" | "vi" // Top languages in Australian property market
  },
  status: "active" | "inactive" | "suspended",
  createdAt: number,
  lastActiveAt: number
}
```

#### 3.1.2 Property Management

```typescript
// properties table
{
  _id: Id<"properties">,
  address: {
    street: string,
    suburb: string,
    state: string,
    postcode: string,
    country: "AU"
  },
  coordinates: {
    lat: number,
    lon: number
  },
  propertyDetails: {
    type: "house" | "apartment" | "townhouse" | "land",
    bedrooms?: number,
    bathrooms?: number,
    carSpaces?: number,
    landSize?: number,
    buildingSize?: number,
    yearBuilt?: number
  },
  valuation: {
    estimatedValue: number,
    lastUpdated: number,
    source: "corelogic" | "domain" | "manual",
    confidence: "high" | "medium" | "low"
  },
  stakeholders: [{
    userId: Id<"users">,
    role: "owner" | "buyer" | "seller" | "agent" | "conveyancer",
    relationship: string
  }],
  status: "active" | "under_contract" | "settled" | "withdrawn",
  createdAt: number
}
```

#### 3.1.3 Transaction Management

```typescript
// transactions table
{
  _id: Id<"transactions">,
  propertyId: Id<"properties">,
  type: "purchase" | "sale" | "refinance",
  participants: [{
    userId: Id<"users">,
    role: "buyer" | "seller" | "conveyancer" | "broker" | "agent",
    status: "active" | "completed" | "withdrawn"
  }],
  timeline: {
    contractDate?: number,
    coolOffExpiry?: number,
    financeApprovalDue?: number,
    inspectionDue?: number,
    settlementDate?: number,
    actualSettlement?: number
  },
  financial: {
    purchasePrice?: number,
    deposit?: number,
    loanAmount?: number,
    stampDuty?: number,
    legalFee?: number,
    otherCosts?: number
  },
  status: "planning" | "contract_signed" | "finance_pending" | "settled" | "cancelled",
  agentThreadId: Id<"agent_threads">,
  createdAt: number,
  updatedAt: number
}
```

### 3.2 AI Agent System Tables

#### 3.2.1 Agent Orchestration

```typescript
// agent_threads table
{
  _id: Id<"agent_threads">,
  transactionId?: Id<"transactions">,
  userId: Id<"users">,
  orchestratorAgentId: string,
  activeAgents: [{
    agentType: "buyer" | "seller" | "finance" | "conveyancing" | "match" | "insights",
    agentId: string,
    status: "active" | "paused" | "completed",
    context: object, // Agent-specific context
    memory: object   // Persistent agent memory
  }],
  currentPhase: "onboarding" | "search" | "contract" | "settlement" | "ownership",
  metadata: {
    priority: "high" | "medium" | "low",
    tags: string[],
    lastAgentActivity: number
  },
  status: "active" | "archived",
  createdAt: number
}
```

#### 3.2.2 Conversation Management & Tool System

```typescript
// Using Convex Agent component's built-in thread and message management
// Leverages components.agent.threads and components.agent.messages tables

// agent_tools table - Custom tool definitions for property domain
{
  _id: Id<"agent_tools">,
  toolName: string,
  toolType: "calculator" | "search" | "document_analysis" | "valuation" | "comparison",
  description: string,
  parameters: {
    schema: object,        // Zod schema for tool parameters
    required: string[]
  },
  handler: string,         // Reference to Convex function
  uiComponent?: string,    // Frontend component for tool result display
  category: "finance" | "legal" | "search" | "analysis" | "workflow",
  permissions: {
    roles: string[],       // User roles that can access this tool
    contextRequired?: string[] // Required context for tool execution
  },
  isActive: boolean,
  createdAt: number
}

// tool_executions table - Track tool usage and results for chat display
{
  _id: Id<"tool_executions">,
  threadId: string,        // Convex agent thread ID
  messageId: string,       // Convex agent message ID
  toolName: string,
  parameters: object,
  result: {
    success: boolean,
    data?: object,
    error?: string,
    displayComponent?: string, // UI component to render result
    actions?: [{             // Follow-up actions user can take
      label: string,
      type: "navigate" | "download" | "share" | "save",
      target: string
    }]
  },
  executionTime: number,   // Milliseconds
  userId: Id<"users">,
  createdAt: number
}

// conversation_context table - Enhanced context for agent memory
{
  _id: Id<"conversation_context">,
  threadId: string,        // Convex agent thread ID
  userId: Id<"users">,
  contextType: "user_preferences" | "transaction_state" | "tool_history" | "learning",
  data: {
    // User preferences learned from conversation
    preferences?: {
      propertyType?: string,
      budget?: { min: number, max: number },
      locations?: string[],
      priorities?: string[]
    },
    // Current transaction state
    transactionState?: {
      phase: string,
      activeWorkflows: string[],
      pendingActions: string[],
      keyDates: object
    },
    // Tool usage patterns for personalization
    toolUsage?: {
      frequentTools: string[],
      lastUsed: object,
      preferences: object
    }
  },
  importance: "low" | "medium" | "high", // For memory prioritization
  lastUpdated: number,
  expiresAt?: number       // For temporary context
}
```

### 3.3 Document & Workflow Tables

#### 3.3.1 Document Management

```typescript
// documents table
{
  _id: Id<"documents">,
  transactionId: Id<"transactions">,
  uploadedBy: Id<"users">,
  type: "contract" | "building_report" | "pest_report" | "bank_statement" | "payslip" | "id_document",
  filename: string,
  fileUrl: string,        // Convex file storage URL
  mimeType: string,
  fileSize: number,
  aiAnalysis: {
    summary: string,
    keyPoints: string[],
    riskFlags: string[],
    complianceStatus: "compliant" | "requires_review" | "non_compliant",
    confidence: number,
    lastAnalyzed: number
  },
  status: "uploaded" | "analyzing" | "analyzed" | "archived",
  permissions: [{
    userId: Id<"users">,
    canView: boolean,
    canEdit: boolean,
    canShare: boolean
  }],
  createdAt: number
}
```

#### 3.3.2 Workflow Management

```typescript
// workflows table
{
  _id: Id<"workflows">,
  transactionId: Id<"transactions">,
  type: "purchase_workflow" | "sale_workflow" | "finance_workflow",
  currentStep: string,
  steps: [{
    id: string,
    name: string,
    description: string,
    assignedTo?: Id<"users">,
    dueDate?: number,
    status: "pending" | "in_progress" | "completed" | "blocked",
    dependencies: string[], // Step IDs this depends on
    aiAgent?: string,       // Agent responsible for automation
    automationLevel: "manual" | "assisted" | "automated"
  }],
  milestones: [{
    name: string,
    targetDate: number,
    actualDate?: number,
    status: "upcoming" | "due" | "completed" | "overdue",
    criticalPath: boolean
  }],
  status: "active" | "paused" | "completed" | "cancelled",
  createdAt: number,
  updatedAt: number
}
```

### 3.4 Marketplace & Provider Tables

#### 3.4.1 Service Providers

```typescript
// providers table
{
  _id: Id<"providers">,
  userId: Id<"users">,
  businessName: string,
  serviceType: "conveyancing" | "mortgage_broker" | "building_inspector" | "real_estate_agent",
  credentials: {
    licenseNumber?: string,
    accreditation?: string[],
    yearsExperience: number,
    insuranceDetails?: string
  },
  serviceAreas: string[], // Postcodes or regions
  pricing: {
    feeStructure: "fixed" | "percentage" | "hourly",
    basePrice?: number,
    priceRange?: { min: number, max: number },
    details: string
  },
  ratings: {
    averageRating: number,
    totalReviews: number,
    responseTime: number, // Average hours to respond
    completionRate: number // Percentage of successful completions
  },
  availability: {
    currentCapacity: number,
    maxCapacity: number,
    nextAvailable: number
  },
  aiMatchScore?: number, // Dynamic matching score for current query
  status: "active" | "busy" | "unavailable",
  createdAt: number
}
```

#### 3.4.2 Quotes & Engagements

```typescript
// quotes table
{
  _id: Id<"quotes">,
  transactionId: Id<"transactions">,
  providerId: Id<"providers">,
  requestedBy: Id<"users">,
  serviceType: string,
  scope: {
    description: string,
    requirements: string[],
    timeline: string,
    specialConditions?: string[]
  },
  pricing: {
    totalFee: number,
    breakdown: object,
    paymentTerms: string,
    validUntil: number
  },
  status: "pending" | "provided" | "accepted" | "declined" | "expired",
  proposedTimeline: {
    startDate: number,
    milestones: object[],
    completionDate: number
  },
  createdAt: number,
  respondedAt?: number,
  acceptedAt?: number
}
```

### 3.5 Financial Tools & Analytics

#### 3.5.1 Financial Profiles

```typescript
// financial_profiles table
{
  _id: Id<"financial_profiles">,
  userId: Id<"users">,
  employment: {
    status: "employed" | "self_employed" | "contractor" | "unemployed",
    income: {
      gross: number,
      net: number,
      frequency: "weekly" | "fortnightly" | "monthly" | "annually"
    },
    employer?: string,
    yearsInRole: number,
    stability: "permanent" | "contract" | "casual"
  },
  assets: {
    savings: number,
    propertyEquity: number,
    superannuation: number,
    other: number
  },
  liabilities: {
    creditCards: number,
    personalLoans: number,
    existingMortgage: number,
    other: number
  },
  borrowingCapacity: {
    amount: number,
    calculatedAt: number,
    assumptions: object,
    stressTestPassed: boolean
  },
  creditScore?: {
    score: number,
    provider: string,
    lastUpdated: number
  },
  firstHomeBuyer: boolean,
  governmentGrants: {
    eligible: string[],
    applied: string[],
    received: string[]
  },
  lastUpdated: number,
  verified: boolean
}
```

#### 3.5.2 Market Intelligence

```typescript
// market_data table
{
  _id: Id<"market_data">,
  suburb: string,
  postcode: string,
  propertyType: "house" | "apartment" | "townhouse",
  metrics: {
    medianPrice: number,
    priceGrowth: {
      quarterly: number,
      yearly: number,
      fiveYear: number
    },
    salesVolume: number,
    daysOnMarket: number,
    auctionClearanceRate?: number,
    rentalYield?: number
  },
  demographics: {
    populationGrowth: number,
    medianAge: number,
    medianIncome: number,
    ownerOccupierRate: number
  },
  infrastructure: {
    transportScore: number,
    schoolRatings: number[],
    amenitiesScore: number,
    futureProjects: string[]
  },
  dataSource: "corelogic" | "domain" | "government",
  timestamp: number
}
```

---

## 4. AI Agent System Design

### 4.1 Agent Hierarchy & Responsibilities

#### 4.1.1 OrchestratorAgent (Master Controller)

**Purpose**: Routes messages, spawns specialized agents, maintains conversation coherence

**Core Functions**:

- User intent classification and routing
- Agent lifecycle management
- Context switching between transaction phases
- Cross-agent information synthesis

**Convex Implementation**:

```typescript
// Orchestrator agent workflow
export const orchestratorWorkflow = defineWorkflow("orchestrator", async (ctx, args) => {
  const { userId, message, threadId } = args

  // Classify intent and determine required agents
  const intent = await ctx.action(classifyUserIntent, { message })

  // Spawn or activate appropriate specialized agents
  const agents = await ctx.action(manageAgentLifecycle, { intent, threadId })

  // Route message to appropriate agent(s)
  const responses = await Promise.all(
    agents.map(agent => ctx.action(routeToAgent, { agent, message, context }))
  )

  // Synthesize and return unified response
  return await ctx.action(synthesizeResponse, { responses, context })
})
```

#### 4.1.2 BuyerAgent (Purchase Specialist)

**Purpose**: Manages end-to-end property purchase journey

**Core Capabilities**:

- Property search automation and filtering
- Financial readiness assessment
- Timeline management and milestone tracking
- Risk identification and mitigation strategies

**Agent Memory Structure**:

```typescript
{
  buyerProfile: {
    budget: { min: number, max: number },
    preferences: object,
    financialStatus: object,
    timeline: object
  },
  searchHistory: object[],
  shortlistedProperties: string[],
  activeTransactions: string[],
  riskFactors: string[],
  milestoneProgress: object
}
```

#### 4.1.3 FinanceAgent (Loan & Calculations)

**Purpose**: Handles all financial calculations, loan scenarios, and optimization

**Core Functions**:

- Borrowing capacity calculations
- Stamp duty and cost estimations
- Loan comparison and optimization
- Grant eligibility assessments
- Refinancing opportunity detection

**Automated Workflows**:

- Daily rate monitoring and alerts
- Monthly affordability recalculations
- Quarterly portfolio health checks
- Annual refinancing assessments

#### 4.1.4 MatchAgent (Provider Matching)

**Purpose**: Connects users with appropriate service providers using vector similarity

**Matching Algorithm**:

```typescript
// Vector-based provider matching
export const findBestProviders = action(async (ctx, args) => {
  const { requirements, location, budget, timeline } = args

  // Create requirement embedding
  const queryEmbedding = await embedRequirements(requirements)

  // Vector search against provider capabilities
  const candidates = await ctx.vectorSearch("provider_embeddings", {
    vector: queryEmbedding,
    filter: { location, availability: true },
  })

  // Score and rank based on multiple factors
  return await scoreProviders(candidates, { budget, timeline, preferences })
})
```

### 4.2 Agent Communication Patterns

#### 4.2.1 User-to-Agent Flow

1. User sends message to persistent chat interface
2. OrchestratorAgent receives and classifies intent
3. Appropriate specialist agent(s) activated or spawned
4. Agent processes request using context and memory
5. Response streamed back through real-time Convex subscription
6. Agent memory and conversation state persisted

#### 4.2.2 Agent-to-Agent Collaboration

```typescript
// Example: BuyerAgent requesting FinanceAgent analysis
export const agentCollaboration = workflow("buyer_finance_check", async (ctx, args) => {
  const { propertyId, buyerId } = args

  // BuyerAgent gathers property details
  const propertyInfo = await ctx.action(getBuyerAgentAnalysis, { propertyId })

  // Request FinanceAgent assessment
  const affordabilityCheck = await ctx.action(getFinanceAgentAnalysis, {
    propertyInfo,
    buyerId,
    analysisType: "affordability",
  })

  // Synthesize recommendations
  return await ctx.action(createPurchaseRecommendation, {
    propertyInfo,
    affordabilityCheck,
    riskFactors: await ctx.action(identifyRisks, args),
  })
})
```

---

## 5. Route-Specific UX & Agent Integration

### 5.1 Dashboard Routes

#### 5.1.1 `/dashboard/chat` - Persistent AI Conversation

**UX Design**:

- Full-height chat interface with context-aware responses
- Message threading for complex topics
- Quick action buttons generated by agents
- File upload integration with automatic AI analysis

**Agent Integration**:

- All messages routed through OrchestratorAgent
- Context maintained across sessions using agent memory
- Proactive messages triggered by workflow events
- Real-time typing indicators during agent processing

**Key Features**:

```typescript
// Chat interface with agent awareness
const ChatInterface = () => {
  const messages = useQuery(api.agents.getThreadMessages, { threadId });
  const sendMessage = useMutation(api.agents.sendMessage);

  // Real-time agent status
  const agentStatus = useQuery(api.agents.getActiveAgents, { threadId });

  // Auto-scroll and typing indicators
  const { typingAgents, isThinking } = useAgentActivity(threadId);

  return (
    <div className="flex flex-col h-full">
      <MessagesArea messages={messages} />
      {isThinking && <AgentThinkingIndicator agents={typingAgents} />}
      <MessageInput onSend={sendMessage} />
    </div>
  );
};
```

#### 5.1.2 `/dashboard/timeline` - Visual Milestone Tracker

**UX Design**:

- Interactive Gantt chart showing all transaction milestones
- Color-coded status indicators (on-track, at-risk, overdue)
- Expandable milestone details with agent-generated insights
- Drag-and-drop milestone adjustment with dependency validation

**Agent Integration**:

- Timeline automatically updated by WorkflowAgent
- Risk detection by InsightsAgent with proactive alerts
- Milestone dependency management with automatic recalculation
- Integration with provider schedules and availability

#### 5.1.3 `/dashboard/finance-lab` - Interactive Financial Tools

**UX Design**:

- Modular calculator grid with real-time updates
- Scenario comparison tables with visual charts
- Saved calculations with historical tracking
- Integration with live interest rate feeds

**Agent Integration**:

- FinanceAgent powers all calculations with current market data
- Automatic updates when financial profile changes
- Proactive alerts for refinancing opportunities
- Integration with loan application tracking

**Core Calculators**:

```typescript
// Agent-powered financial calculations
const FinanceCalculators = {
  stampDuty: (price: number, state: string, isFirstHome: boolean) =>
    FinanceAgent.calculateStampDuty({ price, state, isFirstHome }),

  borrowingCapacity: (income: number, expenses: number, deposits: number) =>
    FinanceAgent.calculateBorrowingCapacity({ income, expenses, deposits }),

  repaymentSchedule: (amount: number, rate: number, term: number) =>
    FinanceAgent.generateRepaymentSchedule({ amount, rate, term }),

  refinanceComparison: (currentLoan: object, marketRates: number[]) =>
    FinanceAgent.compareRefinanceOptions({ currentLoan, marketRates }),
}
```

### 5.2 Marketplace Routes

#### 5.2.1 `/marketplace/providers/[type]` - Provider Discovery

**UX Design**:

- AI-curated provider recommendations based on user context
- Interactive provider cards with ratings, pricing, and availability
- One-click quote requests with auto-populated requirements
- Real-time chat integration for immediate questions

**Agent Integration**:

- MatchAgent provides personalized provider rankings
- Requirements auto-extracted from conversation context
- Provider response time tracking and alerts
- Automatic follow-up scheduling

#### 5.2.2 `/marketplace/quotes` - Quote Management

**UX Design**:

- Unified quote comparison interface
- Side-by-side service scope analysis
- Timeline integration showing impact on milestones
- Negotiation assistance through AI-generated talking points

**Agent Integration**:

- ConveyancingAgent analyzes quote terms and identifies risks
- Automatic timeline updates when quotes are accepted
- Provider communication routing through agent system
- Contract generation and milestone creation

---

## 6. AI Chat & Tool Integration Architecture

### 6.1 Conversation History & Memory Management

**Convex Agent Framework Integration**:

Transactor 2.0 leverages the Convex Agent component's built-in conversation management with the following enhancements:

```typescript
// Agent Configuration with Enhanced Memory
const propertyAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4o"),
  textEmbedding: openai.embedding("text-embedding-3-small"),
  instructions: `You are a property concierge AI that helps users throughout their property journey. 
    You have access to comprehensive tools for property search, financial calculations, 
    legal document analysis, and marketplace connections.`,
  tools: {
    propertySearch: createPropertySearchTool(),
    mortgageCalculator: createMortgageCalculatorTool(),
    documentAnalyzer: createDocumentAnalysisTool(),
    providerMatcher: createProviderMatchingTool(),
    equityCalculator: createEquityCalculatorTool(),
    // ... more domain-specific tools
  },
  contextOptions: {
    includeToolCalls: true, // Include tool usage in conversation context
    recentMessages: 50, // Keep substantial recent context
    searchOptions: {
      limit: 20, // Search more conversation history
      textSearch: true, // Enable text-based memory search
      vectorSearch: true, // Enable semantic memory search
      messageRange: { before: 3, after: 2 }, // Context around retrieved memories
    },
    searchOtherThreads: false, // Keep user privacy, no cross-thread search
  },
  maxSteps: 10, // Allow multi-step tool workflows
  maxRetries: 3,
})
```

**Memory Persistence Strategy**:

```typescript
// Enhanced conversation context management
export const saveConversationContext = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    contextType: v.union(
      v.literal("user_preferences"),
      v.literal("transaction_state"),
      v.literal("tool_history"),
      v.literal("learning")
    ),
    data: v.object({
      preferences: v.optional(
        v.object({
          propertyType: v.optional(v.string()),
          budget: v.optional(v.object({ min: v.number(), max: v.number() })),
          locations: v.optional(v.array(v.string())),
          priorities: v.optional(v.array(v.string())),
        })
      ),
      transactionState: v.optional(
        v.object({
          phase: v.string(),
          activeWorkflows: v.array(v.string()),
          pendingActions: v.array(v.string()),
          keyDates: v.object({}),
        })
      ),
      toolUsage: v.optional(
        v.object({
          frequentTools: v.array(v.string()),
          lastUsed: v.object({}),
          preferences: v.object({}),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("conversation_context", {
      ...args,
      importance: "medium",
      lastUpdated: Date.now(),
      expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year retention
    })
  },
})
```

### 6.2 Tool Calling & Inline Display System

**Tool Definition Architecture**:

```typescript
// Property-specific tool definitions
export const createMortgageCalculatorTool = () =>
  createTool({
    description: "Calculate mortgage payments, borrowing capacity, and loan scenarios",
    args: z.object({
      calculationType: z.enum(["repayments", "borrowing_capacity", "comparison"]),
      loanAmount: z.number().optional(),
      interestRate: z.number().optional(),
      termYears: z.number().optional(),
      income: z.number().optional(),
      expenses: z.number().optional(),
      deposit: z.number().optional(),
    }),
    handler: async (ctx, args): Promise<MortgageCalculationResult> => {
      // Core calculation logic
      const result = await ctx.runQuery(api.finance.calculateMortgage, args)

      // Save tool execution for chat display
      await ctx.runMutation(api.tools.saveExecution, {
        threadId: ctx.threadId,
        messageId: ctx.messageId,
        toolName: "mortgageCalculator",
        parameters: args,
        result: {
          success: true,
          data: result,
          displayComponent: "MortgageCalculatorResult",
          actions: [
            {
              label: "Refine Calculation",
              type: "navigate",
              target: `/dashboard/finance-lab/mortgage?prefill=${encodeURIComponent(JSON.stringify(args))}`,
            },
            {
              label: "Save Scenario",
              type: "save",
              target: "mortgage_scenario",
            },
          ],
        },
        executionTime: Date.now() - startTime,
        userId: ctx.userId,
      })

      return result
    },
  })
```

**Chat Interface with Tool Integration**:

```typescript
// Chat component with inline tool result display
const ChatMessage = ({ message, toolExecutions }) => {
  const isToolCall = message.role === "assistant" && message.toolCalls;

  return (
    <div className="message-container">
      <MessageContent content={message.content} />

      {/* Inline tool result display */}
      {toolExecutions?.map(execution => (
        <ToolResultDisplay
          key={execution._id}
          execution={execution}
          onAction={handleToolAction}
        />
      ))}

      {/* Tool call in progress indicator */}
      {isToolCall && (
        <ToolExecutionIndicator tools={message.toolCalls} />
      )}
    </div>
  );
};

// Dynamic tool result component renderer
const ToolResultDisplay = ({ execution, onAction }) => {
  const ComponentToRender = useMemo(() => {
    switch (execution.result.displayComponent) {
      case "MortgageCalculatorResult":
        return MortgageCalculatorResult;
      case "PropertySearchResults":
        return PropertySearchResults;
      case "DocumentAnalysisResult":
        return DocumentAnalysisResult;
      case "ProviderMatchResults":
        return ProviderMatchResults;
      default:
        return GenericToolResult;
    }
  }, [execution.result.displayComponent]);

  return (
    <div className="tool-result-container border rounded-lg p-4 my-2">
      <div className="tool-header flex items-center gap-2 mb-3">
        <ToolIcon name={execution.toolName} />
        <span className="text-sm font-medium">
          {getToolDisplayName(execution.toolName)}
        </span>
        <ExecutionTime duration={execution.executionTime} />
      </div>

      <ComponentToRender
        data={execution.result.data}
        error={execution.result.error}
      />

      {/* Action buttons */}
      {execution.result.actions && (
        <div className="tool-actions flex gap-2 mt-3">
          {execution.result.actions.map(action => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => onAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 6.3 Tool Catalog & Permissions

**Comprehensive Tool Suite**:

```typescript
// Tool catalog with role-based access
export const TOOL_CATALOG = {
  // Financial Tools
  mortgageCalculator: {
    roles: ["buyer", "investor", "upgrader"],
    contextRequired: [],
    description: "Calculate mortgage payments and borrowing capacity",
  },

  equityCalculator: {
    roles: ["investor", "upgrader"],
    contextRequired: ["existing_property"],
    description: "Calculate available equity and investment capacity",
  },

  stampDutyCalculator: {
    roles: ["buyer", "investor"],
    contextRequired: ["target_state"],
    description: "Calculate stamp duty and government charges",
  },

  refinanceAnalyzer: {
    roles: ["investor", "upgrader"],
    contextRequired: ["current_loan"],
    description: "Analyze refinancing opportunities and savings",
  },

  // Property Tools
  propertySearch: {
    roles: ["buyer", "investor"],
    contextRequired: [],
    description: "Search properties based on criteria and preferences",
  },

  propertyValuation: {
    roles: ["seller", "investor", "upgrader"],
    contextRequired: ["property_address"],
    description: "Get AI-powered property valuation and market analysis",
  },

  comparativeAnalysis: {
    roles: ["buyer", "investor"],
    contextRequired: ["target_properties"],
    description: "Compare multiple properties across key metrics",
  },

  marketInsights: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["location"],
    description: "Get local market trends and forecasts",
  },

  // Legal & Document Tools
  documentAnalyzer: {
    roles: ["buyer", "seller"],
    contextRequired: ["uploaded_document"],
    description: "AI analysis of contracts and legal documents",
  },

  contractComparison: {
    roles: ["buyer", "seller"],
    contextRequired: ["multiple_contracts"],
    description: "Compare contract terms and identify key differences",
  },

  complianceChecker: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["property_details"],
    description: "Check compliance with regulations and requirements",
  },

  // Marketplace Tools
  providerMatcher: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["service_type", "location"],
    description: "Find and match qualified service providers",
  },

  quoteComparator: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["received_quotes"],
    description: "Compare service provider quotes and recommendations",
  },

  // Workflow Tools
  timelineOptimizer: {
    roles: ["buyer", "seller"],
    contextRequired: ["transaction_details"],
    description: "Optimize transaction timeline and milestones",
  },

  riskAssessment: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["transaction_context"],
    description: "Assess and highlight potential transaction risks",
  },
}
```

### 6.4 Tool Execution Flow

**Complete Tool Execution Architecture**:

```typescript
// Tool execution with comprehensive error handling and display
export const executeAgentTool = action({
  args: {
    threadId: v.string(),
    toolName: v.string(),
    parameters: v.object({}),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const startTime = Date.now()

    try {
      // Validate tool access permissions
      const user = await ctx.runQuery(api.users.getUser, { userId: args.userId })
      const toolConfig = TOOL_CATALOG[args.toolName]

      if (!toolConfig.roles.includes(user.role)) {
        throw new Error(`Tool ${args.toolName} not available for role ${user.role}`)
      }

      // Validate required context
      if (toolConfig.contextRequired.length > 0) {
        const context = await ctx.runQuery(api.context.getConversationContext, {
          threadId: args.threadId,
          userId: args.userId,
        })

        const missingContext = toolConfig.contextRequired.filter(
          req => !hasRequiredContext(context, req)
        )

        if (missingContext.length > 0) {
          throw new Error(`Missing required context: ${missingContext.join(", ")}`)
        }
      }

      // Execute the tool
      const result = await executeToolFunction(args.toolName, args.parameters, ctx)

      // Save execution record
      await ctx.runMutation(api.tools.saveExecution, {
        threadId: args.threadId,
        messageId: args.messageId,
        toolName: args.toolName,
        parameters: args.parameters,
        result: {
          success: true,
          data: result,
          displayComponent: getDisplayComponent(args.toolName),
          actions: generateToolActions(args.toolName, result),
        },
        executionTime: Date.now() - startTime,
        userId: args.userId,
      })

      return result
    } catch (error) {
      // Save error execution record
      await ctx.runMutation(api.tools.saveExecution, {
        threadId: args.threadId,
        messageId: args.messageId,
        toolName: args.toolName,
        parameters: args.parameters,
        result: {
          success: false,
          error: error.message,
          displayComponent: "ErrorDisplay",
        },
        executionTime: Date.now() - startTime,
        userId: args.userId,
      })

      throw error
    }
  },
})
```

This comprehensive tool integration ensures that users can access powerful property-related functionality directly within the chat interface, with results displayed inline and actionable follow-up options available. The system maintains conversation history with tool usage context, enabling the AI to build understanding over time and provide increasingly personalized assistance.

---

## 6. AI Chat & Tool Integration Architecture

### 6.1 Conversation History & Memory Management

**Convex Agent Framework Integration**:

Transactor 2.0 leverages the Convex Agent component's built-in conversation management with the following enhancements:

```typescript
// Agent Configuration with Enhanced Memory
const propertyAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4o"),
  textEmbedding: openai.embedding("text-embedding-3-small"),
  instructions: `You are a property concierge AI that helps users throughout their property journey. 
    You have access to comprehensive tools for property search, financial calculations, 
    legal document analysis, and marketplace connections.`,
  tools: {
    propertySearch: createPropertySearchTool(),
    mortgageCalculator: createMortgageCalculatorTool(),
    documentAnalyzer: createDocumentAnalysisTool(),
    providerMatcher: createProviderMatchingTool(),
    equityCalculator: createEquityCalculatorTool(),
    // ... more domain-specific tools
  },
  contextOptions: {
    includeToolCalls: true, // Include tool usage in conversation context
    recentMessages: 50, // Keep substantial recent context
    searchOptions: {
      limit: 20, // Search more conversation history
      textSearch: true, // Enable text-based memory search
      vectorSearch: true, // Enable semantic memory search
      messageRange: { before: 3, after: 2 }, // Context around retrieved memories
    },
    searchOtherThreads: false, // Keep user privacy, no cross-thread search
  },
  maxSteps: 10, // Allow multi-step tool workflows
  maxRetries: 3,
})
```

**Memory Persistence Strategy**:

```typescript
// Enhanced conversation context management
export const saveConversationContext = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    contextType: v.union(
      v.literal("user_preferences"),
      v.literal("transaction_state"),
      v.literal("tool_history"),
      v.literal("learning")
    ),
    data: v.object({
      preferences: v.optional(
        v.object({
          propertyType: v.optional(v.string()),
          budget: v.optional(v.object({ min: v.number(), max: v.number() })),
          locations: v.optional(v.array(v.string())),
          priorities: v.optional(v.array(v.string())),
        })
      ),
      transactionState: v.optional(
        v.object({
          phase: v.string(),
          activeWorkflows: v.array(v.string()),
          pendingActions: v.array(v.string()),
          keyDates: v.object({}),
        })
      ),
      toolUsage: v.optional(
        v.object({
          frequentTools: v.array(v.string()),
          lastUsed: v.object({}),
          preferences: v.object({}),
        })
      ),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("conversation_context", {
      ...args,
      importance: "medium",
      lastUpdated: Date.now(),
      expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year retention
    })
  },
})
```

### 6.2 Tool Calling & Inline Display System

**Tool Definition Architecture**:

```typescript
// Property-specific tool definitions
export const createMortgageCalculatorTool = () =>
  createTool({
    description: "Calculate mortgage payments, borrowing capacity, and loan scenarios",
    args: z.object({
      calculationType: z.enum(["repayments", "borrowing_capacity", "comparison"]),
      loanAmount: z.number().optional(),
      interestRate: z.number().optional(),
      termYears: z.number().optional(),
      income: z.number().optional(),
      expenses: z.number().optional(),
      deposit: z.number().optional(),
    }),
    handler: async (ctx, args): Promise<MortgageCalculationResult> => {
      // Core calculation logic
      const result = await ctx.runQuery(api.finance.calculateMortgage, args)

      // Save tool execution for chat display
      await ctx.runMutation(api.tools.saveExecution, {
        threadId: ctx.threadId,
        messageId: ctx.messageId,
        toolName: "mortgageCalculator",
        parameters: args,
        result: {
          success: true,
          data: result,
          displayComponent: "MortgageCalculatorResult",
          actions: [
            {
              label: "Refine Calculation",
              type: "navigate",
              target: `/dashboard/finance-lab/mortgage?prefill=${encodeURIComponent(JSON.stringify(args))}`,
            },
            {
              label: "Save Scenario",
              type: "save",
              target: "mortgage_scenario",
            },
          ],
        },
        executionTime: Date.now() - startTime,
        userId: ctx.userId,
      })

      return result
    },
  })
```

**Chat Interface with Tool Integration**:

```typescript
// Chat component with inline tool result display
const ChatMessage = ({ message, toolExecutions }) => {
  const isToolCall = message.role === "assistant" && message.toolCalls;

  return (
    <div className="message-container">
      <MessageContent content={message.content} />

      {/* Inline tool result display */}
      {toolExecutions?.map(execution => (
        <ToolResultDisplay
          key={execution._id}
          execution={execution}
          onAction={handleToolAction}
        />
      ))}

      {/* Tool call in progress indicator */}
      {isToolCall && (
        <ToolExecutionIndicator tools={message.toolCalls} />
      )}
    </div>
  );
};

// Dynamic tool result component renderer
const ToolResultDisplay = ({ execution, onAction }) => {
  const ComponentToRender = useMemo(() => {
    switch (execution.result.displayComponent) {
      case "MortgageCalculatorResult":
        return MortgageCalculatorResult;
      case "PropertySearchResults":
        return PropertySearchResults;
      case "DocumentAnalysisResult":
        return DocumentAnalysisResult;
      case "ProviderMatchResults":
        return ProviderMatchResults;
      default:
        return GenericToolResult;
    }
  }, [execution.result.displayComponent]);

  return (
    <div className="tool-result-container border rounded-lg p-4 my-2">
      <div className="tool-header flex items-center gap-2 mb-3">
        <ToolIcon name={execution.toolName} />
        <span className="text-sm font-medium">
          {getToolDisplayName(execution.toolName)}
        </span>
        <ExecutionTime duration={execution.executionTime} />
      </div>

      <ComponentToRender
        data={execution.result.data}
        error={execution.result.error}
      />

      {/* Action buttons */}
      {execution.result.actions && (
        <div className="tool-actions flex gap-2 mt-3">
          {execution.result.actions.map(action => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => onAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 6.3 Tool Catalog & Permissions

**Comprehensive Tool Suite**:

```typescript
// Tool catalog with role-based access
export const TOOL_CATALOG = {
  // Financial Tools
  mortgageCalculator: {
    roles: ["buyer", "investor", "upgrader"],
    contextRequired: [],
    description: "Calculate mortgage payments and borrowing capacity",
  },

  equityCalculator: {
    roles: ["investor", "upgrader"],
    contextRequired: ["existing_property"],
    description: "Calculate available equity and investment capacity",
  },

  stampDutyCalculator: {
    roles: ["buyer", "investor"],
    contextRequired: ["target_state"],
    description: "Calculate stamp duty and government charges",
  },

  refinanceAnalyzer: {
    roles: ["investor", "upgrader"],
    contextRequired: ["current_loan"],
    description: "Analyze refinancing opportunities and savings",
  },

  // Property Tools
  propertySearch: {
    roles: ["buyer", "investor"],
    contextRequired: [],
    description: "Search properties based on criteria and preferences",
  },

  propertyValuation: {
    roles: ["seller", "investor", "upgrader"],
    contextRequired: ["property_address"],
    description: "Get AI-powered property valuation and market analysis",
  },

  comparativeAnalysis: {
    roles: ["buyer", "investor"],
    contextRequired: ["target_properties"],
    description: "Compare multiple properties across key metrics",
  },

  marketInsights: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["location"],
    description: "Get local market trends and forecasts",
  },

  // Legal & Document Tools
  documentAnalyzer: {
    roles: ["buyer", "seller"],
    contextRequired: ["uploaded_document"],
    description: "AI analysis of contracts and legal documents",
  },

  contractComparison: {
    roles: ["buyer", "seller"],
    contextRequired: ["multiple_contracts"],
    description: "Compare contract terms and identify key differences",
  },

  complianceChecker: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["property_details"],
    description: "Check compliance with regulations and requirements",
  },

  // Marketplace Tools
  providerMatcher: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["service_type", "location"],
    description: "Find and match qualified service providers",
  },

  quoteComparator: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["received_quotes"],
    description: "Compare service provider quotes and recommendations",
  },

  // Workflow Tools
  timelineOptimizer: {
    roles: ["buyer", "seller"],
    contextRequired: ["transaction_details"],
    description: "Optimize transaction timeline and milestones",
  },

  riskAssessment: {
    roles: ["buyer", "seller", "investor"],
    contextRequired: ["transaction_context"],
    description: "Assess and highlight potential transaction risks",
  },
}
```

### 6.4 Tool Execution Flow

**Complete Tool Execution Architecture**:

```typescript
// Tool execution with comprehensive error handling and display
export const executeAgentTool = action({
  args: {
    threadId: v.string(),
    toolName: v.string(),
    parameters: v.object({}),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const startTime = Date.now()

    try {
      // Validate tool access permissions
      const user = await ctx.runQuery(api.users.getUser, { userId: args.userId })
      const toolConfig = TOOL_CATALOG[args.toolName]

      if (!toolConfig.roles.includes(user.role)) {
        throw new Error(`Tool ${args.toolName} not available for role ${user.role}`)
      }

      // Validate required context
      if (toolConfig.contextRequired.length > 0) {
        const context = await ctx.runQuery(api.context.getConversationContext, {
          threadId: args.threadId,
          userId: args.userId,
        })

        const missingContext = toolConfig.contextRequired.filter(
          req => !hasRequiredContext(context, req)
        )

        if (missingContext.length > 0) {
          throw new Error(`Missing required context: ${missingContext.join(", ")}`)
        }
      }

      // Execute the tool
      const result = await executeToolFunction(args.toolName, args.parameters, ctx)

      // Save execution record
      await ctx.runMutation(api.tools.saveExecution, {
        threadId: args.threadId,
        messageId: args.messageId,
        toolName: args.toolName,
        parameters: args.parameters,
        result: {
          success: true,
          data: result,
          displayComponent: getDisplayComponent(args.toolName),
          actions: generateToolActions(args.toolName, result),
        },
        executionTime: Date.now() - startTime,
        userId: args.userId,
      })

      return result
    } catch (error) {
      // Save error execution record
      await ctx.runMutation(api.tools.saveExecution, {
        threadId: args.threadId,
        messageId: args.messageId,
        toolName: args.toolName,
        parameters: args.parameters,
        result: {
          success: false,
          error: error.message,
          displayComponent: "ErrorDisplay",
        },
        executionTime: Date.now() - startTime,
        userId: args.userId,
      })

      throw error
    }
  },
})
```

This comprehensive tool integration ensures that users can access powerful property-related functionality directly within the chat interface, with results displayed inline and actionable follow-up options available. The system maintains conversation history with tool usage context, enabling the AI to build understanding over time and provide increasingly personalized assistance.

---

## 7. Implementation Roadmap

### 6.1 Phase 1: Core Agent Framework (Weeks 1-4)

**Deliverables**:

- OrchestratorAgent with basic routing
- Simple BuyerAgent and SellerAgent implementations
- Chat interface with persistent threads
- Basic property and user data models

**Technical Focus**:

- Convex agent infrastructure setup
- Message persistence and vector embeddings
- Real-time subscription architecture
- Authentication and role-based access

### 6.2 Phase 2: Transaction Workflows (Weeks 5-8)

**Deliverables**:

- Workflow engine with milestone tracking
- Timeline visualization with real-time updates
- Document upload and AI analysis
- Basic provider marketplace

**Technical Focus**:

- Durable workflow implementation
- Document processing pipelines
- Provider matching algorithms
- External API integrations (CoreLogic, RateCity)

### 6.3 Phase 3: Financial Intelligence (Weeks 9-12)

**Deliverables**:

- FinanceAgent with full calculator suite
- Equity Studio with valuation integration
- Automated refinancing alerts
- Grant eligibility automation

**Technical Focus**:

- Real-time financial data pipelines
- Complex calculation optimization
- Proactive monitoring systems
- Advanced analytics and reporting

### 6.4 Phase 4: Advanced AI Features (Weeks 13-16)

**Deliverables**:

- InsightsAgent with predictive analytics
- Advanced provider matching with ML
- Automated risk detection
- Comprehensive notification system

**Technical Focus**:

- Machine learning model integration
- Advanced vector search capabilities
- Workflow optimization algorithms
- Performance monitoring and scaling

---

## 7. Success Metrics & Monitoring

### 7.1 Agent Performance Metrics

- **Response Time**: P95 < 3 seconds for all agent interactions
- **Accuracy**: >95% correct milestone predictions and risk identification
- **User Satisfaction**: Agent helpfulness rating >4.5/5
- **Workflow Completion**: >85% of initiated workflows reach completion

### 7.2 Business Impact Metrics

- **Support Reduction**: 40% decrease in status enquiry tickets
- **Timeline Efficiency**: 15% reduction in contract-to-settlement time
- **Marketplace Growth**: 60% increase in provider bookings
- **User Retention**: >80% monthly active user retention

### 7.3 Technical Performance Metrics

- **System Availability**: 99.9% uptime for all critical workflows
- **Data Consistency**: Zero data loss events across agent operations
- **Scalability**: Support 10x user growth without architecture changes
- **Security**: Zero security incidents with financial or personal data

This comprehensive structure provides the foundation for building Transactor 2.0 as a truly AI-first property concierge, where intelligent agents handle the complexity while users enjoy a seamless, conversational experience throughout their property journey.
