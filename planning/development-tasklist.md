# Transactor 2.0 - Development Tasklist

**Version:** 2.0  
**Date:** January 2025  
**Status:** ~40% Foundation Complete - Focus on Backend & AI Integration  
**Architecture:** Mastra + Supabase + Prisma + Next.js 15
**Approach:** Vertical MVP by Persona - Build complete functionality for one user journey before expanding

---

## Overview

This tasklist implements a **vertical-first approach** where we build complete end-to-end functionality for one persona before moving to the next. This ensures we have a fully working proof-of-concept that validates our chat-centric, AI-first architecture powered by **Mastra agents**.

**✅ COMPLETED FOUNDATION (~40% of Phase 1)**:

- Complete Next.js 15 + Mastra + Tailwind CSS 4 setup
- Comprehensive UI library (47+ components)
- Full design system with theme, typography, utilities
- All core dependencies installed and configured
- Basic project structure and component library
- Mastra + Supabase integration established

**🎯 CURRENT PRIORITY**: Prisma schema design, Mastra agent configuration, and chat-to-database connectivity

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
- [x] ✅ Setup Mastra backend with agent components
- [x] ✅ Configure Tailwind CSS 4 with custom design system
- [x] ✅ Setup TypeScript configuration
- [x] ✅ Configure environment variables for development
- [x] ✅ Setup GitHub repository and basic CI/CD
- [x] ✅ Establish Mastra + Supabase connection via @mastra/pg

#### ✅ 1.2 Core Dependencies Installation (COMPLETE)

- [x] ✅ Install and configure Mastra core and agents
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

**🎯 WEEK 1 PRIORITY: Database Schema & Mastra Integration (URGENT)**

### 2.1 Prisma Schema Design (CRITICAL - BLOCKING)

- [ ] **🔥 URGENT: Install and configure Prisma** - Install Prisma CLI and client
- [ ] **🔥 URGENT: Create comprehensive Prisma schema** - Design application data model
- [ ] Define `User` model with buyer persona fields and Mastra integration
- [ ] Create `Property` model for property data and search functionality
- [ ] Setup `Transaction` model for purchase workflows
- [ ] Define `Document` model for file management with AI analysis
- [ ] Create `Provider` model for service provider marketplace
- [ ] Setup `Quote` model for provider quotes and comparisons
- [ ] Add `FinancialProfile` model for user financial data
- [ ] Create `MarketData` model for property intelligence
- [ ] Setup `Milestone` model for transaction tracking
- [ ] Configure database relationships and constraints
- [ ] Generate Prisma client and setup database connection

### 2.2 Mastra Agent Configuration (ENABLES AI FUNCTIONALITY)

- [ ] **Configure Mastra core instance** with Supabase storage integration
- [ ] **Setup BuyerAgent** - First-time buyer assistance specialist
- [ ] **Configure FinanceAgent** - Mortgage and financial calculations
- [ ] **Setup PropertyAgent** - Property search and analysis
- [ ] **Configure DocumentAgent** - Contract and document analysis
- [ ] **Setup MatchAgent** - Service provider matching
- [ ] **Configure OrchestratorAgent** - Main conversation controller
- [ ] **Setup agent memory and context persistence** via Mastra storage
- [ ] **Configure agent tools** - Property search, calculators, document analysis
- [ ] **Setup agent workflows** - Multi-step property buying processes

### 2.3 Database Seeding & Migration (ENABLES REALISTIC TESTING)

- [ ] **Run Prisma migrations** - Setup database schema in Supabase
- [ ] **Seed service providers** - 20-30 providers per major city (conveyancers, brokers, inspectors)
- [ ] **Seed sample properties** - 50-100 realistic listings across first-home buyer price ranges
- [ ] **Seed market intelligence** - Current median prices, growth rates for 10-15 key suburbs per city
- [ ] **Seed financial reference data** - Interest rates, stamp duty rates, first home buyer grants
- [ ] **Create seeding scripts** - Automated database population for development/testing
- [ ] **Add sample user personas** - Test profiles with different budgets and preferences
- [ ] **Setup Prisma Studio** - Database admin interface for development

### 2.4 Mastra + Prisma Integration Layer (HIGH PRIORITY)

- [ ] Create database service layer combining Mastra and Prisma
- [ ] User management functions (create, update, get) via Prisma
- [ ] Property search and management functions via Prisma
- [ ] Transaction workflow functions bridging Mastra and Prisma
- [ ] Document management with Prisma metadata and Mastra file storage
- [ ] Provider matching using Prisma queries and Mastra vectors
- [ ] Financial calculation persistence via Prisma
- [ ] Agent context persistence via Mastra storage

**WEEK 2 PRIORITY: Chat Interface Integration**

### 3.1 Main Dashboard Layout (INTEGRATE EXISTING UI)

- [ ] **Create `/dashboard/[threadId?]` route** - Missing from current structure
- [ ] **Connect existing ChatUI component** to Mastra backend (currently mock)
- [ ] Build contextual panel (right panel, 40% width)
- [ ] Implement mobile-responsive design (leverage existing design system)
- [ ] **Replace mock chat** with real Mastra agent integration
- [ ] Add real-time message streaming via Mastra subscriptions
- [ ] Integrate Prisma data queries for contextual panel content

### 3.2 Contextual Panel System (NEW COMPONENT)

- [ ] Build `ContextualPanel` component with Mastra agent control
- [ ] Create `PropertySummaryCard` component (use existing property cards as base)
- [ ] Build `FinancialSummary` component pulling from Prisma financial profiles
- [ ] Create `QuickActions` component with Mastra agent suggestions
- [ ] Implement `CalculationResults` component for tool outputs
- [ ] Add panel state management and real-time updates
- [ ] Connect panel components to Prisma data sources

### 3.3 Chat-AI Integration (BACKEND CONNECTION)

- [ ] **Connect chat to Mastra Agent backend** (replace mock responses)
- [ ] Implement real-time message streaming via Mastra
- [ ] Add typing indicators and loading states
- [ ] Create message history and pagination with Mastra storage
- [ ] Implement conversation persistence via Mastra
- [ ] Add error handling and retry logic
- [ ] Bridge chat context to Prisma application data

**WEEK 3 PRIORITY: Essential Tools Integration**

### 4.1 Mastra Tool Infrastructure (NEW SYSTEM)

- [ ] Create Mastra tool definitions for property domain
- [ ] Build tool execution framework connecting chat to tools
- [ ] Create inline chat result component system
- [ ] Implement tool execution tracking via Mastra
- [ ] Add tool permissions and context management
- [ ] Connect tools to Prisma data sources for calculations

### 4.2 Convert Existing Demos to Working Mastra Tools

- [ ] **Mortgage Calculator Tool** - Convert existing demo to Mastra tool with Prisma persistence
- [ ] **Stamp Duty Calculator Tool** - Convert demo + add state-specific logic
- [ ] **Property Search Tool** - Build from existing property components with Prisma queries
- [ ] **Equity Calculator** - Convert existing demo components to Mastra tools

### 4.3 Financial Tools Suite (MASTRA + PRISMA INTEGRATION)

- [ ] Borrowing Capacity Calculator (Mastra tool + Prisma persistence)
- [ ] Total Purchase Cost Calculator (combine multiple calculations)
- [ ] Savings Goal Calculator (timeline projections)
- [ ] First Home Buyer Grant integration with Prisma user profiles

**WEEK 4 PRIORITY: Route Structure & Core Flows**

### 5.1 Missing Core Routes (CREATE NEW)

- [ ] Create `/onboarding/welcome` route (missing)
- [ ] Build `/tools/calculator/` route structure (missing)
- [ ] Create `/marketplace/find/[serviceType]` routes (missing)
- [ ] Build `/manage/documents/` route (missing)
- [ ] Create `/manage/transactions/[id]` route (missing)

### 5.2 Onboarding Experience (NEW)

- [ ] Create welcome flow with role selection
- [ ] Build chat-based onboarding in main dashboard with Mastra
- [ ] Implement progressive information gathering via Mastra agents
- [ ] Add smooth transition to main chat experience
- [ ] Setup initial user profile creation via Prisma
- [ ] Connect onboarding to Mastra agent context initialization

### 5.3 Layout Integration (CONNECT EXISTING COMPONENTS)

- [ ] **Add Mastra provider to root layout** (currently missing)
- [ ] Setup proper navigation between routes
- [ ] Implement authentication flow
- [ ] Connect existing components to real Prisma data
- [ ] Setup error boundaries for Mastra operations

**WEEK 5-6: Advanced Features**

### 6.1 Marketplace Integration (NEW SYSTEM)

- [ ] Create service provider data structure in Prisma
- [ ] Build provider matching algorithm using Mastra vectors
- [ ] **Convert existing ServiceProviderCard** to work with Prisma data
- [ ] Implement quote request system via Mastra workflows
- [ ] Build comparison and selection interface
- [ ] Connect to Mastra agent recommendations

### 6.2 Transaction Management (NEW WORKFLOW)

- [ ] Create transaction lifecycle management via Prisma
- [ ] Build milestone tracking system using Prisma and Mastra
- [ ] **Convert existing timeline components** to real Prisma workflows
- [ ] Implement progress visualization
- [ ] Add automated notification system via Mastra
- [ ] Setup workflow triggers and automations

### 6.3 Document Management (NEW SYSTEM)

- [ ] Create document upload system with Mastra file storage
- [ ] Implement document categorization via Prisma
- [ ] Add AI document analysis via Mastra agents
- [ ] **Connect existing document components** to Prisma backend
- [ ] Build document status tracking
- [ ] Setup automated document processing workflows

**WEEK 6-7: Polish & Testing**

### 7.1 UX Refinement (POLISH EXISTING)

- [ ] Optimize chat conversation flows with Mastra
- [ ] Refine contextual panel responsiveness
- [ ] **Enhance existing mobile design** for chat interface
- [ ] Add loading states and transitions (leverage existing animations)
- [ ] Implement comprehensive error handling for Mastra + Prisma
- [ ] Optimize real-time updates and subscriptions

### 7.2 Mastra Agent Optimization (FINE-TUNE)

- [ ] Fine-tune agent responses and personality
- [ ] Optimize tool calling accuracy and speed
- [ ] Improve context understanding and memory
- [ ] Add proactive assistance features
- [ ] Implement conversation learning and adaptation
- [ ] Setup agent performance monitoring

### 7.3 Testing & Deployment (FINAL)

- [ ] Comprehensive end-to-end testing of Mastra workflows
- [ ] User experience testing with real agent interactions
- [ ] Performance optimization for Mastra + Supabase + Prisma
- [ ] Security audit of agent permissions and data access
- [ ] Deployment setup and configuration
- [ ] Monitoring and analytics setup for agent performance

---

## 🎯 IMMEDIATE NEXT STEPS (This Week)

### **Priority 1: Prisma Schema & Database Setup (BLOCKING EVERYTHING)**

1. **Install Prisma and configure with Supabase** - Complete database layer setup
2. **Design comprehensive Prisma schema** - All application entities and relationships
3. **Run migrations and seed database** - Enable meaningful agent interactions from day 1
4. **Setup Prisma Studio** - Database admin interface for development

### **Priority 2: Mastra Agent Configuration (ENABLES AI)**

1. **Configure core Mastra agents** - Buyer, Finance, Property, Document, Match agents
2. **Setup agent tools and workflows** - Property search, calculations, document analysis
3. **Connect agents to Prisma data** - Bridge AI functionality to application data
4. **Test agent interactions** - Ensure agents can read/write application data

### **Priority 3: Chat-Database Integration (HIGH IMPACT)**

1. **Create `/dashboard/[threadId?]` route**
2. **Connect existing ChatUI** to Mastra agents (remove mocks)
3. **Build contextual panel system** with Prisma data integration
4. **Setup real-time subscriptions** for chat and panel updates

---

## Phase 2: Upgrader Seller Journey (4-5 weeks)

**Target Persona:** Raj, 41, Upgrader Seller  
**Goal:** Dual transaction management (sell + buy simultaneously)

### 2.1 Dual Transaction Management via Mastra

- [ ] Extend Prisma transaction model for linked sale/purchase
- [ ] Create synchronized timeline management via Mastra workflows
- [ ] Build equity calculation tools using Mastra agents
- [ ] Implement settlement coordination logic
- [ ] Add bridging finance detection and recommendations

### 2.2 Equity Calculator Suite (Mastra Tools)

- [ ] Build current property valuation tools via Mastra
- [ ] Create available equity calculations
- [ ] Implement upgrade buying power calculator
- [ ] Add refinancing scenario analysis
- [ ] Create equity release comparison tools

### 2.3 Sale Process Integration

- [ ] Add property listing workflow via Mastra
- [ ] Create real estate agent marketplace (Prisma + Mastra matching)
- [ ] Implement marketing timeline management
- [ ] Add offer management system
- [ ] Build sale progress tracking

### 2.4 Risk Management Tools

- [ ] Create settlement date conflict detection via Mastra
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
- [ ] Build client transaction management via Prisma
- [ ] Implement milestone tracking for professionals
- [ ] Add automated client communication via Mastra
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

### 4.1 Legal Issue Assessment via Mastra

- [ ] Create legal issue categorization system
- [ ] Build document analysis for legal problems
- [ ] Implement resolution strategy recommendations
- [ ] Add statutory deadline tracking
- [ ] Create urgency prioritization

### 4.2 Legal Professional Marketplace

- [ ] Add specialized legal professional profiles
- [ ] Create issue-specific matching via Mastra
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

- [ ] 90% of user tasks completed within chat interface powered by Mastra
- [ ] Context panel updates automatically in <2 seconds using Prisma queries
- [ ] Mastra tool execution and display in <3 seconds
- [ ] Complete property purchase workflow functional
- [ ] User can complete first-time buyer journey end-to-end

### Cross-Phase Metrics

- [ ] Chat-first experience maintained across all personas
- [ ] Contextual panel system adapts to each user journey
- [ ] Mastra agents provide relevant assistance for each persona
- [ ] Marketplace integrations work seamlessly
- [ ] Real-time updates and notifications functional

### Technical Performance

- [ ] Mobile responsive across all features
- [ ] Real-time synchronization working reliably via Mastra
- [ ] Mastra agent response time <3 seconds
- [ ] Data persistence and consistency maintained across Mastra + Prisma
- [ ] Security and privacy requirements met

---

## Notes for Development Team

### Key Principles

1. **Chat-First Always**: Every feature must work within the Mastra-powered chat interface
2. **Context Panel Intelligence**: Panel must update automatically based on conversation
3. **Tool Integration**: All Mastra tools must display results inline in chat
4. **Mobile Optimization**: Chat interface must work perfectly on mobile
5. **AI-Driven UX**: Let Mastra agents decide what to show users, minimize manual navigation

### Technical Stack Reminders

- Next.js 15 with App Router ✅
- Mastra for AI agents and workflows ✅
- Supabase for database (via Mastra + Prisma) ✅
- Prisma for type-safe database operations ✅
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
- Mastra + Supabase integration established

**🎯 FOCUS AREAS:**

- Prisma schema design is critical path
- Mastra agent configuration essential
- Chat-to-database integration needed
- Route structure requires completion

### Phase Dependencies

- **Prisma schema completion blocks all database work**
- **Mastra agent setup blocks chat integration**
- Tools depend on both Mastra configuration and Prisma data
- Each phase builds on the previous foundation
- Context panel system from Phase 1 extends to all subsequent phases
- Mastra agent capabilities grow with each phase

This tasklist reflects the architectural shift to Mastra + Supabase + Prisma while maintaining the excellent foundation work completed and focusing remaining effort on agent integration, database design, and completing the chat-centric user experience.
