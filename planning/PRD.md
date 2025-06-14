**Product Requirements Document (PRD)**
**Product Name:** **Transactor 2.0 – The AI-Driven Property Concierge**
**Doc Version:** v0.7 (Updated for Tech Stack Alignment) **Last Updated:** January 2025

---

## 1. Long Description

Transactor AI re-imagines the original Transactor property-tracking tool as a fully fledged, always-on concierge for every Australian property journey.
Where the current app already gives buyers, sellers and professionals a shared timeline of milestones, documents, and reminders ([transactorapp.com][1], [transactorapp.com][2]), the new version puts an **orchestrated team of AI agents** (built on Mastra's durable Agent & Workflow components) at the centre of the experience.

From the very first chat—"I want to buy", "I want to sell", or "I'm a conveyancer looking for leads"—Transactor 2.0 spins up role-specific agents that:

- **Gather and pre-fill data** from property APIs and user uploads to create a living file for the transaction.
- **Intelligently process uploaded documents** (contracts, bank statements, ID, reports) to automatically extract and pre-fill customer information, eliminating manual data entry.
- **Generate and update a visual timeline** for finance, inspections, conveyancing, marketing and settlement in real-time.
- **Match users with top-rated professionals** (conveyancers, mortgage brokers, building-and-pest inspectors) and let them accept quotes in-app.
- **Proactively nudge** everyone about looming deadlines (e.g. cooling-off expiry) and surface risks or delays before they bite.
- **Provide powerful finance tooling**—stamp-duty calculators, first-home-buyer grant eligibility, equity-release scenarios and live rate comparisons.
- **Securely manage documents** with AI-generated plain-English summaries and compliance checks.
- **Protect professional revenue** by preventing settlement delays through predictive risk detection and automated workflow coordination.

On the back end, Mastra's durable workflows and vector-store memory let every agent remember context, resume if interrupted, and stream updates to every screen the moment state changes, all persisted in Supabase PostgreSQL with Prisma ORM managing application data relationships.

The result is a single place where buyers feel guided, sellers feel informed, and professionals win time and new business—all while Transactor quietly scales the same core infrastructure that has already helped Australians settle more than **A\$11 billion** in property transactions ([stage.transactorapp.com][5]).

---

## 2. Purpose

Transform Transactor from a passive milestone tracker into a proactive, AI-driven platform that **orchestrates, automates and optimises** every step of buying, selling and servicing residential property in Australia, with particular focus on **protecting professional revenue** by preventing settlement delays and streamlining coordination between all parties.

---

## 3. Background & Opportunity

| Gap in v1                                         | Pain for Users                               | How AI-first 2.0 Solves It                             |
| ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Status info scattered across email, SMS, calls    | Constant "Where are we at?" queries          | Persistent AI chat + real-time timeline                |
| No predictive guidance                            | Missed deadlines, stress                     | Agents surface next-best actions & countdowns          |
| Limited finance tooling                           | Confusion on grants, equity                  | FinanceAgent runs calculators & scenarios              |
| Static workflows                                  | Edge cases stall progress                    | Mastra workflows adapt & retry automatically           |
| **Settlement delays impact professional revenue** | **Lost income from pushed-out settlements**  | **Predictive risk detection & automated coordination** |
| **No unified professional dashboard**             | **Constant context switching between deals** | **One-click status overview across all transactions**  |
| **Manual coordination between parties**           | **Bottlenecks and communication breakdowns** | **AI orchestration of all parties and dependencies**   |

---

## 4. Objectives & Success Metrics

| Objective                                  | KPI                                          | 12-Month Target |
| ------------------------------------------ | -------------------------------------------- | --------------- |
| Cut status-enquiry support tickets         | # tickets referencing "progress"             | -40 %           |
| Shorten contract-to-settlement time        | Median days                                  | -15 %           |
| **Reduce settlement delays**               | **% of settlements delayed > 7 days**        | **-50 %**       |
| **Increase professional revenue velocity** | **Average days from exchange to commission** | **-20 %**       |
| Grow marketplace revenue                   | Paid provider bookings                       | +60 %           |
| **Professional user engagement**           | **Daily active professionals**               | **+200 %**      |
| Delight users                              | In-app NPS                                   | > 55            |
| **Professional retention**                 | **Monthly churn rate (professionals)**       | **< 5 %**       |

---

## 5. Target Users & Personas

### Consumer Personas

1. **First-Home Buyer (Chloe, 28)** – needs grants, budgeting help.
2. **Upgrader Seller (Raj, 41)** – simultaneous buy-and-sell.
3. **Investor (Lena, 35)** – equity strategy & refinance.
4. **Equity Explorer (David, 33)** – homeowner curious about unlocking property value for renovations, investment, or lifestyle.
5. **Aspiring Buyer (Emma, 26)** – actively saving for first home, needs guidance on deposit targets, market timing, and purchase strategy.
6. **Overwhelmed New Owner (Jake, 30)** – just settled on first property, needs post-purchase support and guidance.

### Property Professional Personas

4. **Conveyancer (Kylie, 38)** – wants automated updates and more leads.
5. **Real Estate Agent (Marcus, 45)** – managing 15-20 active sales, needs instant status visibility.
6. **Mortgage Broker (Sarah, 32)** – juggling 30+ applications, revenue tied to settlement timing.
7. **Building Inspector (Tom, 51)** – schedules 8-12 inspections/week, needs seamless booking flow.
8. **Property Developer (James, 48)** – managing multiple off-the-plan settlements, complex coordination.
9. **Property Valuer (Lisa, 41)** – 50+ valuations/month, needs efficient report distribution.

---

## 6. Key User Stories

### Consumer Stories

| ID         | As a …       | I want …                                         | So that …                        |
| ---------- | ------------ | ------------------------------------------------ | -------------------------------- |
| B-01       | Buyer        | chat onboarding that auto-fills listing data     | setup < 5 min                    |
| B-04       | Buyer        | deadline nudges                                  | I never miss cooling-off         |
| S-02       | Seller       | AI pricing guidance                              | realistic expectations           |
| INV-03     | Investor     | equity scenarios                                 | unlock capital                   |
| SYS-02     | Any role     | one place for docs & chat                        | zero email chase                 |
| **SYS-03** | **Any role** | **upload contract → auto-fill property details** | **eliminate manual data entry**  |
| **SYS-04** | **Any role** | **bank statement upload → auto-extract income**  | **instant financial assessment** |

### New User Persona Stories

| ID     | As a …          | I want …                                          | So that …                              |
| ------ | --------------- | ------------------------------------------------- | -------------------------------------- |
| EQ-01  | Equity Explorer | instant equity calculation from my property value | I know what I can unlock               |
| EQ-02  | Equity Explorer | renovation vs investment scenarios                | I choose the smartest use of my equity |
| EQ-03  | Equity Explorer | broker connections for equity loans               | I can access my property wealth        |
| ASP-01 | Aspiring Buyer  | personalised savings plan with market insights    | I reach my deposit goal efficiently    |
| ASP-02 | Aspiring Buyer  | market timing guidance and price predictions      | I buy at the right time                |
| ASP-03 | Aspiring Buyer  | budget scenarios with different deposit amounts   | I understand all my options            |
| NEW-01 | New Owner       | post-settlement checklist and guidance            | I don't miss important next steps      |
| NEW-02 | New Owner       | home maintenance scheduler and tradie connections | I protect my investment properly       |
| NEW-03 | New Owner       | ongoing financial optimization (rates, insurance) | I save money and build wealth          |

### Property Professional Stories

| ID         | As a …                 | I want …                                         | So that …                                       |
| ---------- | ---------------------- | ------------------------------------------------ | ----------------------------------------------- |
| **PRO-01** | **Conveyancer**        | **auto milestone plan**                          | **no duplicate admin**                          |
| **PRO-02** | **Real Estate Agent**  | **one-click status view across all my listings** | **instant client updates**                      |
| **PRO-03** | **Mortgage Broker**    | **automated application status sync**            | **focus on new business, not chasing updates**  |
| **PRO-04** | **Building Inspector** | **seamless booking calendar integration**        | **maximise daily inspections**                  |
| **PRO-05** | **Any Professional**   | **settlement delay early warning system**        | **protect my revenue timeline**                 |
| **PRO-06** | **Any Professional**   | **automated client communication**               | **reduce repetitive status calls**              |
| **PRO-07** | **Property Developer** | **bulk settlement coordination dashboard**       | **manage complex multi-party deals**            |
| **PRO-08** | **Property Valuer**    | **instant report distribution to all parties**   | **faster payment cycles**                       |
| **PRO-09** | **Any Professional**   | **revenue impact calculator for delays**         | **quantify cost of settlement pushouts**        |
| **PRO-10** | **Any Professional**   | **AI-powered risk assessment of deals**          | **prioritise attention on at-risk settlements** |
| **PRO-11** | **Any Professional**   | **contract upload → auto-create client file**    | **instant onboarding, zero data entry**         |
| **PRO-12** | **Any Professional**   | **document upload → auto-extract key terms**     | **immediate contract analysis**                 |

---

## 7. Scope

### 7.1 Core Functional Requirements

| Module                          | Requirements                                                                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Welcome / Role Pick             | Full-screen chat with quick-start buttons                                                                                     |
| Onboarding Agents               | Collect address (autocomplete), role-specific Q\&A, OTP verification                                                          |
| Dashboard                       | Two-pane layout – persistent chat + tabbed workspace (Timeline, Messages, Documents, Connections, Finance Lab, Equity Studio) |
| **Professional Command Center** | **Multi-deal overview, revenue timeline, risk alerts, client communication hub**                                              |
| Timeline                        | Real-time Gantt, milestone auto-updates                                                                                       |
| Documents                       | Upload, AI summary, compliance checker, **intelligent data extraction and pre-filling**                                       |
| Finance Lab                     | Stamp-duty, borrowing-power, repayment, grant-eligibility & rate-watch tools                                                  |
| Equity Studio                   | Valuation API + loan balance → usable equity scenarios                                                                        |
| Marketplace                     | Ranked provider matches, quote acceptance, ratings                                                                            |
| **Settlement Guardian**         | **Predictive delay detection, automated escalation, revenue protection analytics**                                            |
| **Communication Orchestrator**  | **AI-powered client updates, professional notifications, multi-party coordination**                                           |
| Notifications                   | In-app toast + email/SMS via Mastra workflows                                                                                 |

### 7.2 Professional-Specific Features

#### For Real Estate Agents

- **Portfolio Dashboard**: Visual overview of all active listings with settlement status
- **Commission Timeline**: Revenue projection with delay impact analysis
- **Client Auto-Updates**: AI generates progress reports for buyers/sellers
- **Listing Performance**: Track enquiry-to-contract conversion rates

#### For Conveyancers

- **Matter Management**: Automated milestone tracking across all active files
- **Document Intelligence**: AI flags missing or problematic contract clauses and auto-extracts key contract terms
- **Smart Data Entry**: Contract uploads automatically populate client details, property info, and key dates
- **Deadline Orchestration**: Coordinates searches, finance, inspections automatically
- **Compliance Monitoring**: Real-time checks for regulatory requirements

#### For Mortgage Brokers

- **Application Pipeline**: Status tracking across multiple lenders
- **Settlement Sync**: Automated finance approval to settlement coordination
- **Rate Watch**: Alert clients when better rates become available
- **Commission Protection**: Early warning when settlement delays threaten revenue

#### For Building & Pest Inspectors

- **Smart Scheduling**: AI optimises daily routes and booking efficiency
- **Report Distribution**: Instant delivery to all transaction parties
- **Follow-up Automation**: Schedules re-inspections for identified issues
- **Equipment Tracking**: Maintains calibration and certification schedules

#### For Property Developers

- **Off-the-Plan Command Center**: Manages multiple buyers per development
- **Construction Milestone Sync**: Links building progress to settlement readiness
- **Bulk Settlement Coordination**: Orchestrates complex multi-party completions
- **Presale Performance**: Tracks deposit-to-settlement conversion rates

#### For Property Valuers

- **Valuation Workflow**: Streamlined from instruction to report delivery
- **Market Data Integration**: Real-time comparable sales and trends
- **Multi-Party Distribution**: Instant report sharing with all transaction parties
- **Quality Assurance**: AI flags outlier valuations for review

### 7.3 Settlement Guardian Features

- **Risk Scoring Algorithm**: AI analyses deal complexity and historical delay patterns
- **Early Warning System**: Alerts when settlements are trending toward delays
- **Automated Escalation**: Triggers intervention workflows before issues become critical
- **Revenue Impact Calculator**: Shows professionals the cost of potential delays
- **Coordination Automation**: Manages dependencies between multiple professionals
- **Performance Analytics**: Tracks settlement success rates by professional and deal type

### 7.4 Out of Scope (v1)

- Automated funds disbursement
- Non-Australian jurisdictions
- Real-time user-to-user chat (beyond AI relay)
- **Direct integration with trust accounting systems**
- **Automated contract generation**
- **Cross-border property transactions**

---

## 8. Non-Functional Requirements

- **Performance:** P95 agent response < 3 s; Professional dashboard loads < 2 s
- **Reliability:** Workflows resume after crash; retries on API failure; 99.9% uptime for professional features
- **Security:** Role-based ACL in Mastra; docs encrypted at rest; professional data segregation
- **Accessibility:** WCAG 2.2 AA; Radix components audited
- **Scalability:** Support 1000+ concurrent professional users; 10,000+ active transactions
- **Mobile Performance:** Professional mobile app with offline capability for inspections

---

## 9. Technical Overview

| Layer                 | Stack                                                          |
| --------------------- | -------------------------------------------------------------- |
| Frontend              | Next 15 (App Router), React 19, Tailwind 4, Radix UI, GSAP     |
| Database & ORM        | Supabase PostgreSQL + Prisma (application data)                |
| AI Orchestration      | Mastra agents, workflows, memory, storage                      |
| Real-time Updates     | Supabase real-time subscriptions                               |
| Auth                  | Supabase Auth (future) / next-auth placeholder                 |
| Comms                 | SendGrid email, Twilio SMS via Mastra workflows                |
| External APIs         | CoreLogic (valuations), RateCity (mortgage rates)              |
| **Professional APIs** | **MLS integrations, calendar sync, trust accounting webhooks** |

---

## 10. System Architecture (Summary)

1. **Client** hits `/` → welcomes user with Role-Pick chat.
2. **Mastra OrchestratorAgent** creates role-specific agents (BuyerAgent, SellerAgent, etc.).
3. **Professional agents** maintain multi-deal state and revenue projections using Mastra memory.
4. Agents persist chat and state to Supabase via Mastra storage integration.
5. Long tasks (e.g. compliance check) are off-loaded to durable **Mastra Workflows**.
6. **Settlement Guardian** continuously monitors all deals for delay risks using Mastra's scheduled workflows.
7. Front-end subscribes to Supabase real-time queries; Timeline and notifications update instantly.
8. **Professional Command Center** aggregates data across all user's active deals using Prisma relations.
9. **Hybrid Data Architecture**: Prisma manages application data, Mastra handles AI/agent data, both on shared Supabase instance.

---

## 11. Data Model (Supabase + Prisma + Mastra Hybrid)

### Prisma Application Data Models

| Table                    | Key fields                                                               |
| ------------------------ | ------------------------------------------------------------------------ |
| `User`                   | `id`, `role`, `email`, `authId`, `professionalType`                      |
| `Property`               | `address`, `latitude`, `longitude`, `type`, `estimatedValue`             |
| `Transaction`            | `propertyId`, `type`, `status`, `mastraThreadId`, `purchasePrice`        |
| `TransactionParticipant` | `transactionId`, `userId`, `role`, `status`                              |
| `Milestone`              | `transactionId`, `title`, `dueDate`, `status`, `criticalPath`            |
| `Document`               | `transactionId`, `type`, `fileUrl`, `aiSummary`, `complianceStatus`      |
| `Provider`               | `userId`, `serviceType`, `businessName`, `averageRating`, `feeStructure` |
| `Quote`                  | `transactionId`, `providerId`, `totalFee`, `status`, `validUntil`        |
| **`MastraIntegration`**  | **`transactionId`, `mastraThreadId`, `agentType`, `currentPhase`**       |
| **`FinancialProfile`**   | **`userId`, `grossIncome`, `borrowingCapacity`, `isFirstHomeBuyer`**     |
| **`MarketData`**         | **`suburb`, `propertyType`, `medianPrice`, `quarterlyGrowth`**           |

### Mastra AI/Agent Data (Auto-managed)

| Data Type                  | Managed By                                              |
| -------------------------- | ------------------------------------------------------- |
| **Agent Conversations**    | **Mastra memory system + Supabase storage integration** |
| **Workflow State**         | **Mastra workflow persistence**                         |
| **Vector Embeddings**      | **Mastra vector store (property/document search)**      |
| **Agent Memory**           | **Mastra memory management with context retention**     |
| **Tool Executions**        | **Mastra tool calling logs and results**                |
| **Real-time Coordination** | **Mastra agent network communication**                  |

---

## 12. Key Screens & UX Notes

### Consumer Screens

1. **Welcome / Role Pick** – hero imagery (Embla carousel), CMD-K palette for power users.
2. **Chat-First Onboarding** – progressive Q\&A with zod validation.
3. **Dashboard** – `react-resizable-panels`; Timeline uses Radix Progress.
4. **Finance Lab** – Recharts visualise repayments, grant savings.
5. **Provider Marketplace** – GSAP-animated cards with Lucide icons.

### Professional Screens

6. **Professional Command Center** – Multi-deal Kanban board with revenue timeline
7. **Settlement Guardian Dashboard** – Risk heat map with drill-down analytics
8. **Client Communication Hub** – Automated update templates with AI personalisation
9. **Revenue Protection Analytics** – Charts showing delay impact and prevention savings
10. **Mobile Professional App** – Offline-capable inspection and status update tools

---

## 13. AI-Agent Design

| Agent                  | Core Tasks                                    | Mastra Feature           | Professional Focus          |
| ---------------------- | --------------------------------------------- | ------------------------ | --------------------------- |
| Orchestrator           | spawn & route messages                        | agent coordination       | Multi-deal coordination     |
| Buyer/SellerAgent      | profile, milestone plan                       | memory + workflows       | Consumer experience         |
| FinanceAgent           | calculators, rate watch                       | scheduled workflows      | Broker integration          |
| ConveyancingAgent      | sync provider updates                         | durable workflows        | Legal milestone tracking    |
| MatchAgent             | vector search & rank providers                | vector store search      | Professional marketplace    |
| InsightsAgent          | delay/risk detection                          | analytics workflows      | Settlement guardian         |
| **ProfessionalAgent**  | **multi-deal management, revenue protection** | **persistent memory**    | **Professional workflow**   |
| **SettlementGuardian** | **delay prediction, risk scoring**            | **predictive workflows** | **Revenue protection**      |
| **CommunicationAgent** | **automated client updates**                  | **scheduled actions**    | **Professional efficiency** |

---

## 14. Timeline (Indicative)

| Phase                  | Duration | Outputs                                 |
| ---------------------- | -------- | --------------------------------------- |
| Discovery              | 2 w      | Refined PRD, Figma flow                 |
| Agent POC              | 2 w      | Mastra Agent demo                       |
| Core MVP               | 8 w      | Role→Timeline flows                     |
| **Professional MVP**   | **4 w**  | **Command center, settlement guardian** |
| Marketplace            | 2 w      | Provider matching                       |
| Finance Tools          | 3 w      | Lab & Equity Studio                     |
| **Revenue Protection** | **2 w**  | **Delay prediction, risk analytics**    |
| Hardening              | 2 w      | Pen-test, a11y audit                    |
| Beta                   | 1 w      | Closed cohort                           |
| GA                     | —        | Launch                                  |

---

## 15. Assumptions & Risks

| Assumption                                             | Risk                                    | Mitigation                                                |
| ------------------------------------------------------ | --------------------------------------- | --------------------------------------------------------- |
| Mastra Agent API stabilises                            | Breaking change                         | Pin version, monitor releases                             |
| Property APIs allow caching                            | Rate-limits                             | Server-side cache, back-off                               |
| Professionals adopt marketplace                        | Low liquidity                           | Seed partners, early-bird pricing                         |
| **Settlement data quality sufficient for predictions** | **Inaccurate risk scoring**             | **Start with conservative thresholds, improve with data** |
| **Professionals trust AI recommendations**             | **Low adoption of automated features**  | **Gradual rollout with human oversight options**          |
| **Revenue protection features drive engagement**       | **Feature complexity overwhelms users** | **Progressive disclosure, role-based UI customisation**   |

---

## 16. Professional Success Framework

### Revenue Protection Value Proposition

- **For Real Estate Agents**: Prevent commission delays by ensuring smooth settlements
- **For Conveyancers**: Reduce matter overruns that impact hourly billing
- **For Mortgage Brokers**: Protect trail commissions from settlement failures
- **For Inspectors**: Maximise daily throughput with optimised scheduling
- **For Developers**: Ensure on-time settlements for cash flow management
- **For Valuers**: Faster report turnaround increases monthly capacity

### Professional Onboarding Journey

1. **Role Detection**: AI identifies professional type from signup context
2. **Integration Setup**: Connect calendars, MLS, existing tools
3. **Deal Import**: Bulk import active transactions from existing systems
4. **Risk Assessment**: AI analyses historical deal patterns for baseline
5. **Dashboard Customisation**: Personalise views based on business priorities
6. **Team Coordination**: Invite assistants/team members with appropriate permissions

### Professional Retention Strategy

- **Weekly Business Intelligence**: Revenue trends, efficiency metrics, market insights
- **Quarterly Business Reviews**: Analyse settlement success rates, identify improvement opportunities
- **Professional Community**: Industry forums, best practice sharing, peer benchmarking
- **Continuing Education**: Regular webinars on market trends, regulatory updates, tool optimisation

Below is a broad, "idea-dump" catalogue of everything Transactor's AI agents could conceivably handle for a buyer at each stage. Use it as a menu; you can trim or sequence later.

---

## 1. Pre-Purchase (Research & Readiness)

| Theme                   | Agent-Powered Tasks                                                                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Financial Readiness** | • Savings planner & deposit goal tracker <br>• Stamp-duty and LMI calculators <br>• First-home buyer grant / concession eligibility check <br>• Borrowing-capacity modelling with interest-rate stress tests <br>• Credit-score "what-if" coach (e.g. pay down card → +X borrowing) |
| **Market Intelligence** | • Suburb-level price trends & comparable-sales digests <br>• School-catchment, transport & amenities heat-maps <br>• Auction-clearance stats & seasonality tips                                                                                                                     |
| **Property Discovery**  | • Listing scraper → daily short-list email <br>• Voice/Chat search: "3-bed within 10 km of CBD under \$950 k" <br>• Smart alerts when a price guide drops                                                                                                                           |
| **Due-Diligence Prep**  | • Auto-book building/pest, strata, flood-risk reports for shortlisted homes <br>• Explain contract clauses in plain English                                                                                                                                                         |
| **Team Assembly**       | • Match & schedule chats with brokers, conveyancers, inspectors <br>• Surface provider ratings & fixed-fee quotes                                                                                                                                                                   |
| **Offer Strategy**      | • Auction bidding simulator & walk-away price guidance <br>• Negotiation script suggestions for private treaties                                                                                                                                                                    |
| **Logistics**           | • Pre-approved mover/cleaner short-lists for settlement day <br>• Collated ID docs for 100-point checks                                                                                                                                                                             |

---

## 2. During Purchase (Contract → Settlement)

| Theme                     | Agent-Powered Tasks                                                                                                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Deal Milestones**       | • Visual timeline auto-generated from contract dates <br>• Reminder nudges: cooling-off, finance, building/pest, Section 32 review, FIRB (if relevant)                                                                                                                                            |
| **Document Management**   | • Secure upload & version control for contract, Form 1, special conditions <br>• **Intelligent data extraction**: Contract uploads auto-populate property details, dates, financials <br>• AI summaries: "Key obligations & penalties in this contract" <br>• Clause-by-clause compliance checker |
| **Communication Hub**     | • One chat thread spanning buyer, agent, broker, conveyancer <br>• Auto-sync email/SMS into thread; action-item extraction                                                                                                                                                                        |
| **Finance Finalisation**  | • Track loan application status; push missing-document checklist <br>• Compare lender's final rate vs. market & suggest renegotiation language                                                                                                                                                    |
| **Funds Flow**            | • Calculate settlement statement (deposit paid, adjustments, fees) <br>• Warn if shortfall likely; queue bank cheque or PEXA instructions                                                                                                                                                         |
| **Risk Monitoring**       | • Alert if building/pest report flags major defect <br>• Flag unconditional risk before finance approved                                                                                                                                                                                          |
| **Insurance & Utilities** | • Auto-quote building & contents insurance effective settlement day <br>• One-click electricity/gas/internet transfer                                                                                                                                                                             |
| **Legal & Compliance**    | • Verify VOI (Verification of Identity) requirements met <br>• Track discharge of vendor's mortgage on title                                                                                                                                                                                      |
| **Emotion & Support**     | • Explain arcane terms ("caveat", "encumbrance") in plain language <br>• Stress-reduction check-ins: "7 days until settlement—here's what's left"                                                                                                                                                 |

---

## 3. Post-Purchase (Ownership, Optimisation, Growth)

| Theme                      | Agent-Powered Tasks                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Handover & Move-In**     | • Digital "settlement pack" with keys, warranties, appliance manuals <br>• Moving-day timeline & reminder list                                                                                             |
| **Property Admin**         | • Council & water rates calendar; auto-pay setup <br>• Maintenance scheduler (smoke alarms, gutters, termite checks) with service-provider suggestions                                                     |
| **Financial Optimisation** | • Monthly loan repayment monitor; alert when refinance could save >X% <br>• Equity tracker integrating latest CoreLogic valuation feeds <br>• Offset-account sweep rules ("move surplus >\$2 k to offset") |
| **Tax & Reporting**        | • End-of-financial-year report with deductible interest, depreciation (if investment) <br>• CGT estimator for future sale scenarios                                                                        |
| **Insurance Review**       | • Annual cover comparison; detect under-insurance after renovations                                                                                                                                        |
| **Renovation & Value-Add** | • ROI calculator for kitchen, solar, granny-flat <br>• Permit-requirement checker & recommended tradies                                                                                                    |
| **Lifestyle Services**     | • Reminders to update driver's licence / electoral roll address <br>• Local community onboarding (rubbish-collection days; "nearest dog park")                                                             |
| **Portfolio Expansion**    | • Scenario planning: "What if I use \$120 k equity for 2nd investment?" <br>• Cash-flow modelling and linking to mortgage broker pipeline                                                                  |
| **Exit & Sell**            | • Market-timing alerts: "Suburb X median up 8 % YoY—time to list?" <br>• Pre-sale checklist and agent-matching just like the original buy flow                                                             |
| **Health & Happiness**     | • Carbon-footprint tracker for home energy use (green loans) <br>• Mood check-ins: "How's the new place? Need a handyman?"                                                                                 |

---

### How This Maps to Your Agent Suite

| Phase           | Primary Agent(s)                 | Key Sub-agents / Workflows                         |
| --------------- | -------------------------------- | -------------------------------------------------- |
| Pre-Purchase    | BuyerAgent, FinanceAgent         | MarketIntelAgent, MatchAgent, RiskProfiler         |
| During Purchase | Orchestrator + ConveyancingAgent | ComplianceAgent, FundsFlowAgent, NotificationAgent |
| Post-Purchase   | OwnershipAgent                   | EquityAgent, MaintenanceScheduler, RefinanceScout  |

This exhaustive list should spark feature-prioritisation conversations: decide what belongs in MVP vs. v2, and which tasks can simply be "hand-off" (e.g., launch a partner webform) versus fully automated inside your Mastra workflows.

---

## Additional User Journey Details

### Equity Explorer Journey (David, 33)

**Entry Point**: `/` → "I want to know how much equity I have"

**AI-Orchestrated Experience Flow**:

```
AI: "Let's unlock your property's potential! What's your address?"
User: [Property auto-populated from address lookup]
AI: "Based on recent sales, your property is worth ~$780k. What do you still owe?"
User: "$520k on the mortgage"
AI: [Equity calculator executes] "Excellent! You have $260k equity. Here are your options..."
```

**Key Agent-Powered Features**:

- **Instant Valuation**: CoreLogic API + comparable sales analysis
- **Equity Scenarios**: Renovation ROI vs investment property vs lifestyle spending
- **Broker Matching**: Connect with equity release specialists
- **Risk Assessment**: LVR calculations and serviceability checks
- **Market Intelligence**: Optimal timing for equity release strategies

---

### Aspiring Buyer Journey (Emma, 26)

**Entry Point**: `/` → "I'm saving for my first home"

**AI-Orchestrated Experience Flow**:

```
AI: "Let's create your homeownership roadmap! What's your savings goal?"
User: "I want to buy around $500k in Melbourne"
AI: [Calculates deposit + costs] "You'll need ~$65k total. Current savings?"
User: "$25k saved so far"
AI: "Great start! Here's your personalised savings plan..."
```

**Key Agent-Powered Features**:

- **Dynamic Savings Plan**: Tracks progress toward deposit + stamp duty + costs
- **Market Timing**: Alerts when market conditions favor first-home buyers
- **Grant Optimization**: Maximizes all available government assistance
- **Budget Scenarios**: Shows impact of different deposit amounts on borrowing
- **Readiness Tracker**: Gamified progress with milestone celebrations

---

### Overwhelmed New Owner Journey (Jake, 30)

**Entry Point**: `/` → "I just bought my first home and I'm overwhelmed"

**AI-Orchestrated Experience Flow**:

```
AI: "Congratulations on your new home! I'll help you settle in smoothly."
User: "I don't know what I'm supposed to do now"
AI: "No worries - I've created your post-purchase checklist. First priority..."
```

**Key Agent-Powered Features**:

- **Post-Settlement Checklist**: Utilities, insurance, council rates, etc.
- **Maintenance Scheduler**: Seasonal reminders with trusted tradie connections
- **Financial Optimization**: Rate monitoring, insurance reviews, budgeting
- **Homeowner Education**: Plain-English guides for property ownership
- **Stress Reduction**: "You're doing great" check-ins with helpful tips
- **Community Connection**: Local services, emergency contacts, neighborhood info

2. What an AI-first consumer concierge actually does
   🔎 Pre-purchase
   Hyper-personalised discovery feed ("3-bed house, < 30 min to CBD, child-care rating ≥ 8")

Deposit & stamp-duty planner, first-home grant eligibility wizard

Auto-summaries of strata, building & pest reports

Auction-bidding simulator and negotiation playbooks

📝 Contract-to-settlement
Real-time milestone tracker that pushes tasks to professionals:
"Your conveyancer hasn't ordered searches—shall I nudge them?"

One-tap quotes and live chat with shortlisted conveyancers, brokers, inspectors

Settlement cost calculator + shortfall alerts

Insurance & utilities switch-over wizard

🏡 Post-purchase / Ownership
Live equity meter (CoreLogic or Domain AVM feed)

Refinance scout: alert when saving > A$2 000 p.a. is possible

Maintenance scheduler and tradie marketplace

Reno ROI calculator & DA / permit checker

Capital-gains and depreciation ledger for investors
