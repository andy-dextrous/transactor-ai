# Transactor 2.0 - Development Tasklist

**Version:** 1.1  
**Date:** January 2025  
**Status:** ~40% Foundation Complete - Focus on Backend & AI Integration  
**Approach:** Vertical MVP by Persona - Build complete functionality for one user journey before expanding

---

## Overview

This tasklist implements a **vertical-first approach** where we build complete end-to-end functionality for one persona before moving to the next. This ensures we have a fully working proof-of-concept that validates our chat-centric, AI-first architecture.

**✅ COMPLETED FOUNDATION (~40% of Phase 1)**:

- Complete Next.js 15 + Convex + Tailwind CSS 4 setup
- Comprehensive UI library (47+ components)
- Full design system with theme, typography, utilities
- All core dependencies installed and configured
- Basic project structure and component library

**🎯 CURRENT PRIORITY**: Backend data model, AI agent integration, and chat-to-database connectivity

**Phase Strategy:**

1. **Phase 1** - First-Time Buyer Journey (Complete MVP) - **6-7 weeks remaining**
2. **Phase 2** - Upgrader Seller Journey
3. **Phase 3** - Professional User Interfaces
4. **Phase 4** - Post-Purchase Legal Support
5. **Phase 5** - Equity Investment Journey

---

## Phase 1: First-Time Buyer Journey (Complete MVP)

**Target Persona:** Chloe, 28, First-Time Buyer  
**Duration:** 6-7 weeks remaining (3-4 weeks saved from foundation work)  
**Goal:** Complete chat-centric property buying experience with all core features

### ✅ Foundation Setup (COMPLETE)

#### ✅ 1.1 Project Infrastructure (COMPLETE)

- [x] ✅ Initialize Next.js 15 project with App Router
- [x] ✅ Setup Convex backend with agent components
- [x] ✅ Configure Tailwind CSS 4 with custom design system
- [x] ✅ Setup TypeScript configuration
- [x] ✅ Configure environment variables for development
- [x] ✅ Setup GitHub repository and basic CI/CD

#### ✅ 1.2 Core Dependencies Installation (COMPLETE)

- [x] ✅ Install and configure `@convex-dev/agent` for AI agents
- [x] ✅ Setup Radix UI component library (47+ components built)
- [x] ✅ Install form management (React Hook Form + Zod)
- [x] ✅ Configure GSAP for animations
- [x] ✅ Setup authentication provider
- [x] ✅ Install additional dependencies per package.json

#### ✅ 1.3 Basic Project Structure (COMPLETE)

- [x] ✅ Create app directory structure following chat-centric routes
- [x] ✅ Create component directory structure (comprehensive UI library)
- [x] ✅ Setup utility functions and types
- [x] ✅ Build complete design system (/app/css/)
- [x] ✅ Create component library documentation (/library)

**🎯 WEEK 1 PRIORITY: Data Model & Backend (URGENT)**

### 2.1 Convex Schema Expansion (CRITICAL - BLOCKING)

- [ ] **🔥 URGENT: Expand schema.ts** - Replace basic messages table with comprehensive schema
- [ ] Define `users` table with buyer persona fields
- [ ] Create `properties` table for property data
- [ ] Setup `transactions` table for purchase workflows
- [ ] Define `conversation_panels` table for context management
- [ ] Create `agent_tools` table for tool definitions
- [ ] Setup `tool_executions` table for chat tool history
- [ ] Create `conversation_context` table for AI memory
- [ ] Add `financial_profiles` table for user financial data
- [ ] Create `providers` table for service provider marketplace
- [ ] Setup `quotes` table for provider quotes
- [ ] Add `documents` table for file management

### 2.2 Database Seeding (ENABLES AI TESTING)

- [ ] **Seed service providers** - 20-30 providers per major city (conveyancers, brokers, inspectors)
- [ ] **Seed sample properties** - 50-100 realistic listings across first-home buyer price ranges
- [ ] **Seed market intelligence** - Current median prices, growth rates for 10-15 key suburbs per city
- [ ] **Seed financial reference data** - Interest rates, stamp duty rates, first home buyer grants
- [ ] **Create seeding scripts** - Automated database population for development/testing
- [ ] **Add sample user personas** - Test profiles with different budgets and preferences

### 2.3 Core Convex Functions (HIGH PRIORITY)

- [ ] User management functions (create, update, get)
- [ ] Property search and management functions
- [ ] Transaction workflow functions
- [ ] Conversation context management functions
- [ ] Tool execution tracking functions
- [ ] File upload and document management functions
- [ ] Provider matching and quote functions
- [ ] Financial calculation functions

### 2.4 AI Agent Setup (HIGH PRIORITY)

- [ ] Configure basic Convex Agent with OpenAI integration
- [ ] Setup agent instructions for first-time buyer assistance
- [ ] Implement basic tool calling infrastructure
- [ ] Create conversation memory and context system
- [ ] Setup agent thread management
- [ ] Configure real-time subscriptions

**WEEK 2 PRIORITY: Chat Interface Integration**

### 3.1 Main Dashboard Layout (INTEGRATE EXISTING UI)

- [ ] **Create `/dashboard/[threadId?]` route** - Missing from current structure
- [ ] **Connect existing ChatUI component** to Convex backend (currently mock)
- [ ] Build contextual panel (right panel, 40% width)
- [ ] Implement mobile-responsive design (leverage existing design system)
- [ ] **Replace mock chat** with real Convex agent integration
- [ ] Add real-time message streaming

### 3.2 Contextual Panel System (NEW COMPONENT)

- [ ] Build `ContextualPanel` component with AI control
- [ ] Create `PropertySummaryCard` component (use existing property cards as base)
- [ ] Build `FinancialSummary` component
- [ ] Create `QuickActions` component
- [ ] Implement `CalculationResults` component
- [ ] Add panel state management and real-time updates

### 3.3 Chat-AI Integration (BACKEND CONNECTION)

- [ ] **Connect chat to Convex Agent backend** (replace mock responses)
- [ ] Implement real-time message streaming
- [ ] Add typing indicators and loading states
- [ ] Create message history and pagination
- [ ] Implement conversation persistence
- [ ] Add error handling and retry logic

**WEEK 3 PRIORITY: Essential Tools Integration**

### 4.1 Tool Infrastructure (NEW SYSTEM)

- [ ] Create tool execution framework connecting chat to tools
- [ ] Build tool definition system for agent integration
- [ ] Create inline chat result component system
- [ ] Implement tool execution tracking
- [ ] Add tool permissions and context management

### 4.2 Convert Existing Demos to Working Tools

- [ ] **Mortgage Calculator Tool** - Convert existing demo to backend tool
- [ ] **Stamp Duty Calculator Tool** - Convert demo + add state-specific logic
- [ ] **Property Search Tool** - Build from existing property components
- [ ] **Equity Calculator** - Convert existing demo components

### 4.3 Financial Tools Suite (BACKEND + UI INTEGRATION)

- [ ] Borrowing Capacity Calculator (backend functions)
- [ ] Total Purchase Cost Calculator (combine multiple calculations)
- [ ] Savings Goal Calculator (timeline projections)
- [ ] First Home Buyer Grant integration

**WEEK 4 PRIORITY: Route Structure & Core Flows**

### 5.1 Missing Core Routes (CREATE NEW)

- [ ] Create `/onboarding/welcome` route (missing)
- [ ] Build `/tools/calculator/` route structure (missing)
- [ ] Create `/marketplace/find/[serviceType]` routes (missing)
- [ ] Build `/manage/documents/` route (missing)
- [ ] Create `/manage/transactions/[id]` route (missing)

### 5.2 Onboarding Experience (NEW)

- [ ] Create welcome flow with role selection
- [ ] Build chat-based onboarding in main dashboard
- [ ] Implement progressive information gathering
- [ ] Add smooth transition to main chat experience
- [ ] Setup initial user profile creation

### 5.3 Layout Integration (CONNECT EXISTING COMPONENTS)

- [ ] **Add ConvexClientProvider to root layout** (currently missing)
- [ ] Setup proper navigation between routes
- [ ] Implement authentication flow
- [ ] Connect existing components to real data

**WEEK 5-6: Advanced Features**

### 6.1 Marketplace Integration (NEW SYSTEM)

- [ ] Create service provider data structure
- [ ] Build provider matching algorithm
- [ ] **Convert existing ServiceProviderCard** to work with real data
- [ ] Implement quote request system
- [ ] Build comparison and selection interface

### 6.2 Transaction Management (NEW WORKFLOW)

- [ ] Create transaction lifecycle management
- [ ] Build milestone tracking system
- [ ] **Convert existing timeline components** to real workflows
- [ ] Implement progress visualization
- [ ] Add automated notification system

### 6.3 Document Management (NEW SYSTEM)

- [ ] Create document upload system with Convex file storage
- [ ] Implement document categorization
- [ ] Add basic AI document analysis
- [ ] **Connect existing document components** to backend
- [ ] Build document status tracking

**WEEK 6-7: Polish & Testing**

### 7.1 UX Refinement (POLISH EXISTING)

- [ ] Optimize chat conversation flows
- [ ] Refine contextual panel responsiveness
- [ ] **Enhance existing mobile design** for chat interface
- [ ] Add loading states and transitions (leverage existing animations)
- [ ] Implement comprehensive error handling

### 7.2 AI Agent Optimization (FINE-TUNE)

- [ ] Fine-tune agent responses and personality
- [ ] Optimize tool calling accuracy
- [ ] Improve context understanding
- [ ] Add proactive assistance features
- [ ] Implement conversation learning

### 7.3 Testing & Deployment (FINAL)

- [ ] Comprehensive end-to-end testing
- [ ] User experience testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Deployment setup and configuration
- [ ] Monitoring and analytics setup

---

## 🎯 IMMEDIATE NEXT STEPS (This Week)

### **Priority 1: Convex Schema & Functions (BLOCKING EVERYTHING)**

1. **Expand `/src/convex/schema.ts`** with comprehensive data model
2. **Seed database with realistic data** - Enable meaningful AI conversations from day 1
3. **Create core Convex functions** for users, properties, transactions
4. **Setup AI agent configuration** with tool calling

### **Priority 2: Connect Chat to Backend (HIGH IMPACT)**

1. **Create `/dashboard/[threadId?]` route**
2. **Connect existing ChatUI** to real Convex agents (remove mocks)
3. **Build contextual panel system**

### **Priority 3: Tool Integration (USER VALUE)**

1. **Convert calculator demos** to working backend tools
2. **Create tool execution framework**
3. **Add inline result display**

---

## Phase 2: Upgrader Seller Journey (4-5 weeks)

**Target Persona:** Raj, 41, Upgrader Seller  
**Goal:** Dual transaction management (sell + buy simultaneously)

### 2.1 Dual Transaction Management

- [ ] Extend transaction system for linked sale/purchase
- [ ] Create synchronized timeline management
- [ ] Build equity calculation tools
- [ ] Implement settlement coordination logic
- [ ] Add bridging finance detection and recommendations

### 2.2 Equity Calculator Suite

- [ ] Build current property valuation tools
- [ ] Create available equity calculations
- [ ] Implement upgrade buying power calculator
- [ ] Add refinancing scenario analysis
- [ ] Create equity release comparison tools

### 2.3 Sale Process Integration

- [ ] Add property listing workflow
- [ ] Create real estate agent marketplace
- [ ] Implement marketing timeline management
- [ ] Add offer management system
- [ ] Build sale progress tracking

### 2.4 Risk Management Tools

- [ ] Create settlement date conflict detection
- [ ] Implement bridging finance calculators
- [ ] Add market timing recommendations
- [ ] Create contingency planning tools
- [ ] Build risk assessment dashboard

---

## Phase 3: Professional User Interfaces (3-4 weeks)

**Target Personas:** Conveyancers, Agents, Brokers  
**Goal:** Professional dashboards and workflow management

### 3.1 Conveyancer Dashboard

- [ ] Create `/professional/conveyancer` routes
- [ ] Build client transaction management
- [ ] Implement milestone tracking for professionals
- [ ] Add automated client communication
- [ ] Create document workflow management
- [ ] Build commission tracking

### 3.2 Real Estate Agent Dashboard

- [ ] Create `/professional/agent` interface
- [ ] Build referral management system
- [ ] Implement panel creation tools
- [ ] Add commission tracking
- [ ] Create client relationship management
- [ ] Build performance analytics

### 3.3 Marketplace Panel System

- [ ] Create shareable professional panels
- [ ] Implement panel tracking and analytics
- [ ] Add referral conversion tracking
- [ ] Build panel management tools
- [ ] Create performance reporting

---

## Phase 4: Post-Purchase Legal Support (2-3 weeks)

**Target Persona:** Michael, Recent Buyer with Legal Issues  
**Goal:** Legal issue resolution and post-purchase support

### 4.1 Legal Issue Assessment

- [ ] Create legal issue categorization system
- [ ] Build document analysis for legal problems
- [ ] Implement resolution strategy recommendations
- [ ] Add statutory deadline tracking
- [ ] Create urgency prioritization

### 4.2 Legal Professional Marketplace

- [ ] Add specialized legal professional profiles
- [ ] Create issue-specific matching
- [ ] Implement legal quote system
- [ ] Add dispute resolution tracking
- [ ] Build legal outcome monitoring

---

## Phase 5: Equity Investment Journey (3-4 weeks)

**Target Persona:** Sarah, Homeowner Investor  
**Goal:** Investment property acquisition using home equity

### 5.1 Investment Strategy Tools

- [ ] Create investment property calculators
- [ ] Build portfolio analysis tools
- [ ] Implement cash flow projections
- [ ] Add tax benefit calculations
- [ ] Create risk assessment tools

### 5.2 Investment Property Search

- [ ] Add investment-focused property filters
- [ ] Create rental yield calculations
- [ ] Implement growth area identification
- [ ] Add investment property comparison
- [ ] Build portfolio tracking

### 5.3 Investment Finance Integration

- [ ] Create investment loan calculators
- [ ] Build equity release scenarios
- [ ] Implement investment broker marketplace
- [ ] Add tax optimization tools
- [ ] Create financing strategy recommendations

---

## Success Metrics & Validation

### Phase 1 Success Criteria

- [ ] 90% of user tasks completed within chat interface
- [ ] Context panel updates automatically in <2 seconds
- [ ] Tool execution and display in <3 seconds
- [ ] Complete property purchase workflow functional
- [ ] User can complete first-time buyer journey end-to-end

### Cross-Phase Metrics

- [ ] Chat-first experience maintained across all personas
- [ ] Contextual panel system adapts to each user journey
- [ ] AI agent provides relevant assistance for each persona
- [ ] Marketplace integrations work seamlessly
- [ ] Real-time updates and notifications functional

### Technical Performance

- [ ] Mobile responsive across all features
- [ ] Real-time synchronization working reliably
- [ ] AI agent response time <3 seconds
- [ ] Data persistence and consistency maintained
- [ ] Security and privacy requirements met

---

## Notes for Development Team

### Key Principles

1. **Chat-First Always**: Every feature must work within the chat interface
2. **Context Panel Intelligence**: Panel must update automatically based on conversation
3. **Tool Integration**: All tools must display results inline in chat
4. **Mobile Optimization**: Chat interface must work perfectly on mobile
5. **AI-Driven UX**: Let AI decide what to show users, minimize manual navigation

### Technical Stack Reminders

- Next.js 15 with App Router ✅
- Convex for backend with agent components ✅
- Tailwind CSS 4 for styling ✅
- Radix UI for components ✅
- GSAP for animations ✅
- React Hook Form + Zod for forms ✅

### Current State Assessment

**✅ STRENGTHS:**

- Excellent UI foundation saves 3-4 weeks
- Complete design system accelerates development
- All dependencies properly configured
- Strong component library and demos to convert

**🎯 FOCUS AREAS:**

- Backend data model is critical path
- Chat-to-database integration needed
- Route structure requires completion
- AI agent configuration essential

### Phase Dependencies

- **Data model completion blocks all other backend work**
- Chat integration depends on agent setup
- Tools depend on both backend functions and chat integration
- Each phase builds on the previous foundation
- Context panel system from Phase 1 extends to all subsequent phases
- AI agent capabilities grow with each phase

This tasklist reflects the excellent foundation work completed and focuses remaining effort on backend integration, AI agents, and completing the chat-centric user experience.
