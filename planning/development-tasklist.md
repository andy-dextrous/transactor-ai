# 🎯 **TRANSACTOR 2.0 - DEVELOPMENT TASK LIST**

**Version:** 2.0  
**Date:** January 2025  
**Architecture:** Vertical-first, scalable foundation using Mastra + Supabase + Prisma

---

## 🏗️ **DEVELOPMENT PHILOSOPHY**

### **Vertical-First Approach**

This task list follows a **vertical-first development strategy** designed for maximum scalability and maintainability:

**Core Principle**: Build one complete user vertical (Buyer) with all necessary infrastructure, then replicate patterns for additional verticals rather than building horizontally across features.

**Why This Approach Works**:

- ✅ **Scalability**: Every new vertical reuses proven patterns
- ✅ **Stability**: Core architecture is battle-tested before expansion
- ✅ **Speed**: Subsequent verticals are 70% copy-paste with vertical-specific additions
- ✅ **Maintainability**: Consistent patterns across the entire application
- ✅ **Risk Reduction**: Unknown issues surface in Phase 1, not during scaling

**Phase Structure**:

- **Phase 1**: Buyer Vertical (Foundation) - Complete end-to-end experience
- **Phase 2**: Seller Vertical - Reuse patterns, add seller-specific tools
- **Phase 3**: Investor Vertical - Reuse patterns, add investment tools
- **Phase 4**: Professional Verticals - Reuse patterns, add professional workflows
- **Phase 5**: Advanced Features - Cross-vertical enhancements
- **Phase 6**: Scale & Polish - Performance, security, mobile

Each phase produces a **stable, deployable vertical** that can operate independently while sharing the same foundational architecture.

---

## 🚨 **CRITICAL IMPLEMENTATION NOTES**

### **Phase 1 is Make-or-Break**

The buyer vertical serves as the **architectural foundation** for the entire application. Getting Phase 1 right is critical because:

- **70% of subsequent code** will be copied from Phase 1 patterns
- **All hybrid architecture patterns** (Mastra + Prisma) are established here
- **Agent orchestration model** must work perfectly before scaling
- **Chat-centric UX patterns** become the template for all verticals

### **Key Success Factors**

1. **Database First**: Complete Prisma schema before any other work
2. **Hybrid Architecture**: Server actions must seamlessly bridge Mastra and Prisma
3. **Agent Alignment**: Agents must match PRD specifications exactly
4. **PRD Compliance**: All buyer user stories must work before Phase 2
5. **Pattern Documentation**: Every pattern must be documented for replication

### **Risk Mitigation**

- **Week 1 Checkpoint**: Database schema and server actions must be complete
- **Week 2 Checkpoint**: Agent system must handle buyer conversations correctly
- **Week 3 Checkpoint**: Chat interface must display tool results inline
- **Week 4 Gate**: All PRD buyer stories must pass E2E tests

**If any checkpoint fails, STOP and fix before proceeding. Phase 1 quality determines entire project success.**

---

## 📊 **CURRENT STATE ASSESSMENT**

### ✅ **What's Complete**

- ✅ **Project Setup**: Next.js 15, React 19, Tailwind 4, Radix components
- ✅ **Mastra Foundation**: Core instance with basic agents
- ✅ **Database Infrastructure**: Supabase + Prisma setup (schema empty)
- ✅ **UI Library**: Complete Radix design system in `src/components/ui/`
- ✅ **Property Components**: Basic cards and layouts
- ✅ **Chat Foundation**: Mastra chat UI components

### 🚧 **What Needs Building - CRITICAL GAPS IDENTIFIED**

- 🚧 **Prisma Schema**: **EMPTY** - No application data models (BLOCKS ALL FUNCTIONALITY)
- 🚧 **Agent System**: Current agents (weather, file, orchestrator) don't match PRD requirements
- 🚧 **Route Structure**: Missing user journey routes - no onboarding or dashboard
- 🚧 **Server Actions**: No Mastra/Prisma bridge - hybrid architecture not implemented
- 🚧 **Dashboard**: No contextual panels - chat interface incomplete
- 🚧 **Vertical Tools**: No role-specific functionality - buyer tools missing
- 🚧 **Document Processing**: No auto-extraction capabilities (SYS-03, SYS-04 requirements)
- 🚧 **Financial Tools**: No mortgage calculator, affordability checker, or grant eligibility
- 🚧 **Property Integration**: No property search or valuation API connections

### ⚠️ **CRITICAL DEPENDENCIES**

**Week 1 is CRITICAL** - All subsequent work depends on:

1. **Complete Prisma schema** with all models and relationships
2. **Hybrid server actions** bridging Mastra and Prisma
3. **Agent system redesign** to match PRD specifications
4. **Route foundation** supporting chat-centric UX

---

## 📋 **DEVELOPMENT PHASES**

## **PHASE 1: BUYER VERTICAL FOUNDATION (Weeks 1-4)**

_This phase establishes ALL foundational patterns that subsequent verticals will reuse_

### **1.1 Prisma Schema Foundation (Week 1, Days 1-2) - CRITICAL FIRST**

**Goal**: Complete data model supporting all user types with buyer-first design

- [ ] **Core Models** (Priority 1 - Required for all functionality)

  - [ ] `User` model with all roles (`BUYER`, `SELLER`, `INVESTOR`, `CONVEYANCER`, etc.)
  - [ ] `Property` model for all listing types with coordinates and valuation fields
  - [ ] `Transaction` model for all transaction types with timeline dates
  - [ ] `MastraIntegration` bridge table (buyer as first use case) - **CRITICAL FOR HYBRID ARCHITECTURE**
  - [ ] `FinancialProfile` for all financial scenarios with borrowing capacity
  - [ ] `Provider` model for professional marketplace
  - [ ] `Document` model with AI processing fields and auto-extraction status

- [ ] **Supporting Models** (Priority 2)

  - [ ] `TransactionParticipant` for multi-party transactions
  - [ ] `Milestone` for all transaction types with critical path tracking
  - [ ] `Quote` for marketplace functionality
  - [ ] `Review` for provider ratings
  - [ ] `MarketData` for property insights and trends

- [ ] **Enums & Types** (Priority 3)

  - [ ] All `UserRole` values for future verticals
  - [ ] All `TransactionType` and `TransactionStatus` values
  - [ ] All `PropertyType` and supporting enums
  - [ ] `AgentType`, `TransactionPhase`, `MastraStatus` for agent integration

- [ ] **Database Setup**
  - [ ] **Migration**: `pnpm prisma migrate dev --name foundation`
  - [ ] **Seed Script**: Create realistic test data for buyer scenarios
  - [ ] **Validation**: Test all relationships and constraints

### **1.2 Server Actions Architecture (Week 1, Days 3-4) - FOUNDATION PATTERN**

**Goal**: Establish scalable patterns for Mastra/Prisma integration - **CRITICAL FOR HYBRID ARCHITECTURE**

- [ ] **Core Actions** (Must define patterns first)

  - [ ] `src/lib/mastra-actions.ts` - All Mastra operations (agent routing, chat, workflows)
  - [ ] `src/lib/prisma-actions.ts` - All database operations (CRUD, relations)
  - [ ] `src/lib/hybrid-actions.ts` - **CRITICAL**: Bridge operations (transaction creation with agents)

- [ ] **Hybrid Integration Patterns** (New - Critical)

  - [ ] `createTransactionWithAgent()` - Creates Prisma record + starts Mastra workflow
  - [ ] `updateTransactionPhase()` - Updates both Prisma status and Mastra context
  - [ ] `syncAgentToDatabase()` - Bridges agent conversations to database records
  - [ ] `getTransactionContext()` - Retrieves combined Prisma + Mastra data for agents

- [ ] **Error Handling**

  - [ ] Standardized error types and responses
  - [ ] Retry logic for Mastra operations
  - [ ] Transaction rollback patterns for hybrid operations
  - [ ] **Mastra workflow failure recovery**

- [ ] **Type Safety**
  - [ ] Zod schemas for all action inputs
  - [ ] TypeScript strict mode compliance
  - [ ] Return type standardization
  - [ ] **Hybrid operation type definitions**

### **1.3 Agent System Foundation (Week 2) - BUYER-SPECIFIC AGENTS**

**Goal**: Scalable agent architecture with buyer as first implementation - **MUST ALIGN WITH PRD AGENT HIERARCHY**

- [ ] **Core Agents** (Following PRD Agent System Design)

  - [ ] `src/mastra/agents/orchestrator-agent.ts` - **Master Controller** - Routes to all vertical agents
  - [ ] `src/mastra/agents/buyer-agent.ts` - **Buyer-specific orchestration** with property search focus
  - [ ] `src/mastra/agents/finance-agent.ts` - **Financial calculations** (mortgage, affordability, grants)
  - [ ] `src/mastra/agents/property-agent.ts` - **Property insights** (valuations, market data, comparisons)
  - [ ] `src/mastra/agents/document-agent.ts` - **Document analysis** and auto-extraction (contracts, statements)

- [ ] **Buyer-Specific Agent Tools** (Aligned with PRD buyer stories)

  - [ ] `src/mastra/tools/mortgage-calculator.ts` - B-01 financial scenarios
  - [ ] `src/mastra/tools/property-search.ts` - B-01 listing discovery and auto-fill
  - [ ] `src/mastra/tools/affordability-checker.ts` - First-home buyer focus
  - [ ] `src/mastra/tools/stamp-duty-calculator.ts` - State-specific calculations
  - [ ] `src/mastra/tools/grant-eligibility.ts` - **NEW**: First-home buyer grants
  - [ ] `src/mastra/tools/document-extractor.ts` - **NEW**: Auto-fill from uploads (SYS-03, SYS-04)

- [ ] **Buyer Workflows** (Aligned with PRD buyer journey)

  - [ ] `src/mastra/workflows/buyer-onboarding.ts` - Chat-first setup < 5 minutes
  - [ ] `src/mastra/workflows/property-purchase.ts` - Contract to settlement coordination
  - [ ] `src/mastra/workflows/document-processing.ts` - **NEW**: Auto-extraction and pre-filling
  - [ ] Workflow persistence testing with buyer scenarios

- [ ] **Mastra Configuration** (Updated for buyer focus)
  - [ ] Update `src/mastra/index.ts` with buyer-specific agents
  - [ ] **Orchestrator routing logic** for buyer conversations
  - [ ] **Memory and context management** for buyer journey phases
  - [ ] **Tool result display components** for inline chat results

### **1.4 Route Architecture (Week 2) - CHAT-CENTRIC DESIGN**

**Goal**: Scalable route structure supporting all user types - **ALIGNED WITH APP STRUCTURE DOCUMENT**

- [ ] **Onboarding Routes** (Following App Structure 80/20 rule)

  - [ ] `src/app/(onboarding)/welcome/page.tsx` - **Universal role picker** with chat preview
  - [ ] `src/app/(onboarding)/chat-setup/page.tsx` - **Role-specific onboarding** in chat format
  - [ ] `src/app/(onboarding)/professional-verify/page.tsx` - Professional verification only

- [ ] **Dashboard Foundation** (PRIMARY EXPERIENCE - 80% of time)

  - [ ] `src/app/dashboard/[[...threadId]]/page.tsx` - **Universal chat interface** with contextual panels
  - [ ] `src/app/dashboard/[[...threadId]]/layout.tsx` - **Two-pane responsive layout**: Chat (left) + Context Panel (right)
  - [ ] **Role-based contextual panels** that update automatically based on conversation
  - [ ] **Mobile-responsive chat layout** for all user types

- [ ] **Supporting Routes** (20% of interactions)

  - [ ] `src/app/tools/` - **Standalone calculator routes** for deep-dive analysis
  - [ ] `src/app/manage/` - **Administrative routes** for document/transaction management
  - [ ] `src/app/marketplace/` - **Provider discovery** and comparison
  - [ ] `src/app/professional/` - **Provider-specific dashboards** (future phases)

- [ ] **Route Integration Patterns** (New - Critical)
  - [ ] **Chat-to-route navigation** - Tools launch from chat, return to chat
  - [ ] **Context preservation** - Route changes maintain conversation context
  - [ ] **Universal header/navigation** - Consistent across all routes

### **1.5 Chat Interface Foundation (Week 3)**

**Goal**: Universal chat system supporting all user types

- [ ] **Core Components**

  - [ ] `src/components/chat/chat-interface.tsx` - Universal chat container
  - [ ] `src/components/chat/contextual-panel.tsx` - Role-aware context display
  - [ ] `src/components/chat/chat-header.tsx` - Role-specific header
  - [ ] `src/components/chat/chat-input.tsx` - Universal input with attachments

- [ ] **Tool Results**

  - [ ] `src/components/tools/mortgage-calculator-result.tsx`
  - [ ] `src/components/tools/property-search-results.tsx`
  - [ ] `src/components/tools/affordability-result.tsx`
  - [ ] `src/components/tools/tool-result-wrapper.tsx` - Universal wrapper

- [ ] **Context Panels**
  - [ ] `src/components/panels/buyer-context-panel.tsx`
  - [ ] `src/components/panels/property-summary-card.tsx`
  - [ ] `src/components/panels/transaction-progress.tsx`
  - [ ] `src/components/panels/quick-actions.tsx`

### **1.6 Real-time & State Management (Week 3)**

**Goal**: Scalable real-time updates for all verticals

- [ ] **Custom Hooks**

  - [ ] `src/hooks/use-mastra-chat.ts` - Universal chat management
  - [ ] `src/hooks/use-ai-context.ts` - Context panel management
  - [ ] `src/hooks/use-user-profile.ts` - Multi-role profile management
  - [ ] `src/hooks/use-real-time.ts` - Supabase subscriptions

- [ ] **Real-time Integration**
  - [ ] Supabase real-time setup for all tables
  - [ ] Live context panel updates
  - [ ] Optimistic UI patterns

### **1.7 Testing & Validation (Week 4) - BUYER VERTICAL VALIDATION**

**Goal**: Establish testing patterns for all verticals - **VALIDATE FOUNDATION BEFORE SCALING**

- [ ] **Testing Foundation**

  - [ ] **Unit tests for server actions** - All hybrid operations
  - [ ] **Integration tests for workflows** - Buyer onboarding and purchase flows
  - [ ] **E2E buyer journey tests** - Complete user stories B-01, SYS-03, SYS-04
  - [ ] **Agent conversation tests** - Tool calling and context management
  - [ ] **Hybrid architecture tests** - Mastra/Prisma integration patterns

- [ ] **Critical Validation Points** (Must pass before Phase 2)

  - [ ] **Database schema completeness** - All relationships working
  - [ ] **Agent routing accuracy** - Orchestrator correctly routes buyer conversations
  - [ ] **Tool execution reliability** - All buyer tools execute and display results
  - [ ] **Context panel automation** - Updates based on conversation state
  - [ ] **Document auto-extraction** - Contracts and statements pre-fill data correctly

- [ ] **Success Criteria** (Phase 1 Gates)
  - [ ] Complete buyer onboarding < 5 minutes (PRD requirement)
  - [ ] Chat interface handles conversations seamlessly
  - [ ] Tools display results inline within 3 seconds (PRD performance requirement)
  - [ ] Contextual panel updates automatically
  - [ ] Mobile experience fully functional
  - [ ] **All PRD buyer user stories (B-01, B-04, SYS-02, SYS-03, SYS-04) working**

---

## **PHASE 2: SELLER VERTICAL (Week 5)**

_Reuse Phase 1 patterns, add seller-specific functionality_

### **2.1 Seller Agent & Tools (Week 5)**

- [ ] **New Agents**

  - [ ] `src/mastra/agents/seller-agent.ts` - Copy buyer-agent patterns
  - [ ] Update orchestrator routing for seller role

- [ ] **Seller-Specific Tools**

  - [ ] `src/mastra/tools/pricing-estimator.ts`
  - [ ] `src/mastra/tools/marketing-strategy.ts`
  - [ ] `src/mastra/tools/capital-gains-calculator.ts`

- [ ] **Seller Workflows**
  - [ ] `src/mastra/workflows/seller-onboarding.ts` - Copy buyer patterns
  - [ ] `src/mastra/workflows/property-listing.ts`

### **2.2 Seller UI Components (Week 5)**

- [ ] **Context Panels**

  - [ ] `src/components/panels/seller-context-panel.tsx` - Copy buyer patterns
  - [ ] `src/components/panels/listing-performance.tsx`
  - [ ] `src/components/panels/market-insights.tsx`

- [ ] **Tool Results**
  - [ ] `src/components/tools/pricing-result.tsx`
  - [ ] `src/components/tools/marketing-strategy-result.tsx`

### **2.3 Seller Testing (Week 5)**

- [ ] E2E seller journey tests
- [ ] Seller-specific agent conversation tests

---

## **PHASE 3: INVESTOR VERTICAL (Week 6)**

_Reuse established patterns, add investment-specific functionality_

### **3.1 Investor Agent & Tools (Week 6)**

- [ ] **New Agents**

  - [ ] `src/mastra/agents/investor-agent.ts` - Copy established patterns
  - [ ] Update orchestrator routing

- [ ] **Investment Tools**

  - [ ] `src/mastra/tools/roi-calculator.ts`
  - [ ] `src/mastra/tools/cash-flow-analyzer.ts`
  - [ ] `src/mastra/tools/portfolio-optimizer.ts`

- [ ] **Investment Workflows**
  - [ ] `src/mastra/workflows/investor-onboarding.ts`
  - [ ] `src/mastra/workflows/investment-analysis.ts`

### **3.2 Investor UI Components (Week 6)**

- [ ] **Context Panels**

  - [ ] `src/components/panels/investor-context-panel.tsx`
  - [ ] `src/components/panels/portfolio-summary.tsx`
  - [ ] `src/components/panels/investment-metrics.tsx`

- [ ] **Tool Results**
  - [ ] `src/components/tools/roi-result.tsx`
  - [ ] `src/components/tools/cash-flow-result.tsx`

---

## **PHASE 4: PROFESSIONAL VERTICALS (Weeks 7-8)**

_Apply patterns to professional user types_

### **4.1 Professional Agent System (Week 7)**

- [ ] **Professional Agents**

  - [ ] `src/mastra/agents/conveyancer-agent.ts`
  - [ ] `src/mastra/agents/broker-agent.ts`
  - [ ] `src/mastra/agents/inspector-agent.ts`

- [ ] **Professional Tools**
  - [ ] `src/mastra/tools/matter-manager.ts`
  - [ ] `src/mastra/tools/commission-tracker.ts`
  - [ ] `src/mastra/tools/schedule-optimizer.ts`

### **4.2 Professional Dashboards (Week 7)**

- [ ] **Professional Routes**
  - [ ] `src/app/professional/conveyancer/` - Matter management
  - [ ] `src/app/professional/broker/` - Application pipeline
  - [ ] `src/app/professional/inspector/` - Booking calendar

### **4.3 Professional Workflows (Week 8)**

- [ ] **Advanced Workflows**
  - [ ] `src/mastra/workflows/settlement-coordination.ts`
  - [ ] `src/mastra/workflows/risk-monitoring.ts`
  - [ ] `src/mastra/workflows/professional-matching.ts`

---

## **PHASE 5: ADVANCED FEATURES (Weeks 9-10)**

_Cross-vertical enhancements_

### **5.1 Document Intelligence (Week 9)**

- [ ] **Document Processing**
  - [ ] Supabase Storage integration
  - [ ] Document AI analysis workflows
  - [ ] Auto-fill integration across all verticals

### **5.2 Marketplace & Matching (Week 9)**

- [ ] **Provider Marketplace**
  - [ ] Vector-based provider matching
  - [ ] Quote management system
  - [ ] Review and rating system

### **5.3 Financial Intelligence (Week 10)**

- [ ] **Advanced Calculators**
  - [ ] Comprehensive equity modeling
  - [ ] Multi-property scenarios
  - [ ] Refinancing optimization

### **5.4 External API Integration (Week 10)**

- [ ] **Property Data**
  - [ ] CoreLogic valuation integration
  - [ ] RateCity mortgage data
  - [ ] Real estate listing APIs

---

## **PHASE 6: SCALE & POLISH (Weeks 11-12)**

_Production readiness and optimization_

### **6.1 Performance Optimization (Week 11)**

- [ ] **Performance Audits**
  - [ ] Agent response time optimization
  - [ ] Database query optimization
  - [ ] Real-time update efficiency
  - [ ] Mobile performance tuning

### **6.2 Security & Compliance (Week 11)**

- [ ] **Security Hardening**
  - [ ] Role-based access control audit
  - [ ] Document encryption verification
  - [ ] API rate limiting
  - [ ] Data retention policies

### **6.3 Production Deploy (Week 12)**

- [ ] **Deployment Pipeline**

  - [ ] Staging environment setup
  - [ ] Production deployment
  - [ ] Monitoring and alerting
  - [ ] Error tracking setup

- [ ] **Final Testing**
  - [ ] Load testing all verticals
  - [ ] End-to-end multi-role testing
  - [ ] Accessibility audit
  - [ ] Security penetration testing

---

## 🎯 **SUCCESS METRICS BY PHASE**

### **Phase 1 (Buyer Foundation)**

- [ ] Complete buyer journey < 5 minutes
- [ ] All foundational patterns established
- [ ] 100% test coverage for core functionality

### **Phase 2-3 (Additional Verticals)**

- [ ] Each new vertical takes < 1 week to implement
- [ ] 80% code reuse from Phase 1 patterns
- [ ] Consistent user experience across all roles

### **Phase 4 (Professional Verticals)**

- [ ] Professional workflow automation working
- [ ] Revenue protection features operational
- [ ] Multi-party coordination seamless

### **Phase 5-6 (Advanced & Scale)**

- [ ] System handles 1000+ concurrent users
- [ ] P95 response times < 3 seconds
- [ ] Zero critical security vulnerabilities

---

## 🔄 **SCALABILITY STRATEGY**

### **Pattern Replication**

Each vertical follows these established patterns:

1. **Agent Creation**: Copy agent structure, modify tools/instructions
2. **Route Addition**: Copy route patterns, modify role-specific content
3. **Component Extension**: Copy UI patterns, modify role-specific displays
4. **Workflow Replication**: Copy workflow structure, modify role-specific steps
5. **Testing Template**: Copy test patterns, modify role-specific scenarios

### **Shared Infrastructure**

All verticals share:

- ✅ Database schema and relationships
- ✅ Server action patterns
- ✅ Chat interface foundation
- ✅ Real-time update system
- ✅ Authentication and authorization
- ✅ Error handling and logging

This approach ensures **70% code reuse** for each new vertical while maintaining consistency and reducing development time exponentially.
