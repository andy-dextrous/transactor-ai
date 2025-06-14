# Transactor 2.0 - App Structure & Data Model

**Version:** 2.0  
**Date:** January 2025  
**Purpose:** Comprehensive technical blueprint for the AI-driven property concierge platform
**Architecture:** Mastra + Supabase + Prisma + Next.js 15

---

## 1. Application Architecture Overview

### 1.1 Technology Stack Integration

Based on the package.json analysis and architectural decisions, the application leverages:

- **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom design system
- **Database**: Supabase PostgreSQL with connection pooling
- **AI Orchestration**: Mastra for durable AI workflows and agent management
- **Database ORM**: Prisma for type-safe database operations
- **AI Storage**: Mastra's native storage integration with Supabase
- **Animations**: GSAP with React integration
- **Data Visualization**: Recharts for financial tools
- **Form Management**: React Hook Form with Zod validation

### 1.2 Mastra-First Architecture Philosophy

The application operates as an **AI orchestration platform** powered by Mastra where every user interaction triggers intelligent agent workflows. The system emphasizes:

1. **Proactive Intelligence**: Mastra agents anticipate user needs rather than waiting for commands
2. **Context Persistence**: Every conversation and action builds on previous context via Mastra storage
3. **Workflow Automation**: Complex property transactions are decomposed into Mastra-managed workflows
4. **Real-time Collaboration**: All stakeholders share a unified, live workspace powered by Supabase
5. **Hybrid Data Architecture**: Mastra handles AI/agent data, Prisma manages application data

---

## 2. Route Structure & User Journeys

### 2.1 Chat-Centric Route Architecture

**Design Philosophy**: 80% of user interactions happen in chat interface with contextual panels. Supporting routes handle specific deep-dive tasks.

```
/
├── (onboarding)/
│   ├── welcome               # Role selection with chat preview
│   ├── chat-setup            # Quick preference gathering in chat format
│   └── professional-verify   # Service provider verification only
│
├── dashboard/                # PRIMARY EXPERIENCE (80% of time)
│   └── [threadId?]           # Main chat interface with contextual panels
│                             # Layout: Chat (left) + Context Panel (right)
│                             # Context Panel displays:
│                             # - Current property details
│                             # - Transaction timeline & milestones
│                             # - Active communications
│                             # - Quick actions & tools
│
├── tools/                    # STANDALONE UTILITIES (15% of time)
│   ├── calculator/           # Full-screen financial calculators
│   │   ├── stamp-duty
│   │   ├── mortgage
│   │   ├── equity
│   │   └── comparison
│   ├── property-search/      # Advanced property discovery
│   └── market-insights/      # Detailed market analysis
│
├── manage/                   # ADMINISTRATIVE TASKS (5% of time)
│   ├── documents/            # Document library & management
│   ├── transactions/[id]     # Detailed transaction view
│   ├── connections/          # Professional network management
│   └── settings/             # Account & preferences
│
├── professional/             # PROVIDER-SPECIFIC INTERFACES
│   ├── conveyancer/          # Conveyancer workflow dashboard
│   │   ├── clients/
│   │   ├── leads/
│   │   └── workflows/
│   ├── agent/                # Real estate agent dashboard
│   │   ├── referrals/
│   │   ├── panels/
│   │   └── commissions/
│   └── broker/               # Mortgage broker interface
│
├── marketplace/              # PROVIDER DISCOVERY
│   ├── find/[serviceType]    # Provider search & comparison
│   └── panels/[id]           # Shared provider recommendations
│
└── api/
    ├── mastra/               # Mastra API endpoints
    ├── webhooks/             # External integrations
    └── agents/               # AI agent orchestration
```

### 2.1.1 Primary Dashboard Layout

**Main Interface Design**:

```typescript
// Dashboard layout (covers 80% of user interactions)
const DashboardLayout = ({ threadId }: { threadId?: string }) => {
  return (
    <div className="h-screen flex">
      {/* LEFT: Chat Interface (Primary) */}
      <div className="flex-1 flex flex-col min-w-[600px]">
        <ChatHeader />
        <ChatMessages threadId={threadId} />
        <ChatInput />
      </div>

      {/* RIGHT: AI-Controlled Context Panel */}
      <div className="w-96 border-l bg-slate-50">
        <ContextualPanel threadId={threadId} />
      </div>
    </div>
  );
};

// AI-controlled contextual panel
const ContextualPanel = ({ threadId }) => {
  const context = useAIContext(threadId);

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* AI decides what components to show based on conversation */}
        {context.activeProperty && <PropertySummaryCard />}
        {context.activeTransaction && <TransactionProgress />}
        {context.pendingActions && <QuickActions />}
        {context.recentDocuments && <DocumentQuickAccess />}
        {context.activeCalculations && <CalculationSummary />}
        {context.upcomingMilestones && <MilestoneAlerts />}
      </div>
    </ScrollArea>
  );
};
```

---

## 3. Hybrid Data Model (Mastra + Prisma)

### 3.1 Architecture Overview

The application uses a **hybrid data architecture**:

- **Mastra Storage**: Handles AI agent data, conversations, workflows, and vector embeddings
- **Prisma + Supabase**: Manages application data like users, properties, transactions, and business logic
- **Shared Database**: Both systems operate on the same Supabase PostgreSQL instance

```typescript
// Hybrid Architecture Pattern
export class DataService {
  // Mastra for AI/Agent operations
  private mastra = new Mastra({ storage: postgresStore })

  // Prisma for application data
  private prisma = new PrismaClient()

  // Bridge operations between both systems
  async createTransactionWithAgent(data: TransactionData) {
    // Create transaction in Prisma
    const transaction = await this.prisma.transaction.create({ data })

    // Initialize agent workflow in Mastra
    const workflow = await this.mastra.getWorkflow("propertyPurchase")
    const run = workflow.createRun()
    await run.start({ transactionId: transaction.id })

    return transaction
  }
}
```

### 3.2 Prisma Schema Design

#### 3.2.1 Core Application Models

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  authId    String?  @unique
  email     String   @unique
  phone     String?
  role      UserRole

  // Profile information
  firstName     String
  lastName      String
  preferredName String?
  avatar        String?

  // Preferences
  emailNotifications Boolean @default(true)
  smsNotifications   Boolean @default(true)
  pushNotifications  Boolean @default(true)
  timezone          String  @default("Australia/Sydney")
  language          String  @default("en")

  status        UserStatus @default(ACTIVE)
  createdAt     DateTime   @default(now())
  lastActiveAt  DateTime   @default(now())

  // Relations
  transactions      TransactionParticipant[]
  stakeholderRoles  PropertyStakeholder[]
  documents         Document[]
  quotes            Quote[]
  reviews           Review[]
  provider          Provider?
  financialProfile  FinancialProfile?
  mastraIntegrations MastraIntegration[]

  @@map("users")
}

enum UserRole {
  BUYER
  SELLER
  INVESTOR
  CONVEYANCER
  MORTGAGE_BROKER
  BUILDING_INSPECTOR
  REAL_ESTATE_AGENT
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

model Property {
  id String @id @default(cuid())

  // Address details
  street   String
  suburb   String
  state    String
  postcode String
  country  String @default("AU")

  // Coordinates
  latitude  Decimal?
  longitude Decimal?

  // Property details
  type         PropertyType
  bedrooms     Int?
  bathrooms    Int?
  carSpaces    Int?
  landSize     Int? // in square meters
  buildingSize Int? // in square meters
  yearBuilt    Int?

  // Valuation
  estimatedValue        Decimal?
  valuationUpdated      DateTime?
  valuationSource       String?
  valuationConfidence   ConfidenceLevel?

  status    PropertyStatus @default(ACTIVE)
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt

  // Relations
  transactions  Transaction[]
  documents     Document[]
  stakeholders  PropertyStakeholder[]
  marketData    MarketData[]

  @@map("properties")
}

model Transaction {
  id         String          @id @default(cuid())
  propertyId String
  type       TransactionType

  // Timeline dates
  contractDate        DateTime?
  coolOffExpiry       DateTime?
  financeApprovalDue  DateTime?
  inspectionDue       DateTime?
  settlementDate      DateTime?
  actualSettlement    DateTime?

  // Financial details
  purchasePrice Decimal?
  deposit       Decimal?
  loanAmount    Decimal?
  stampDuty     Decimal?
  legalFee      Decimal?
  otherCosts    Decimal?

  status          TransactionStatus @default(PLANNING)
  mastraThreadId  String?           // Reference to Mastra agent thread

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  property     Property                 @relation(fields: [propertyId], references: [id])
  participants TransactionParticipant[]
  milestones   Milestone[]
  documents    Document[]
  quotes       Quote[]

  @@map("transactions")
}

model MastraIntegration {
  id              String @id @default(cuid())
  transactionId   String? @unique
  userId          String
  mastraThreadId  String @unique // Mastra agent thread ID
  agentType       AgentType
  currentPhase    TransactionPhase
  priority        Priority @default(MEDIUM)

  status    MastraStatus @default(ACTIVE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  transaction Transaction? @relation(fields: [transactionId], references: [id])
  user        User         @relation(fields: [userId], references: [id])

  @@map("mastra_integrations")
}

enum AgentType {
  BUYER_AGENT
  SELLER_AGENT
  FINANCE_AGENT
  PROPERTY_AGENT
  DOCUMENT_AGENT
  MATCH_AGENT
  ORCHESTRATOR
}

enum TransactionPhase {
  ONBOARDING
  PROPERTY_SEARCH
  FINANCE_ARRANGEMENT
  CONTRACT_NEGOTIATION
  DUE_DILIGENCE
  SETTLEMENT
  POST_SETTLEMENT
}
```

---

## 4. Mastra Agent System Design

### 4.1 Agent Hierarchy & Responsibilities

#### 4.1.1 OrchestratorAgent (Master Controller)

**Purpose**: Routes messages, spawns specialized agents, maintains conversation coherence

**Core Functions**:

- User intent classification and routing
- Agent lifecycle management
- Context switching between transaction phases
- Cross-agent information synthesis

**Mastra Implementation**:

```typescript
// Orchestrator agent configuration
export const orchestratorAgent = mastra.agent({
  name: "PropertyOrchestratorAgent",
  instructions: `You are the main orchestrator for property transactions. 
    You route conversations to specialized agents and maintain context across 
    the entire property journey. You have access to transaction data and can 
    coordinate between multiple specialized agents.`,
  model: openai.chat("gpt-4o"),
  tools: {
    routeToSpecialist: createTool({
      description: "Route conversation to specialist agent",
      args: z.object({
        agentType: z.enum(["buyer", "finance", "property", "document", "match"]),
        context: z.object({
          transactionId: z.string().optional(),
          userRole: z.string(),
          currentPhase: z.string(),
        }),
      }),
      handler: async (ctx, args) => {
        // Route to appropriate specialist agent
        const agent = await getSpecialistAgent(args.agentType)
        return await agent.processMessage(ctx.message, args.context)
      },
    }),
    updateTransactionPhase: createTool({
      description: "Update current transaction phase",
      args: z.object({
        transactionId: z.string(),
        newPhase: z.enum(["onboarding", "search", "contract", "settlement"]),
      }),
      handler: async (ctx, args) => {
        await prisma.mastraIntegration.update({
          where: { transactionId: args.transactionId },
          data: { currentPhase: args.newPhase },
        })
      },
    }),
  },
})
```

---

## 5. AI Chat & Tool Integration Architecture

### 5.1 Conversation History & Memory Management

**Mastra Agent Framework Integration**:

Transactor 2.0 leverages Mastra's agent framework and built-in conversation management with the following enhancements:

```typescript
// Agent Configuration with Enhanced Memory
const propertyAgent = mastra.agent({
  name: "PropertyAgent",
  model: openai.chat("gpt-4o"),
  instructions: `You are a property concierge AI that helps users throughout their property journey. 
    You have access to comprehensive tools for property search, financial calculations, 
    legal document analysis, and marketplace connections.`,
  tools: {
    propertySearch: createPropertySearchTool(),
    mortgageCalculator: createMortgageCalculatorTool(),
    documentAnalyzer: createDocumentAnalysisTool(),
    providerMatcher: createProviderMatchingTool(),
    equityCalculator: createEquityCalculatorTool(),
  },
})
```

### 5.2 Mastra Integration Layer

```typescript
// Service layer bridging Mastra and Prisma
export class MastraService {
  private mastra = new Mastra({
    storage: postgresStore,
    agents: {
      buyerAgent,
      financeAgent,
      propertyAgent,
      documentAgent,
      matchAgent,
      orchestratorAgent,
    },
  })

  private prisma = new PrismaClient()

  async createTransactionWithAgent(data: TransactionCreateInput) {
    // Create transaction in Prisma
    const transaction = await this.prisma.transaction.create({ data })

    // Initialize Mastra workflow
    const workflow = await this.mastra.getWorkflow("propertyTransaction")
    const run = workflow.createRun()
    const result = await run.start({
      transactionId: transaction.id,
      userId: data.userId,
      transactionType: data.type,
    })

    // Create bridge record
    await this.prisma.mastraIntegration.create({
      data: {
        transactionId: transaction.id,
        userId: data.userId,
        mastraThreadId: result.threadId,
        agentType: this.determineAgentType(data.type),
        currentPhase: "ONBOARDING",
      },
    })

    return transaction
  }

  async sendMessageToAgent(threadId: string, message: string) {
    const integration = await this.prisma.mastraIntegration.findUnique({
      where: { mastraThreadId: threadId },
      include: { transaction: true, user: true },
    })

    if (!integration) throw new Error("Agent thread not found")

    // Send message to Mastra agent
    return await this.mastra.sendMessage(threadId, {
      content: message,
      context: {
        transactionId: integration.transactionId,
        userRole: integration.user.role,
        currentPhase: integration.currentPhase,
      },
    })
  }
}
```

---

## 6. Implementation Roadmap (Chat-Centric)

### 6.1 Phase 1: Chat-First Foundation (Weeks 1-4)

**Deliverables**:

- Core chat interface with contextual panels (`/dashboard`)
- Basic AI agent with tool calling capabilities
- Context panel management system
- Simple onboarding flow (`/onboarding/welcome`)

**Technical Focus**:

- Mastra agent components setup with enhanced memory
- Chat-to-context panel communication architecture
- Basic tool integration (mortgage calculator, property search)
- Real-time panel state synchronization
- Mobile-responsive chat layout

**Success Metrics**:

- Chat interface handles 90% of user interactions
- Context panel updates automatically based on conversation
- Tool results display inline within 3 seconds
- Mobile chat experience fully functional

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
