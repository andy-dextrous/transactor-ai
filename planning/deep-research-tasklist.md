# 🎯 **TRANSACTOR 2.0 – DEVELOPMENT TASK LIST (Optimized)**

**Version:** 2.0
**Date:** January 2025
**Architecture:** Vertical-first, AI-centric platform (Mastra + Next.js 15 + Supabase + Prisma)

---

## 🏗️ **DEVELOPMENT PHILOSOPHY**

### **Vertical-First Approach**

We follow a **vertical-first development strategy** for maximum scalability and maintainability:

- **Core Principle:** Build one complete user vertical (Buyer) with all necessary infrastructure, then clone patterns for additional verticals (Seller, Investor, Professionals) rather than shallowly implementing features across all roles in parallel.
- **Benefits:**

  - **Scalability:** Each new vertical reuses proven code patterns.
  - **Stability:** Core architecture is battle-tested with the first vertical before expansion.
  - **Speed:** Subsequent verticals require minimal new code (estimated 70% reuse).
  - **Maintainability:** Consistent patterns across the codebase make onboarding new devs easier.
  - **Risk Reduction:** Unknown issues surface early in Phase 1 and can be resolved before scaling up.

**Phase Structure:**

- **Phase 1:** Buyer Vertical (Foundation) – Full end-to-end buyer journey with all core services.
- **Phase 2:** Seller Vertical – Reuse buyer patterns; add seller-specific features.
- **Phase 3:** Investor Vertical – Reuse patterns; add investment-specific tools.
- **Phase 4:** Professional Verticals – Reuse patterns; add pro dashboards and workflows.
- **Phase 5:** Advanced Features – Cross-vertical enhancements (marketplace, AI analytics, notifications).
- **Phase 6:** Scale & Polish – Performance tuning, security hardening, and deployment.

Each phase yields a **deployable vertical** that functions independently while sharing the foundational architecture with others.

---

## 🚨 **CRITICAL IMPLEMENTATION NOTES**

### **Phase 1 is Make-or-Break**

The buyer vertical establishes the **architectural foundation** for the entire application. Getting Phase 1 right is critical because:

- **Reuse Multiplier:** \~70% of code for later phases will derive from Phase 1 implementations.
- **Hybrid Architecture Validation:** The interplay between Next.js (App Router), Prisma, Supabase, and Mastra must be proven here.
- **Agent Orchestration Model:** The multi-agent system (Mastra) must align with PRD specs and function seamlessly before scaling to other roles.
- **Chat-Centric UX Patterns:** The chat + context panel interface (core of user interaction) is finalized in Phase 1 and then cloned for all other flows.

### **Key Success Factors**

1. **Database & Schema First:** Complete a robust Prisma schema _before_ other development. The schema underpins both AI workflows and application logic.
2. **Mastra Integration:** Develop a **Mastra–Prisma bridge** pattern for durable agent workflows with persistent memory (Mastra) and relational data (Prisma). This is critical for the hybrid AI+DB architecture.
3. **Next.js Best Practices:** Use Next.js 15 features like Server Actions to keep sensitive logic server-side while maintaining a smooth UX. Embrace React Server Components (RSC) for data-fetching UI and client components only where interactive (chat input, real-time updates).
4. **Agent Alignment:** Implement agents exactly as per PRD roles (BuyerAgent, FinanceAgent, etc.) with tools for each key function. Ensure each agent’s responsibilities (from PRD Section 13) are met with Mastra capabilities (tools, workflows, memory).
5. **Adhere to Documentation:** Follow best practices from each technology’s documentation (Mastra agent patterns, Next.js App Router conventions, Prisma with Supabase, Tailwind/ShadCN usage, Zod validation) to avoid integration pitfalls and ensure optimal performance.
6. **Quality Gates:** Enforce strict checkpoints:

   - _Week 1:_ Database schema and migrations completed; basic DB queries working.
   - _Week 2:_ Core agent workflows (buyer onboarding, timeline management) functional in isolation.
   - _Week 3:_ Chat interface exchanging messages with agents and updating context in real-time.
   - _Week 4:_ All primary buyer user stories from PRD verified via end-to-end tests.

If any checkpoint fails, pause new development and **fix immediately**. The integrity of Phase 1 determines success of all later phases.

### **Risk Mitigation**

- **Schema Lockdown:** No major schema changes after Phase 1 without migration; iterate on schema early with sample data to ensure it covers all use cases.
- **Iterative Testing:** Write integration tests for each major feature as it’s built (don’t wait until the end of Phase 1). This prevents compounding bugs.
- **Performance Monitoring:** Start measuring agent response times and DB query performance in Phase 1. It’s easier to adjust architecture early than to rework it under load.
- **Security & Privacy:** Even in Phase 1, implement role-based access checks and data isolation (e.g., ensure one user’s data can’t leak to another). Laying this groundwork prevents painful refactors later.

---

## 📊 **CURRENT STATE ASSESSMENT**

### ✅ **Completed Setup**

- **Project Base:** Next.js 15 App Router initialized with TypeScript, Tailwind CSS 4, and Radix UI (ShadCN) components installed. The design system (via ShadCN UI) is scaffolded under `src/components/ui/` (fully accessible, themable components).
- **Mastra Core:** Mastra framework installed with a basic agent and workflow example (e.g., a sample weather agent) working. No domain-specific agents yet.
- **Database Config:** Supabase Postgres instance provisioned and Prisma connected (empty schema). Connection tested via Prisma Client.
- **Real-time:** Supabase real-time subscription library available (from `@supabase/supabase-js`), though not yet wired into the app.
- **DevOps:** Vercel project created (for Next.js hosting) – not yet deployed. CI pipeline skeleton present (GitHub Actions set up for lint/test).

### 🚧 **Key Gaps & To-Do**

- 🚧 **Prisma Schema:** **Not implemented.** We have no models for users, properties, transactions, etc. _This is a blocker for all functionality._ The very first task is to translate the data model (see PRD Section 11) into a Prisma schema and run migrations.
- 🚧 **Authentication:** **Not implemented.** Currently using no auth or a placeholder. We need to integrate Supabase Auth or NextAuth for user accounts, including an OTP verification flow for onboarding (per PRD) to ensure secure multi-party transactions.
- 🚧 **Agent System Misaligned:** The sample agents in the current Mastra setup do not match Transactor’s needs. We need to define custom agents (BuyerAgent, SellerAgent, etc.) with appropriate tools (calculators, data extractors) as described in PRD. No multi-agent orchestration logic exists yet.
- 🚧 **Mastra–Prisma Bridge:** No implementation for storing agent state or resuming workflows. We need a strategy to link Mastra’s memory (vector store, etc.) with our database (e.g., storing `mastraThreadId` in a `MastraIntegration` table) so agents can pick up context after interruptions.
- 🚧 **Route Structure:** The Next.js routes/pages for onboarding, dashboard, etc., are not set up. We only have the generic index page from create-next-app. We need to implement the multi-route structure (onboarding flow, dashboard with chat, provider dashboards, etc.) described in the App Structure.
- 🚧 **Chat UI & Context Panel:** The core conversational UI is incomplete. There’s a basic chat component, but no persistent context panel to show timeline, documents, etc. Also, sending a message to an agent and streaming the reply isn’t wired up.
- 🚧 **Server Actions & API:** There is no mechanism to call server-side logic from the UI. (No Next.js Server Actions or API routes implemented for agent communication.) We need to create either server actions or route handlers to handle user input (chat messages) and invoke Mastra accordingly.
- 🚧 **Document Processing:** Features like contract upload -> auto-fill (PRD SYS-03) or bank statement analysis (SYS-04) are not started. No OCR or PDF parsing integration yet. We will need to incorporate a document AI pipeline (possibly using Mastra tools or external API) in later phases.
- 🚧 **Finance Tools:** The various calculators (stamp duty, borrowing power, grant eligibility) are not implemented. We have to build these as either frontend components or Mastra tools (preferably tools so they can be used via chat agent).
- 🚧 **External API Integrations:** No hookups to CoreLogic, RateCity, etc., yet. We’ll need to obtain API keys and integrate these for property valuations and mortgage rates during the finance tooling phase.
- 🚧 **Notifications & Comms:** No integration for email or SMS notifications exists. The PRD calls for Twilio (SMS) and SendGrid (Email) usage via Mastra workflows (e.g., OTP codes, status alerts), which we need to implement in a later phase.
- 🚧 **Testing & QA:** No tests exist beyond the Next.js template. Given the complexity, we need to set up a testing framework (Jest/Playwright) and write tests as we implement features, especially for the critical Phase 1 flows.

In summary, **all core functionality is ahead of us**. The foundation (frameworks, libraries) is there, but now we must fill in the architecture and features step by step.

---

## 📋 **DEVELOPMENT PHASES**

## **PHASE 1: BUYER VERTICAL FOUNDATION (Weeks 1–4)**

_Focus:_ Implement the end-to-end buyer journey (from onboarding to settlement) as a proof-of-concept for the platform. This phase sets up the database schema, AI agents, chat interface, and core workflows that all subsequent phases will reuse.

### 1.1 **Prisma Schema Foundation** (Week 1, Days 1–2)

**Goal:** Design and migrate the complete database schema covering users, properties, transactions, and all related entities. This schema should satisfy requirements for all roles (buyer, seller, professionals), but prioritize buyer-related fields first.

- [ ] **Core Models & Relationships:** Define Prisma models for:

  - `User` – with fields for role (enum: buyer, seller, conveyancer, etc.), contact info (email, phone), and profile details. Include an `authId` to link with Supabase Auth or NextAuth.
  - `Property` – address fields, coordinates, type, and an `estimatedValue` (for CoreLogic valuations).
  - `Transaction` – link to `Property`; fields for transaction type (buy/sell), key dates (contract signed, settlement, etc.), status, purchase price, and a reference to associated Mastra thread (for AI context).
  - `TransactionParticipant` – join table linking `User` and `Transaction` with a role (buyer, seller, broker, etc.), to model multi-party transactions.
  - `Milestone` – key checkpoints in a transaction (title, dueDate, status). Mark if part of critical path.
  - `Document` – uploads linked to a transaction (type, file URL, AI-extracted summary fields, compliance check status).
  - `FinancialProfile` – per-user finance info (income, borrowing capacity, first-home-buyer flag, etc.) to feed FinanceAgent calculations.
  - `Provider` – professional service providers (conveyancer, inspector, etc.) with profile info (business name, ratings).
  - `Quote` – quotes from `Provider` for a `Transaction` (fee, status, expiration).
  - `Review` – reviews for providers (user, rating, comments).
  - `MarketData` – optional cache of market stats (by suburb/propertyType) for quick retrieval of trends.
  - **Bridge Table:** `MastraIntegration` – links a `transactionId` and `userId` to a `mastraThreadId` (string from Mastra) and tracks the agent type and current phase. This allows us to persist and query AI agent state in our DB.

- [ ] **Enum Definitions:** Define all necessary enums (UserRole, TransactionType, TransactionStatus, PropertyType, etc.) based on PRD specs. For example, `UserRole` includes BUYER, SELLER, INVESTOR, CONVEYANCER, MORTGAGE_BROKER, etc., to cover all personas.
- [ ] **Migration & Seed:** Run `prisma migrate dev --name init` to apply the schema to the Supabase database. Implement a **seed script** to create:

  - A sample buyer user (for testing chat).
  - A sample property and transaction with some milestones and documents (to test timeline UI).
  - Possibly a sample professional user and provider entry, for future phases.

- [ ] **Verify Schema:** Write a quick script or use Prisma Studio to verify all relations (e.g., fetch a User and include transactions, ensure cascade deletes are set appropriately). Check that index/unique constraints exist where needed (e.g., maybe unique compound index on Transaction per property, etc., as relevant).

### 1.2 **Server Actions & Hybrid Backend** (Week 1, Days 3–4)

**Goal:** Establish how the frontend will interact with the backend by leveraging Next.js 15 **Server Actions** and/or API routes to perform database operations and trigger Mastra workflows. This forms the “glue” between user actions (mainly chat messages or form submissions) and our backend logic.

- [ ] **Prisma Client Util:** Create `src/lib/prisma.ts` with a singleton `PrismaClient` instance. Configure it to use the Supabase connection string (with pooling in mind). Ensure `NODE_ENV` handling so we don’t create multiple instances in dev.
- [ ] **Mastra Service Util:** Create `src/lib/mastraService.ts` that initializes the Mastra engine (agents, workflows). It should provide functions to:

  - `startTransactionWorkflow(transactionId, userId, type)` – e.g., spawn the appropriate Mastra workflow for a new transaction (buyer or seller journey).
  - `sendMessageToAgent(threadId, message)` – to send a user chat message to the correct Mastra agent thread and get a response.
  - Possibly wrap Mastra calls in try/catch and unify error handling/logging.

- [ ] **Hybrid Actions (Mastra + Prisma):** Implement bridging functions that do combined work. For example:

  - `createTransactionWithAgent(initData)` – Creates a new `Transaction` in the database _and_ kicks off the Mastra Orchestrator to manage it. This should save the `mastraThreadId` in `MastraIntegration` for future lookups.
  - `updateTransactionPhase(transactionId, newPhase)` – Updates the DB (transaction status or `currentPhase` in `MastraIntegration`) and possibly notifies the agent system of phase change.
  - `syncAgentMemory(transactionId)` – If needed, fetch agent context or memory from Mastra and store in our DB (or vice-versa).

- [ ] **Use Next.js Server Actions:** Wherever appropriate, define server action functions using the `'use server'` directive to be called from React components for mutations. For example, an action to handle a new message submission that calls `sendMessageToAgent` and updates the UI optimistically. These server actions allow secure, direct server calls from the UI without a separate API endpoint, simplifying our data flow.
- [ ] **Error & Retry Strategy:** Standardize error handling. If a Mastra call fails (e.g., OpenAI rate limit or a workflow error), ensure the UI gets a graceful error message. Implement retries for transient errors (maybe via Mastra’s built-in retry or a simple loop for critical operations). Log errors to console or a monitoring service for now.
- [ ] **Type Safety:** Use **Zod** to define schemas for inputs and outputs of server actions and Mastra tools. For instance, if we have a server action `submitOffer(formData)`, validate `formData` with a Zod schema before processing. This ensures we catch validation issues early and maintain type safety through the code.
- [ ] **Security Checks:** Ensure that server actions verify the acting user has rights to the resources (e.g., the user sending a chat message is part of that transaction). This can be done via session user checks (to be implemented with auth) and matching against `TransactionParticipant` records. It’s critical to enforce our role-based access control from Day 1 for security.

### 1.3 **AI Agent System Foundation** (Week 2, Full Week)

**Goal:** Implement the core Mastra agents, tools, and workflows for the buyer’s journey. This means the BuyerAgent (with sub-agents like FinanceAgent, DocumentAgent, etc.), orchestrated by a main OrchestratorAgent. The agents should use tools for calculations and data fetching, aligning with PRD’s AI design. We establish durable workflows so agents can handle long-running tasks (document analysis) or be paused/resumed.

- [ ] **Core Agents Definition:** Using Mastra’s agent API, create agents per PRD:

  - `OrchestratorAgent` – the master router agent that receives all user messages. It should detect user intent (buy, sell, ask finance question, etc.) and delegate to the appropriate specialist agent. It maintains high-level context and can interject for coordination. Tools: possibly a routing tool (`routeToSpecialist`) and a tool to update the transaction phase.
  - `BuyerAgent` – handles buyer-specific chat, from onboarding through post-settlement. It should manage the buyer’s timeline and tasks. Tools: property search, timeline updates, Q\&A about process.
  - `FinanceAgent` – specialized in financial computations: mortgage calculations, deposit planning, stamp duty and grants. Tools: mortgage calculator, grant eligibility checker, rate fetcher (calls RateCity API).
  - `PropertyAgent` – handles property data retrieval and analysis: queries CoreLogic for values, fetches recent sales comps, answers questions about the property or market. Tools: property valuation API call, market stats lookup.
  - `DocumentAgent` – handles document-related tasks. For a buyer, it can parse an uploaded contract or bank statement. Tools: PDF/Text parser and a set of extractors (perhaps using an OCR library or external service). **Focus on PRD SYS-03/04:** auto-fill details from contract, auto-extract income from bank statement.
  - _(Later in Phase 2–4, we will add SellerAgent, InvestorAgent, and professional agents; but ensure architecture allows plugging those in easily.)_

- [ ] **Agent Tools Implementation:** For each agent, implement Mastra tools (with `createTool`) to perform atomic tasks:

  - **Mortgage Calculator Tool:** Inputs like loan amount, interest, term -> outputs monthly payment, etc. Use formulas or integrate a small library. Validate inputs with Zod (e.g., interest >= 0).
  - **StampDutyCalculator Tool:** Given price and state, compute stamp duty (use state-specific rules).
  - **GrantEligibility Tool:** Determine first-home buyer grant eligibility based on user profile and property price.
  - **PropertySearch Tool:** Perhaps call a third-party API or use a dummy dataset to find listings matching criteria. In Phase 1, this could be stubbed or simplified.
  - **DocumentExtract Tool:** Accept a document (or its text content) and an extraction type, then use a parser (maybe integrate `pdf-parse` or similar) to extract structured data (like names, addresses, ABNs from a contract). Mark fields in `Document` model as filled.
  - _Architecture Note:_ Mastra encourages using tools for complex or external operations (LLM calls, API calls) to keep agents focused on orchestration. Design tools to be reusable across agents where possible (e.g., the mortgage calculator might be used by both BuyerAgent and BrokerAgent).

- [ ] **Durable Workflows:** Use Mastra workflows to manage multi-step processes and long tasks:

  - `BuyerOnboardingWorkflow` – guides a new buyer through initial questions (budget, saved deposit, property preferences). It can call sub-agents or tools (like Affordability check) and ends by creating a `Transaction` and timeline.
  - `PropertyPurchaseWorkflow` – spans from contract to settlement. It should coordinate tasks between multiple agents: e.g., BuyerAgent asks DocumentAgent to review a contract, FinanceAgent to follow up on loan approval, etc. Use workflow steps to represent milestones (finance approved, inspections done, etc.). This should map to our `Milestone` model, updating it as steps complete.
  - `DocumentProcessingWorkflow` – triggered when a user uploads a document. It runs the DocumentAgent’s tools, then updates the `Document` record with extracted info and flags any issues (e.g., missing signatures, unusual contract terms).
  - Ensure workflows are **durable** (Mastra’s runtime should persist their state). Test by simulating a server restart or agent crash – the workflow should resume using Mastra’s built-in persistence (backed by Supabase).

- [ ] **Mastra Configuration:** Update Mastra initialization (`mastraService.ts` or similar) to register all the above agents, tools, and workflows. Configure memory:

  - Use Mastra’s vector store for semantic memory if needed (e.g., embed important docs for Q\&A). We might set up a simple in-memory vector store or use Supabase pgvector if available for document Q\&A.
  - Ensure each agent knows how to access needed context. E.g., BuyerAgent should load the current transaction’s data (from Prisma) into its context on each query. We might implement a Mastra **context tool** that fetches DB data when the agent needs it.

- [ ] **Environment & API Keys:** Securely store API keys and secrets required by agents/tools (OpenAI API key for LLM calls, CoreLogic API key, Twilio/SendGrid keys for comms, etc.) in environment variables. Load them in the Mastra tools (never expose to client). _Ensure .env is configured and not committed._
- [ ] **Test Agent Interactions:** Before integrating with UI, write a small script to simulate agent calls:

  - E.g., call BuyerAgent with a prompt "I want to buy a house for \$500k". Verify it routes through FinanceAgent for affordability, returns a coherent response.
  - Test DocumentAgent by feeding a sample text of a contract and see if it extracts expected fields.
  - This will catch issues in agent logic early.

### 1.4 **Route Structure & Onboarding Flow** (Week 2, Days 3–4)

**Goal:** Set up the Next.js App Router structure to support our user journeys. Implement the buyer onboarding experience as a chat-centric flow with OTP verification and then the main dashboard. Prepare for professional-specific routes (even if they’ll be empty until Phase 4). Leverage our design system (Radix/ShadCN) for consistent UI.

- [ ] **Global Layout & Theme:** In `app/layout.tsx`, configure the global HTML layout:

  - Include the Tailwind CSS globals.
  - Wrap the app with the ShadCN **ThemeProvider** to enable dark mode and theming across components. Ensure `disableTransitionOnChange` and system theme preference are set (as per ShadCN docs).
  - Ensure the `<html>` tag has `lang="en"` and hydration warnings suppressed if needed.

- [ ] **Onboarding Routes:** Under `app/(onboarding)/`, create:

  - `welcome/page.tsx` – a welcome screen where the user picks their role (“I want to buy/sell” or “I’m a professional”). This page primarily contains UI with buttons or links that start the chat onboarding for that role. It can use a full-screen Radix Dialog or just a styled page.
  - `buyer-setup/page.tsx` – the buyer onboarding chat flow. Use our Chat components (or a simplified instance of them) to interact with the BuyerAgent. This should cover collecting key info (maybe via quick reply buttons or text prompts) like budget, location of interest, and verifying phone/email.

    - Integrate **OTP verification**: for phone verification, when BuyerAgent asks for a phone number, trigger a Mastra workflow or a server action to send an OTP via Twilio SMS (using Twilio’s API). Verify the code input by the user before proceeding. This ensures the user’s contact is confirmed.

  - `professional-verify/page.tsx` – for professional sign-up. If a user selects a professional role, this route collects their business details and possibly requires verification (e.g., a conveyancer license number). Could be a form outside chat or integrated via a specialized agent.
  - Each onboarding page should, upon completion, redirect to the main `dashboard` with the new user context (possibly storing a JWT or session cookie via Supabase Auth).

- [ ] **Authentication Integration:** Implement user authentication and session management:

  - Use **Supabase Auth** for email/password or magic link signups, or NextAuth with Supabase adapter as a placeholder. At minimum, allow buyers to create an account during onboarding (or do it implicitly after OTP verification).
  - Protect the dashboard and subsequent routes behind authentication. Use Next.js middleware or route checks to redirect unauthenticated users to `/welcome`.
  - Ensure that after signup/login, we create a corresponding `User` in our database (if using NextAuth or non-Supabase auth, you’ll need a callback to insert into Prisma).

- [ ] **Dashboard Route:** Create `app/dashboard/[...threadId]/page.tsx` (catch-all so it can accept an optional Mastra thread or transaction ID in the URL). This will be the main app interface after onboarding.

  - The page should fetch the necessary data for context (e.g., active transaction info) on the server side (Server Component) for initial render. It can use the `threadId` param to load the corresponding transaction from the DB (joining property, milestones, etc.).
  - Render the Chat interface (which will be mostly client-side interactive) and the context panel side by side (on desktop).
  - Use a responsive layout: on mobile, maybe hide the side panel or allow toggling it.
  - The context panel should be initially populated with buyer-specific info (like a welcome message or next milestone).

- [ ] **Nested Layouts:** Use Next.js nested layouts to maintain state:

  - `app/dashboard/layout.tsx` could define the two-panel structure so that navigating between sub-pages (like Documents tab vs Timeline tab) keeps the chat visible. However, our primary UI might all live in the chat for Phase 1.
  - Consider a sub-navigation for the dashboard (Timeline, Documents, Finance Lab, etc. as tabs) as per PRD Section 7.1. For Phase 1, these might just anchor to sections in the context panel or be placeholders.

- [ ] **Utilities & Settings Pages:** Stubs for other pages:

  - `app/tools/*` – if we want standalone pages for calculators (e.g., a full-page stamp duty calc). Not needed for MVP, but maybe stub one to ensure routing works.
  - `app/manage/documents` – to list all documents outside of chat (optional, since chat and timeline will link to docs anyway).
  - Setup a basic `app/settings` page where the user can edit profile, notification preferences, etc. (This can be minimal in MVP, but having the route helps future development.)

- [ ] **Route Testing:** Manually test the flow:

  - Going to `/` should redirect or serve the welcome page.
  - Buyer onboarding chat should create a user and transaction, then navigate to dashboard.
  - Verify that refreshing the dashboard page re-fetches the current state (meaning our getServerSide props or equivalent is working to pull from Prisma).
  - Also test an unauthenticated access to `/dashboard` is redirected to `/welcome` (if auth is enforced).

### 1.5 **Chat Interface & Context Panel** (Week 3, Early)

**Goal:** Build the core chat UI that enables conversation with the AI agents, and a dynamic context panel that shows transaction-specific info (timeline, property details, etc.). The chat interface is the heart of user interaction, so it should be responsive, accessible, and seamlessly integrated with agent outputs.

- [ ] **Chat UI Components:**

  - `ChatWindow` – the main container displaying the message list (user and AI messages).
  - `ChatMessage` – component for individual messages. Support different types: text messages, tool results (which might be formatted as cards or tables), error messages, etc.
  - Style messages distinctly (perhaps user messages right-aligned, agent messages left with a different background). Use Radix UI primitives (or ShadCN pre-built components) for things like scroll areas, avatars, etc., to ensure accessibility (Radix components come with a11y best practices out of the box).
  - `ChatInput` – the text input box and send button. Should handle multiline input and file attachments (for document upload). Use ShadCN’s `Input` and `Button` components here for consistent styling.
  - If a message is being processed by the agent, show a typing indicator (could be a simple “…typing” message or a spinner).

- [ ] **Contextual Panel Components:**

  - `ContextPanel` – a container that will display context relevant to the current conversation/thread. It should update as the conversation progresses or when the user switches transactions.
  - Inside it, include sub-components:

    - `PropertySummaryCard` – shows key property details (address, image if available, estimated value).
    - `TransactionTimeline` – a vertical list or mini Gantt chart of milestones. Could use a Radix `Progress` or just a list with dates. Highlight upcoming or overdue items. This subscribes to changes (e.g., if FinanceAgent updates a milestone to completed, it should reflect immediately).
    - `DocumentsList` – quick access to uploaded documents, possibly with status icons if AI analysis is done or pending.
    - `QuickActions` – shortcuts for common tasks (“Add a document”, “Ask a question about next steps”, etc.) that when clicked, insert a predefined message or open a form.

  - Make the context panel **role-aware**: For Phase 1 (buyer role), it shows buyer-centric info. In later phases, a professional’s context panel might show multi-deal overview, etc. Design the ContextPanel to accept a context object that can differ by user role.
  - The panel should be scrollable (use Radix `ScrollArea` component for custom styled scroll that is accessible).

- [ ] **Real-time Data Binding:** Use React state or context to manage the chat and context data. Likely, create a React Context for the current Mastra thread & transaction so both the ChatWindow and ContextPanel can access and update it.

  - For example, when a new message comes in from the agent indicating a milestone was completed, the Mastra service (or the message itself) could carry an event that updates the `Milestone` in Prisma. Our Supabase real-time listener (to be set up in 1.6) would catch that and update the UI.

- [ ] **Document Upload in Chat:** Allow the user to upload a file via the chat interface (e.g., drag-and-drop onto the chat or an attach button in ChatInput). On file select, immediately call a server action to:

  1. Upload the file to Supabase Storage (or another storage, but Supabase Storage is convenient and integrated).
  2. Create a `Document` record (status = “processing”).
  3. Trigger the DocumentAgent workflow on that file (e.g., via `mastraService.startWorkflow('doc-process', { fileUrl, transactionId })`).

  - The agent’s eventual summary or result should come back as an AI message in chat (e.g., “I’ve analyzed the contract. Key dates: …”).
  - Meanwhile, the context panel’s DocumentsList should show the document as “Processing…” and then update to “Ready” with a link to summary when done.

- [ ] **UI/UX Refinements:**

  - Debounce user input to prevent accidental double-sends.
  - If agent replies are long, consider streaming them token by token to the UI (Mastra might support streaming). This can make the app feel more responsive. If not easily done, at least show partial loading state.
  - Implement message grouping or day separators if needed for readability in long chats.
  - Ensure the interface is **accessible**: proper ARIA roles for the chat log (could be a `aria-live` region for new messages), focus management (after sending a message, focus back to input), and keyboard navigation (tab order, etc.).

- [ ] **Styling:** Use Tailwind CSS (utility classes) and ShadCN UI components to achieve a clean, modern look consistent with the brand. Perhaps match colors to Transactor’s palette (if known). Use icons (Lucide or similar, as PRD mentions Lucide icons) for buttons like send, attach, etc.
- [ ] **Testing Chat Manually:** Simulate a conversation:

  - Type a greeting, see that BuyerAgent responds with a prompt for info.
  - Go through a sample flow: provide budget, etc., ensure each answer appears and agent reacts appropriately (this tests our agent logic in a real UI context).
  - Upload a dummy document (can be a small text file if no PDF parsing yet) and see that the workflow is triggered (maybe stub a quick response).
  - Try edge cases: send an empty message (should probably do nothing or show validation), long message, etc.

### 1.6 **Real-Time Updates & State Management** (Week 3, Mid/Late)

**Goal:** Leverage Supabase’s real-time capabilities to keep the UI in sync across clients and ensure that any changes in the database (especially by background workflows) reflect instantly in the UI. Implement client-side hooks and context to manage application state (user profile, current transaction, notifications).

- [ ] **Supabase Client:** Initialize a Supabase client in the frontend (likely in a context provider). Use the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from our .env for public data. We might also use row level security with policies, but Phase 1 can keep it simple since each user’s data is separate (and Supabase by default isolates data by user if using their Auth).
- [ ] **Real-time on Key Tables:** Subscribe to changes on tables that the user cares about in real time:

  - `Milestone` – to get updates on timeline (e.g., a milestone marked complete by an agent).
  - `Document` – to get updates on document analysis (e.g., DocumentAgent finished processing).
  - `Transaction` – to catch any status changes (like "Settlement date changed" or overall status).
  - Possibly `Quote` – if marketplace quotes come in (phase 5).
  - Use Supabase’s `.on('UPDATE', ...)` listener for each relevant table with a filter on the current transaction ID. On event, update local state accordingly.
  - Make sure to handle the subscription cleanup on component unmount.

- [ ] **Global State with Context:** Create a React Context (or Zustand store) for global state such as:

  - current `User` (and their role, name – basically what we might get from Auth session),
  - list of current user’s transactions (for quick switching if needed, though a consumer likely has one active transaction; professionals will have many, handled in Phase 4),
  - possibly the active `Transaction` object and related data (property, milestones, etc.) loaded at dashboard entry.
  - Provide this context to the app so that any component can access, say, `currentTransaction` without drilling props.

- [ ] **Optimistic UI & State Sync:** When the user triggers an action that will update the DB via a workflow, update the UI optimistically. E.g., if user marks a task complete in the UI or sends a message that will create a milestone, show it immediately. If the workflow later fails or reverses, handle that (maybe via an error message or by correcting the state if the DB didn’t change).

  - Use Next.js 15’s `useOptimistic` hook if applicable for form actions, or simply manage it in React state.

- [ ] **Client Component Considerations:** Mark components that use state or effects as `"use client"` as needed. The Chat interface and any component that subscribes to Supabase real-time **must** be client-side (cannot run in a server component because they need WebSocket connections). Plan which parts of the dashboard remain server components (likely top-level layout that fetches initial data) and which are client (the chat and context panel contents). For example:

  - The `DashboardPage` can be a server component that fetches initial data via Prisma and passes it down.
  - The `ChatWindow` and `ContextPanel` would then be client components that receive initial data as props and then set up live subscriptions for changes.

- [ ] **Notification Toasts:** Implement a basic notification system for real-time alerts that may not be tied to a specific component’s UI. For instance, if the Settlement Guardian (in a later phase) flags a risk, or simply to confirm an action was done. Use Radix UI’s `Toast` component or another lightweight library. Ensure to position toasts and auto-hide them after a few seconds.
- [ ] **Clock & Schedulers:** For nudges and countdowns (like “3 days to cooling-off expiry”), we might need periodic checks. Mastra can handle scheduled workflow tasks (e.g., a daily check), but for Phase 1, we could also do a simple `setInterval` in the client to update a countdown timer in the UI. Keep such logic minimal now (maybe just update milestone D-Day counters).
- [ ] **Test Multi-Tab Sync:** Open the app in two browser tabs as the same user. Perform an action in one (e.g., upload a document or mark a milestone done via some simulated UI control), and ensure the other tab updates its timeline/document list within a couple of seconds via real-time. This verifies our subscriptions and state updates are working properly.

### 1.7 **Testing & Validation** (Week 4)

**Goal:** Rigorously test the Phase 1 implementation, including automated tests and scenario walk-throughs, to ensure the buyer vertical is solid. This involves writing unit tests for logic, integration tests for agent interactions, and end-to-end tests for the whole flow.

- [ ] **Unit Tests (Logic):** Use **Jest** (and perhaps React Testing Library for components) to test:

  - Prisma data logic: e.g., a test for `createTransactionWithAgent` that mocks Mastra and ensures a Transaction and MastraIntegration are created in the DB.
  - Mastra tools: test pure functions like mortgage calculation (given inputs, expect correct payment output).
  - Any utility functions (e.g., formatting dates for timeline).

- [ ] **Integration Tests (Agents & Workflows):** Write tests that exercise the agents in isolation:

  - Use a dummy OpenAI provider (Mastra might allow a fake LLM or just ensure deterministic responses via prompts for testing) to test agent outputs. For instance, test that `BuyerAgent` given a certain input routes to `FinanceAgent` by spying on the tool calls or checking the content of response.
  - Test Document workflow: simulate a document upload event and then inspect that a Document record is created and the workflow run sets some fields (for testing, you can have the DocumentAgent just echo some known summary).
  - These can run in Node (Mastra is Node-based), so consider using a test database or transaction that you roll back after each test (Prisma can use an SQLite or a test schema).

- [ ] **End-to-End Tests (UI):** Set up **Playwright** or **Cypress** for end-to-end testing in a headless browser. Scenarios to cover:

  - **Onboarding Flow:** User goes from welcome page, through buyer chat setup (enter details, verify OTP with a dummy code), and lands on dashboard. Verify that a new User and Transaction exist in the DB.
  - **Basic Conversation:** On dashboard, user asks a question like “What’s next?” and gets a sensible response. (We might seed the agent with a known prompt-response for test consistency, or stub the OpenAI calls in test environment.)
  - **Document Upload:** Simulate selecting a file in the chat, then ensure a “processing” message appears and, after a moment, a summary is shown. Validate the Document list shows the file.
  - **Timeline Update:** Perhaps have a test route or button to simulate a milestone completion (or have the agent respond to a certain trigger by marking a milestone done). Check that the timeline UI updates.

- [ ] **Performance Test (Basic):** Although with few users, test the response time of a typical interaction. Ensure P95 response times are under 3s as required. If any step is slow (e.g., document analysis, which might be longer), at least verify the UI doesn’t block (we show a loading state).
- [ ] **Linting & Type Checks:** Run `npm run lint` and `npm run type-check` to ensure code quality. Address any TypeScript errors or ESLint warnings. Enforce strict mode in TS (no `any` leaks) so that we maintain type safety end-to-end.
- [ ] **Acceptance Criteria:** Verify all key buyer user stories from PRD Section 6 are satisfied:

  - B-01: Chat onboarding auto-fills listing data – test by providing an address and ensure property details are fetched (even if stubbed).
  - B-04: Deadline nudges – perhaps simulate time passing or set a milestone due in 1 minute and see that a nudge message is produced by an agent.
  - SYS-02: One place for docs & chat – check that uploading a doc and discussing it in chat works, so user never had to leave.
  - SYS-03: Contract upload -> auto-fill – test with a dummy contract text that the system pulls out something (maybe property address or dates) and stores it.
  - SYS-04: Bank statement -> extract income – if implemented, test with a fake bank CSV that income is summarized.

- [ ] **Stabilize & Document:** Before moving to Phase 2, ensure we have internal documentation for what we built:

  - Write a brief README or Notion page about how the agent system is structured, how to add a new tool, etc., so other team members (or our future selves) can extend it.
  - Document any deviations or assumptions (e.g., “Currently, property search is stubbed to return a dummy listing because API X is not integrated yet”).

Phase 1 completes when a buyer user can successfully use the app from start (onboarding) to finish (settlement checklist), with the AI providing assistance throughout, and all of the above tests pass. 🎉

---

## **PHASE 2: SELLER VERTICAL & CORE EXTENSIONS (Week 5)**

_Focus:_ Leverage the Phase 1 foundation to create the seller experience. This will largely mirror the buyer flow but with some adjustments (pricing guidance instead of budget planning, listing process instead of search, etc.). Also, address any core features that were deferred but are needed for sellers (for example, property listing creation, or integrating the marketplace for agent quotes if a seller needs a conveyancer or inspector).\*

### 2.1 **Seller Agent & Tools**

- [ ] **SellerAgent:** Implement a new `SellerAgent` in Mastra by extending a base agent (or similar structure to BuyerAgent). This agent will handle chats starting with "I want to sell". It should coordinate steps like property appraisal, listing setup, open house scheduling, etc., as per PRD Seller user stories.

  - Add logic in `OrchestratorAgent` to spawn or route to `SellerAgent` when the user’s role is seller (or intent detected).

- [ ] **Seller Tools:** Create tools specific to seller needs:

  - `PricingEstimator Tool` – perhaps takes property details (location, size) and queries MarketData (or uses a simple formula) to suggest a price range. If CoreLogic API has an estimate range, use that.
  - `MarketingStrategy Tool` – could generate a basic marketing plan (number of open houses, recommended spend) possibly via a prompt to GPT-4 for now.
  - `NetProceeds Calculator` – given sale price and costs (outstanding mortgage, agent commission) output estimated net.
  - Reuse buyer tools where applicable (e.g., stamp duty might also matter if they are buying concurrently).

- [ ] **Workflow Adjustments:** Many workflows from buyer (like transaction timeline) are similar for seller, but ensure to cover seller-specific milestones (e.g., “list property on market”, “accept offer”, “contracts signed (exchange)”, etc.). Possibly create a `SellerTransactionWorkflow` that shares steps with buyer’s but has a few different branches (no loan approval step, but has marketing steps).
- [ ] **Context Panel for Seller:** Update `ContextPanel` to handle seller role:

  - Instead of “Timeline to settlement” only, maybe have a section for “Interested Buyers” or offer tracking if that becomes relevant. At minimum, change wording of milestones to seller perspective.
  - If a seller has also a parallel buyer transaction (upgrader scenario), ensure the dashboard can switch context between their sell-side and buy-side deals.

### 2.2 **Seller UI & Onboarding**

- [ ] **Onboarding Chat for Sellers:** Implement the seller path in the onboarding chat:

  - When a user chooses “I want to sell”, we invoke SellerAgent. The chat should gather property address (which can pull data via CoreLogic to pre-fill property characteristics), ask if they also need to buy (if so, maybe spawn both buyer and seller agents – could be advanced, skip for now).
  - It should result in a new Transaction of type “Sale” with an initial timeline (like list date, auction date or offer deadline, settlement date).

- [ ] **Seller Dashboard:** Once logged in, a seller sees their property and timeline (e.g., “Photography scheduled, Open House this Saturday”, etc.). Ensure the context panel and any quick actions make sense for a seller (e.g., a quick action to “View buyer offers” if we implement that).
- [ ] **Marketplace Integration (Basic):** A seller will need to connect with professionals (conveyancer, maybe stager, photographer). If available, implement a simple marketplace prompt: e.g., in the chat, if seller asks for help with conveyancing, the agent can list a few conveyancers (from `Provider` table) and offer to request quotes. This requires seeding some dummy providers and maybe a stub where agent just lists them.

  - If time permits, implement the flow: SellerAgent triggers `MatchAgent` (or just itself) to search providers (`Provider` model, filter by type and location), then initiates a `Quote` record with status "requested". In Phase 5 we’d have providers respond, but here we could just mark one as accepted manually.

- [ ] **Testing Seller Flow:** Similar to Phase 1 tests, ensure:

  - A new seller can onboard and see a timeline.
  - SellerAgent responds to questions like “How should I price my home?” with a reasonable answer (pulling from PricingEstimator).
  - Try an upload (e.g., upload a contract of sale, DocumentAgent should extract maybe the buyer’s name or deposit amount).
  - Multi-role: If a user is both buyer and seller (like an upgrader), test switching context. Possibly, the dashboard could allow toggling between the two active transactions. This might be advanced, but consider at least data model supports it (TransactionParticipant covers it). Maybe leave this for later unless time.

By end of Phase 2, we have both buyer and seller journeys operational, sharing most of the core code. This validates the vertical-first approach: adding the seller should be much faster than building buyer from scratch (we’ll measure that roughly week 5 progress).

---

## **PHASE 3: INVESTOR & ADDITIONAL CONSUMER ROLES (Week 6)**

_Focus:_ Add the investor (and possibly first-home investor or equity explorer) functionality, which extends the buyer features with financial analysis. Also incorporate any remaining consumer tools like the Equity Studio from PRD (tracking property value, loan balance, etc.).\*

### 3.1 **InvestorAgent & Equity Tools**

- [ ] **InvestorAgent:** Introduce an `InvestorAgent` to focus on users who already own property and want to expand their portfolio or optimize finances. This agent might be triggered either by an onboarding selection (“I’m an investor”) or by context (if user’s profile shows an existing property).

  - Responsibilities: equity calculation, refinance suggestions, portfolio projections.
  - Tools to integrate:

    - `ROICalculator Tool` – given a rental income, expenses, and property value, calculate return on investment.
    - `CashFlowAnalyzer Tool` – projects monthly cash flow for a property or portfolio.
    - `PortfolioOptimizer Tool` – perhaps a what-if analysis for buying another property (could integrate with FinanceAgent to check borrowing capacity for next purchase).
    - `EquityCalculator Tool` – using current property value (via CoreLogic) minus loan balance to determine usable equity.

- [ ] **Equity Studio Integration:** In the app UI, enable the **Equity Studio** tab for applicable users:

  - A page or context panel section where the user can input their current property details (or fetch from DB if we store it) and current loan, then see graphs or results (using Recharts for visuals as mentioned).
  - FinanceAgent or InvestorAgent can power this through chat: e.g., user says “How much equity do I have available?”, the agent uses EquityCalculator and replies with the number and maybe advice.
  - The UI might display an interactive chart of property value vs. loan over time (if we integrate with a price index or forecast).

- [ ] **Aspiring Buyer & New Owner:** If time permits, also cover the new personas:

  - Aspiring Buyer (savings plan) – could reuse FinanceAgent with a “SavingsPlan Tool” that given target and timeframe, outputs monthly saving needed.
  - Overwhelmed New Owner – the OwnershipAgent maybe, for post-purchase tasks like maintenance schedule. Possibly stub a simple checklist generated upon settlement (e.g., “Change locks, update address, etc.”).
  - These could be separate minor agents or just handled by BuyerAgent in a post-settlement phase.

- [ ] **UI for Investor:** Ensure the dashboard can handle an investor who might have multiple properties:

  - The context panel might list multiple properties with their data (like a mini portfolio overview).
  - Possibly implement a way to switch the active property context in the UI (if a user has more than one property in `Property` table linked to them).
  - Show metrics like total portfolio value, total debt, overall LVR (loan-to-value).

- [ ] **Testing:**

  - Give an existing property to a test user (seed a property and a transaction marked as “settled” or an ownership record).
  - Test that asking equity questions returns reasonable data (if we seed MarketData for that suburb).
  - Simulate the equity release journey: user says “I want to use my equity to buy another property”, see that InvestorAgent calculates borrowing power and perhaps refers to a Mortgage Broker (this might connect to marketplace in Phase 5).
  - Make sure none of these new calculations break the existing flows (regression test buyer and seller quick use cases).

Phase 3 extends the value of the platform to users beyond a single transaction, setting the stage for long-term engagement (they continue using the app after purchase). It also lays groundwork needed for professional tools (e.g., ROI calculators might be useful for brokers too).

---

## **PHASE 4: PROPERTY PROFESSIONAL VERTICALS (Weeks 7–8)**

_Focus:_ Develop the experience for professional users – conveyancers, real estate agents, mortgage brokers, etc. This includes dedicated dashboards (Command Center) and specialized AI agents (to automate their workflows, like Settlement Guardian for delays). Phase 4 is significant as it protects and generates revenue (via professional retention and marketplace fees).\*

### 4.1 **Professional Agents & Command Center**

- [ ] **ProfessionalAgent (General):** Implement a base agent for professionals that handles common needs: multi-transaction overview, risk alerts, and orchestrating communications to clients. This agent might not interface with users via chat (or maybe it does via a different UI), but runs in the background to monitor things (like a personal assistant for the professional).

  - Tools: could include a `DelayPredictor Tool` that uses a simple ML model or rule set to score each transaction (using data from our DB like number of days left, tasks incomplete).
  - Memory: use Mastra memory to store a professional’s key concerns (like which transactions they flagged for attention).

- [ ] **ConveyancerAgent:** A specialized agent for the conveyancer persona:

  - It might ingest all contracts (Documents) and automatically extract key dates and clauses, presenting a summary or alert if something is unusual (like a missing easement info).
  - Tools: `ClauseExtractor Tool` (search contract for specific terms), `ComplianceChecker Tool` (perhaps check if VOI done, etc.).
  - This agent could respond via a chat interface for conveyancers or purely via generating notifications.

- [ ] **RealEstateAgentAgent:** (Naming is awkward, call it ListingAgent perhaps) – focuses on listing status:

  - Monitors all their listings (active transactions where user.role = agent).
  - Notifies them of any buyer/seller questions or if a milestone is at risk.
  - Possibly proactively generates weekly status emails for clients (with AI summarization).

- [ ] **BrokerAgent:** Monitors loan applications and settlement schedules:

  - Integrate with a dummy or real lender API if possible (maybe out of scope; instead, allow broker to input statuses).
  - Alerts if finance approval is not obtained near finance date.
  - Suggests better rate refi opportunities for past clients (this overlaps with FinanceAgent’s capabilities, but targeted at broker to prompt them to reach out).

- [ ] **Integration of Agents:** Update Orchestrator or a separate Orchestrator for professionals to route professional queries to the right agent. For example, if a conveyancer types a message, it might go to ConveyancerAgent. Also, a professional might ask something like "Which settlements are at risk?" and the system should respond via InsightsAgent (below).
- [ ] **SettlementGuardian (InsightsAgent):** Implement the **InsightsAgent** described in PRD:

  - It can be a workflow that continuously runs (or is scheduled daily) to evaluate all transactions.
  - Use a simple risk scoring: e.g., if >2 days past finance due and finance not approved, risk score up. Or if settlement is in 3 days and no final inspection done, risk++.
  - If high risk, create a `Notification` record or directly notify the responsible professional via the app (this ties into notifications Phase 5, but we can log it now).
  - This agent could also be invoked on-demand: professional asks "Any risks on my files?" and it summarizes (like “File Jones: finance delay risk; File Smith: all good”).
  - This addresses PRO-05, PRO-10 in user stories.

- [ ] **Professional Command Center UI:** Under `app/professional/`, create pages for each type, or a unified one that adapts:

  - `app/professional/overview/page.tsx` – a high-level page showing, for the logged-in professional, metrics like number of active deals, upcoming settlements (with dates and a status indicator).
  - Conveyancer-specific: maybe a filtered view listing each transaction, its next milestone, and any pending client actions. Could implement a Kanban (as PRD suggests), e.g., columns for "Pre-signing", "Pre-settlement", "Post-settlement".
  - RealEstateAgent: a page listing all listings (property addresses) and status (on market, under contract, settled), including commission due. Chart of commission pipeline.
  - Broker: pipeline of loans (by client name, property) with statuses (submitted, approved, settled).
  - Use Radix Tabs or similar to toggle between views (the PRD mentions tabs for different pro tools).
  - Ensure these pages use server-side data fetch (to aggregate data from multiple transactions efficiently via SQL).
  - Provide interactive filters or search if a pro has many deals (search by client name or property).

- [ ] **Communication Hub:** For any professional, implement a combined messaging center:

  - Possibly a page `app/professional/communications` that aggregates all messages/requests from their clients across transactions.
  - This might reuse the Chat component but show threads per transaction. In Phase 4, maybe just a list of transactions with unread messages count. Clicking one takes them to that transaction’s dashboard/chat.
  - The key is to ensure a busy professional can manage multiple conversations easily.

- [ ] **Testing (Pro perspective):**

  - Create a sample conveyancer user, link them to a couple of transactions (TransactionParticipants).
  - Log in as conveyancer (maybe bypass actual email verification for test) and check the dashboard shows those deals.
  - Simulate a risk scenario: mark a milestone incomplete past due, then run the InsightsAgent (maybe via a test button) and see that a warning is displayed.
  - Ensure that the conveyancer can respond via chat in a transaction and the buyer sees it. (We need to allow cross-user chat – likely each transaction’s chat will include all parties. If using one Mastra agent for all, then incorporate the professional’s messages accordingly. Mastra might act as an intermediary or just record them. Possibly out-of-scope to do real user-to-user messaging now, but at least simulate with agent relaying).
  - Confirm that no confidential info leaks: e.g., an agent shouldn’t see another agent’s data (shouldn’t if queries are scoped by userId in Prisma queries, and we enforce Auth properly).

Phase 4 is complex and may extend beyond 2 weeks, but the aim is to deliver at least one or two professional roles fully (likely Conveyancer and Real Estate Agent, since they are key to preventing delays and seeing immediate platform value).

---

## **PHASE 5: ADVANCED FEATURES & MARKETPLACE (Weeks 9–10)**

_Focus:_ Layer in the advanced cross-cutting features that enhance the platform’s utility and intelligence: the provider marketplace, document intelligence enhancements, richer financial tools, and a robust notification system for all communications. This phase also involves tying up any loose ends from earlier phases.\*

### 5.1 **Document Intelligence & Compliance**

- [ ] **Advanced Document AI:** Integrate a third-party document AI service (if available by 2025) or improve our DocumentAgent:

  - For contracts, implement a clause library: e.g., detect presence or absence of certain standard clauses (cooling-off period clause, finance clause, etc.) and warn if missing or unusual (addresses PRO-12 user story).
  - For bank statements, consider using a library like Papaparse if they upload CSV, or if PDF, try an OCR approach (Tesseract.js or an API). Summarize income and expenses into the FinancialProfile.
  - Store parsed data in structured form (could add fields in `FinancialProfile` like monthlyIncome, etc., or attach JSON in Document.aiSummary).

- [ ] **Compliance Checker:** Build a Mastra workflow (or just a function) to cross-verify document data with timeline data:

  - E.g., ensure the Contract of Sale’s settlement date matches what’s in our Transaction model; if not, flag it.
  - Check that the name on the contract matches the user’s name (VOI check basics).
  - These checks could trigger notifications to professionals if something is off.

- [ ] **User-Facing Summaries:** For each key document type, generate a plain English summary for consumers (PRD mentions this). Could use GPT-4 to summarize, but ensure sensitive data isn’t sent externally unless we have to. Perhaps as an MVP, generate a template-based summary (e.g., “Contract for 123 Street: Settlement on X date, Price Y, Special Conditions: none.”).

  - Display these summaries in the UI when user clicks a document, and allow downloading the original file.

### 5.2 **Marketplace & Provider Matching**

- [ ] **Provider Search:** Implement the UI for finding a provider (conveyancer, broker, etc.) in `app/marketplace/find/[serviceType]`.

  - Page should list providers from our `Provider` table filtered by type and location (we might use a simple text search or prefilter in code since dataset likely small initially).
  - Show ratings and a “Request Quote” button.

- [ ] **Provider Ranking (AI):** Use our `MatchAgent` (if created) or simply some heuristics to rank providers. Perhaps an AI could consider the context (e.g., “first-home buyer in QLD” might rank providers who have good first-home reviews, etc.). Simpler: sort by averageRating and distance (if we had geo data).
- [ ] **Quote Workflow:** When user requests a quote from a provider:

  - Create a `Quote` record (with status PENDING).
  - Notify the provider (if we have a way, maybe just email via SendGrid). Simulate provider accepting by updating the record or provide a minimal UI for providers to login and accept (could be too deep; maybe accept via a link that updates via a special route).
  - Once accepted, notify the user and attach the provider to the transaction (add a TransactionParticipant for that provider and transaction).
  - This effectively “hires” the provider and should allow them access to the transaction timeline (so they can use the professional Command Center on that file).

- [ ] **Integrations for Pros:** If feasible, in this phase integrate any external systems:

  - Calendar sync: e.g., for building inspectors, if we had more time, we’d integrate Google Calendar API to block out their schedule for inspection bookings. Possibly skip actual integration but ensure our system can output an .ics or something as a placeholder.
  - MLS (real estate listings): if an agent could import active listings, we might parse a CSV or have them enter manually for now.
  - These might be out-of-scope for MVP, and can be placeholders or future work.

- [ ] **Verify Marketplace Flow:**

  - Test as a buyer: go to find a conveyancer, see list, request quote, simulate acceptance, and ensure now that conveyancer appears in your transaction’s “Connections” panel.
  - Ensure that once a provider is attached, they can view that transaction in their dashboard (use the relationship we set up).

### 5.3 **Financial Enhancements**

- [ ] **Rate Watcher:** Expand FinanceAgent to periodically check current interest rates (via RateCity API or another source). If a significant drop is found and a user could benefit by refinancing, have the agent notify the user (and possibly their broker).

  - This could use a scheduled Mastra workflow daily. We might set it up but maybe not fully functional without an API — possibly stub the data or manual trigger.

- [ ] **Refinance Calculator:** Add a tool that compares current loan vs possible new loan at a lower rate, calculating potential savings. If savings > threshold (like \$2k/year per PRD), flag it.
- [ ] **Borrowing Capacity Detail:** If not already, incorporate more detailed calculations: e.g., if the user provides their income and debts, let FinanceAgent produce a borrowing capacity report (some formula or use an open library if available).
- [ ] **Investment Property Tools:** If not done in Phase 3, add a Depreciation calculator (for tax on investment properties) or a CGT estimator for selling an investment.
- [ ] **UI – Finance Lab:** Flesh out the Finance Lab tab mentioned in PRD:

  - Use Recharts to create interactive charts, e.g., a mortgage repayment graph (principal vs interest over time), or a bar chart comparing different loan options.
  - Allow the user to tweak inputs (interest rate, loan term) and see updated chart (this can all be client-side calculation).
  - Ensure this is accessible via chat as well (user could ask “show me a chart of my loan payoff over 30 years” – a stretch goal to generate chart on the fly, but maybe just via UI for now).

- [ ] **Test Financials:**

  - Use known formulas to verify calculators (write jest tests for a couple of interest calculations).
  - Check that all finance features work for various roles (e.g., an investor can also use Finance Lab for their refinancing).
  - Confirm that none of these calculations cause performance issues (they should be quick).

### 5.4 **External API Integrations**

- [ ] **CoreLogic Property Data:** Implement integration to fetch property details and values:

  - Use the address from user input to call CoreLogic API (or a mock if we don’t have actual access). This would return estimated value, maybe a value range, last sold date, etc.
  - Populate our `Property.estimatedValue` and `valuationUpdated` fields when a property is added or when user explicitly refreshes.
  - Also update `MarketData` for that suburb (if CoreLogic provides such stats).
  - Handle API errors or rate limits by caching results (maybe store the JSON in our DB to avoid repeated calls for the same property).

- [ ] **RateCity Integration:** Connect to RateCity (or another source) for current interest rates:

  - Possibly an endpoint that returns current average rates for certain loan types.
  - Use this in FinanceAgent when asked “compare rates” or in Rate Watcher.
  - If not available, prepare the system to accept such data (could manually seed some rates).

- [ ] **Twilio & SendGrid (Communications):** _(If not already done earlier.)_ Integrate Twilio SMS API and SendGrid Email API for outgoing messages:

  - Use Twilio’s **Programmable Messaging API** to send SMS alerts (wrap calls in a server action or Mastra tool). E.g., OTP codes, or “Reminder: settlement tomorrow” texts.
  - Use SendGrid (Twilio SendGrid) for emails: set up transactional email templates for things like invitation to platform, weekly summary to professionals, etc. At minimum, verify we can send an email via API (perhaps on a test event like user signup).
  - Secure the API keys in env and abstract sending in a module so other parts of the app can easily trigger notifications.

- [ ] **Webhooks for Professionals:** If any professional tools (like a conveyancer’s own system or a Google Calendar for inspectors) provide webhooks, set up endpoints under `pages/api/webhooks/*`. For example, if we integrate a calendar, an incoming webhook could update an inspection date in our system.

  - This might be beyond MVP; at least scaffold one to see the pattern.

### 5.5 **Notifications & Communication Orchestration**

- [ ] **Unified Notification System:** Now that SMS/Email are integrated, implement a notification center:

  - Design a Mastra workflow or server logic that, whenever a significant event occurs (milestone due, risk detected, quote received, etc.), decides how to notify relevant users. Use user preferences from `User` model (emailNotifications, smsNotifications flags).
  - For example, when a milestone due date is 1 day away, notify the responsible party: if consumer, maybe both email and app notification; if professional, perhaps just app (assuming they log in often) or SMS if urgent.
  - Use Twilio Verify for OTP specifically (which might have its own API flow).

- [ ] **In-App Notifications UI:** Add an indicator (bell icon) in the header that shows number of unread notifications. Create a component to display a dropdown or page listing notifications (these could be stored in a `Notification` table if we choose to).

  - Each notification should have a type and link (e.g., “Milestone X is due – view timeline”).
  - Mark as read when clicked.

- [ ] **Automated Client Updates:** For professionals, implement sending automated updates to their clients:

  - E.g., on a weekly basis, an agent’s clients get an email summarizing “Here’s what happened on your sale/purchase this week, courtesy of \[Agent Name] via Transactor.” This drives engagement and makes the pro look good.
  - Use AI to draft these summaries from the timeline (the CommunicationAgent could do this). Professionals can opt-out or choose to review before sending (out-of-scope for now, so maybe auto-send to a test address).

- [ ] **Test Notifications End-to-End:**

  - Generate a fake event (like milestone due) and see that:

    - A Notification entry is created in DB (if using table).
    - An email is sent (check logs or use a test SendGrid API key that stores but doesn’t actually send).
    - An SMS is sent (Twilio trial could send to verified numbers only; for test, check Twilio console logs).
    - The in-app bell shows a new notification for the event.

  - Test OTP: sign up a new user and verify the SMS code delivery (if Twilio trial, maybe use a personal number to confirm).
  - Ensure no spam: e.g., if multiple triggers fire, the system should coalesce notifications (maybe future enhancement, but check we’re not, say, sending 5 messages at once for 5 milestones – could group them).

By end of Phase 5, the platform should feel feature-complete: all main user types supported, AI enhancing every major step (search, data entry, risk management, etc.), and robust communication channels established.

---

## **PHASE 6: SCALE, PERFORMANCE & POLISH (Weeks 11–12)**

_Focus:_ Finalize the product for a beta or general launch. This includes load testing, performance optimization, rigorous security auditing, UI/UX polishing, and deployment setup with monitoring.\*

### 6.1 **Performance Optimization**

- [ ] **Profiling:** Profile agent response times and DB queries. Use logging or profiling tools to identify slow spots:

  - If any Mastra tool (like document parsing or external API call) is slow, see if it can be done asynchronously (e.g., yield a quick response and do heavy lifting in background workflow with a follow-up message when done).
  - Check for N+1 query issues in Prisma usage. Add indexes or use `include` to eager-load related data to avoid repeated queries.

- [ ] **Scaling DB Connections:** Ensure Prisma uses connection pooling with Supabase. Use the Supabase **connection pooling (pgBouncer) URL** in production env (`?pgbouncer=true` in connection string). Also set up a `DIRECT_URL` for migrations as per Supabase guidelines.

  - This prevents too many connections in serverless environment and improves scalability.

- [ ] **Resource Usage:** Optimize memory usage on Vercel (if using serverless):

  - Disable any large libraries on client side (make sure Mastra and OpenAI calls stay server-side).
  - Possibly use Next.js Middleware or Edge functions for lightweight tasks (though Mastra likely requires Node environment, keep it server-side Node).

- [ ] **Front-end Performance:**

  - Split code properly: use dynamic import for large modules (e.g., PDF parser, charts) that aren’t needed on initial load.
  - Remove any unused dependencies.
  - Test on mobile throttling to ensure chat UI is still responsive (Tailwind and Radix are lightweight, but check).
  - Lighthouse audit: aim for performance score 80+ on key pages.

- [ ] **Load Testing:** Simulate concurrent usage:

  - Use a tool like Artillery or JMeter to simulate, say, 50 concurrent user onboarding or chat interactions. Since our backend is mostly OpenAI-bound, we need to ensure we queue or handle those requests.
  - If we see issues, consider introducing rate limiting or queuing on certain endpoints to avoid overload (especially if hitting external APIs).
  - Verify the system supports 1000+ concurrent connections as per NFRs (this might be theoretical, but ensure no obvious bottleneck like global locks).

### 6.2 **Security & Compliance**

- [ ] **Access Control Review:** Double-check all server actions and API routes for proper authentication gating:

  - Use Supabase RLS policies for critical tables if possible (ensure user can only select their own transactions, etc.). If not using RLS, our application logic must enforce checks everywhere.
  - Try to abuse the API as a different user in test (e.g., if you have two accounts, attempt to fetch a transaction not yours via direct URL or change an ID in some request) – ensure it’s forbidden.

- [ ] **Sensitive Data Protection:**

  - All document files in storage should be private (Supabase Storage can restrict to authenticated users; ensure token-based download or serve via our API with auth check).
  - Personal data (names, emails, phone numbers) should never be exposed to other parties without consent (check that, for example, a buyer cannot see another buyer’s email in a multi-buyer scenario – but in same transaction it’s fine).
  - Encrypt at rest if needed: Supabase already encrypts the DB, but maybe ensure we’re not logging sensitive info.

- [ ] **Audit Logging:** Consider logging important actions (like an audit trail: who changed what). At least, ensure we log errors and unusual events. If time, set up a simple log of user activities for debugging.
- [ ] **GDPR/Privacy Compliance:** Provide a way to delete user data (account deletion pathway). Perhaps a simple button in settings that triggers deletion of their personal data (which might conflict with transaction records if mid-transaction – we might restrict deletion until transaction complete). Note this for future but not critical for MVP unless legal requires.
- [ ] **Accessibility Audit:** Use tools or do manual checks for WCAG compliance:

  - All interactive elements have keyboard support and screen reader labels.
  - Sufficient color contrast in the UI (especially around timeline and charts).
  - Test with screen reader basic flow (can the chat be used via screen reader? Aria-live might announce new messages).
  - Address any issues found (Radix/ShadCN should cover a lot, but our custom parts might need ARIA attributes).

- [ ] **Error Monitoring:** Integrate **Sentry** (or similar) for catching runtime errors in production:

  - Use Sentry’s Next.js SDK to capture exceptions from both client and server.
  - This will alert us to issues like unhandled promise rejections in agent calls, etc., in real-time.
  - Set up Sentry DSN and test that an intentional error (like calling Sentry.captureException in a test route) shows up in the dashboard.

- [ ] **Penetration Testing:** If possible, perform or hire a pen-test, or at least run OWASP ZAP on our deployed site to catch obvious web vulnerabilities (XSS, CSRF – Next.js has built-in CSRF protection for actions, but double-check if we use any custom forms).

  - Ensure helmet-like headers are in place (Next 15 should handle most, but verify Content Security Policy especially if using any unsafe eval in charts or so).
  - The AI aspects likely don’t introduce new web vulns, but prompt injection is a potential risk (someone could upload a doc that when summarized triggers undesirable output). While hard to fully prevent, we can mitigate by not blindly executing content from AI (our agents generally produce text or structured data, which should be fine).

### 6.3 **Deployment & Monitoring**

- [ ] **CI/CD Pipeline:** Finalize the GitHub Actions (or other CI) to run tests on push. Ensure migrations run on deploy (maybe use Prisma migrate in a deployment script).

  - Set environment variables in Vercel or chosen host for production (Supabase keys, API keys, etc.).
  - Configure proper domains (transactorapp.com) and any redirects needed.

- [ ] **Beta Deployment:** Deploy to a staging environment first. Seed it with some realistic data. Perhaps invite a small group of users to test and gather feedback (if applicable).

  - Monitor logs and performance during this beta usage.

- [ ] **Monitoring Tools:** Set up basic monitoring:

  - Supabase provides some DB metrics; keep an eye on query count, CPU.
  - Vercel Analytics or a custom solution for tracking API response times.
  - If any Mastra-specific monitoring (maybe logs of workflow durations), enable it.

- [ ] **Analytics:** Integrate an analytics tool (if wanted) to track user engagement and funnel (e.g., using Supabase Analytics or PostHog). Not vital for functionality, but useful for measuring KPIs (like how many users complete onboarding).
- [ ] **Feedback Loop:** Ensure there’s an easy way for beta users to provide feedback/bug reports. Maybe a simple "Feedback" button that sends us an email or message (could integrate a service or even just mailto).
- [ ] **Final UX Polishing:** Fix any minor styling issues and ensure consistency:

  - Make sure all components have mobile-friendly layouts (test every screen on a small device width).
  - Verify branding elements (logo, colors) are correctly used.
  - Provide help text or tooltips for anything that might confuse users (especially in professional dashboards which can be data-heavy).
  - Double-check content for typos or unclear phrasing, especially AI prompt outputs that we have control over (instructions).

- [ ] **Go/No-Go Checklist:** Re-confirm that all PRD core objectives are met (reduction in delays, etc., we have features addressing each).

  - If any high-priority item is not done or not working well, decide if it’s a launch blocker or can be done as a fast-follow.
  - Run through a full scenario as a final test: e.g., simulate a complete transaction with multiple parties and see that everything flows (this is like UAT).

- [ ] **Launch:** When confident, deploy to production and announce internally or to the beta users. Closely watch monitoring and error tracking for any post-launch issues (and be ready to hotfix if needed).

---

## 🎯 **SUCCESS METRICS & VALIDATION**

After implementation, we will measure success against the PRD’s Objectives:

- **User Experience KPIs:** Ensure status-enquiry support tickets reduce (we can simulate this by user testing – are they finding what they need without asking a human?), and that user feedback (surveys or NPS) is positive (>55 NPS).
- **Efficiency Metrics:**

  - Track median contract-to-settlement time in our data; goal is a 15% reduction, which we’ll measure once enough transactions run through the system.
  - Settlement delays >7 days should drop (our agents should flag issues earlier; we’ll monitor how many still get delayed and why).
  - Professional daily actives: with the Command Center, aim to see professionals logging in frequently – we can measure DAU/MAU for pros after launch.

- **System Metrics:**

  - P95 API/agent response time <3s in production usage – keep optimizing until this is consistently met.
  - Uptime 99.9% – with proper monitoring, ensure downtime is minimal (use Vercel’s high availability and Supabase’s redundancy).
  - No critical errors unhandled: Sentry should show zero critical exceptions after initial fixes.

The above task list is designed to build Transactor 2.0 as envisioned: a seamless AI-first property concierge that connects and guides all parties through a property transaction. By following this phased plan and leveraging best practices for each component of our tech stack (Next.js 15, Mastra, Supabase, Prisma, Tailwind/ShadCN, Zod, Twilio/SendGrid), we ensure that each part of the system works harmoniously with the others, resulting in a robust, scalable application. The development approach emphasizes strong foundations, continuous integration of AI capabilities, and rigorous testing, setting us up for a successful launch and an easily extensible platform for future growth.
