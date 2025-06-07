**Product Requirements Document (PRD)**
**Product Name:** **Transactor 2.0 – The AI-Driven Property Concierge**
**Doc Version:** v0.5 (Draft) **Last Updated:** 7 June 2025

---

## 1. Long Description

Transactor AI re-imagines the original Transactor property-tracking tool as a fully fledged, always-on concierge for every Australian property journey.
Where the current app already gives buyers, sellers and professionals a shared timeline of milestones, documents, and reminders ([transactorapp.com][1], [transactorapp.com][2]), the new version puts an **orchestrated team of AI agents** (built on Convex’s durable Agent & Workflow components) at the centre of the experience.

From the very first chat—“I want to buy”, “I want to sell”, or “I’m a conveyancer looking for leads”—Transactor 2.0 spins up role-specific agents that:

- **Gather and pre-fill data** from property APIs and user uploads to create a living file for the transaction.
- **Generate and update a visual timeline** for finance, inspections, conveyancing, marketing and settlement in real-time.
- **Match users with top-rated professionals** (conveyancers, mortgage brokers, building-and-pest inspectors) and let them accept quotes in-app.
- **Proactively nudge** everyone about looming deadlines (e.g. cooling-off expiry) and surface risks or delays before they bite.
- **Provide powerful finance tooling**—stamp-duty calculators, first-home-buyer grant eligibility, equity-release scenarios and live rate comparisons.
- **Securely manage documents** with AI-generated plain-English summaries and compliance checks.

On the back end, Convex’s real-time database, durable workflows and vector-store memory let every agent remember context, resume if interrupted, and stream updates to every screen the moment state changes ([convex.dev][3], [docs.convex.dev][4]).

The result is a single place where buyers feel guided, sellers feel informed, and professionals win time and new business—all while Transactor quietly scales the same core infrastructure that has already helped Australians settle more than **A\$11 billion** in property transactions ([stage.transactorapp.com][5]).

---

## 2. Purpose

Transform Transactor from a passive milestone tracker into a proactive, AI-driven platform that **orchestrates, automates and optimises** every step of buying, selling and servicing residential property in Australia.

---

## 3. Background & Opportunity

| Gap in v1                                      | Pain for Users                      | How AI-first 2.0 Solves It                    |
| ---------------------------------------------- | ----------------------------------- | --------------------------------------------- |
| Status info scattered across email, SMS, calls | Constant “Where are we at?” queries | Persistent AI chat + real-time timeline       |
| No predictive guidance                         | Missed deadlines, stress            | Agents surface next-best actions & countdowns |
| Limited finance tooling                        | Confusion on grants, equity         | FinanceAgent runs calculators & scenarios     |
| Static workflows                               | Edge cases stall progress           | Convex workflows adapt & retry automatically  |

---

## 4. Objectives & Success Metrics

| Objective                           | KPI                              | 12-Month Target |
| ----------------------------------- | -------------------------------- | --------------- |
| Cut status-enquiry support tickets  | # tickets referencing “progress” | -40 %           |
| Shorten contract-to-settlement time | Median days                      | -15 %           |
| Grow marketplace revenue            | Paid provider bookings           | +60 %           |
| Delight users                       | In-app NPS                       | > 55            |

---

## 5. Target Users & Personas

1. **First-Home Buyer (Chloe, 28)** – needs grants, budgeting help.
2. **Upgrader Seller (Raj, 41)** – simultaneous buy-and-sell.
3. **Investor (Lena, 35)** – equity strategy & refinance.
4. **Conveyancer (Kylie, 38)** – wants automated updates and more leads.

---

## 6. Key User Stories

| ID     | As a …      | I want …                                     | So that …                |
| ------ | ----------- | -------------------------------------------- | ------------------------ |
| B-01   | Buyer       | chat onboarding that auto-fills listing data | setup < 5 min            |
| B-04   | Buyer       | deadline nudges                              | I never miss cooling-off |
| S-02   | Seller      | AI pricing guidance                          | realistic expectations   |
| INV-03 | Investor    | equity scenarios                             | unlock capital           |
| PRO-01 | Conveyancer | auto milestone plan                          | no duplicate admin       |
| SYS-02 | Any role    | one place for docs & chat                    | zero email chase         |

---

## 7. Scope

### 7.1 Core Functional Requirements

| Module              | Requirements                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Welcome / Role Pick | Full-screen chat with quick-start buttons                                                                                     |
| Onboarding Agents   | Collect address (autocomplete), role-specific Q\&A, OTP verification                                                          |
| Dashboard           | Two-pane layout – persistent chat + tabbed workspace (Timeline, Messages, Documents, Connections, Finance Lab, Equity Studio) |
| Timeline            | Real-time Gantt, milestone auto-updates                                                                                       |
| Documents           | Upload, AI summary, compliance checker                                                                                        |
| Finance Lab         | Stamp-duty, borrowing-power, repayment, grant-eligibility & rate-watch tools                                                  |
| Equity Studio       | Valuation API + loan balance → usable equity scenarios                                                                        |
| Marketplace         | Ranked provider matches, quote acceptance, ratings                                                                            |
| Notifications       | In-app toast + email/SMS via Convex actions                                                                                   |

### 7.2 Out of Scope (v1)

- Automated funds disbursement
- Non-Australian jurisdictions
- Real-time user-to-user chat (beyond AI relay)

---

## 8. Non-Functional Requirements

- **Performance:** P95 agent response < 3 s.
- **Reliability:** Workflows resume after crash; retries on API failure.
- **Security:** Role-based ACL in Convex; docs encrypted at rest.
- **Accessibility:** WCAG 2.2 AA; Radix components audited.

---

## 9. Technical Overview

| Layer           | Stack                                                      |
| --------------- | ---------------------------------------------------------- |
| Frontend        | Next 15 (App Router), React 19, Tailwind 4, Radix UI, GSAP |
| Realtime & Data | Convex DB & reactive queries                               |
| AI & Workflows  | `@convex-dev/agent` + Convex `workflows`                   |
| Auth            | Clerk (future) / next-auth placeholder                     |
| Comms           | SendGrid email, Twilio SMS via Convex actions              |
| External APIs   | CoreLogic (valuations), RateCity (mortgage rates)          |

---

## 10. System Architecture (Summary)

1. **Client** hits `/` → welcomes user with Role-Pick chat.
2. **OrchestratorAgent** creates role-specific agents (BuyerAgent, SellerAgent, etc.).
3. Agents persist chat and state to Convex (`agent_messages`).
4. Long tasks (e.g. compliance check) are off-loaded to durable **Workflows**.
5. Front-end subscribes to Convex queries; Timeline and notifications update instantly.

---

## 11. Data Model (Convex Draft)

| Table            | Key fields                                 |
| ---------------- | ------------------------------------------ |
| `users`          | `_id`, `role`, `email`, `authId`           |
| `properties`     | `address`, `latLon`, `roles[]`             |
| `threads`        | `propertyId`, `userIds[]`, `status`        |
| `milestones`     | `threadId`, `title`, `dueDate`, `status`   |
| `documents`      | `propertyId`, `type`, `url`, `summary`     |
| `agent_messages` | `threadId`, `role`, `content`, `embedding` |
| `providers`      | `type`, `name`, `rating`, `feeRange`       |

---

## 12. Key Screens & UX Notes

1. **Welcome / Role Pick** – hero imagery (Embla carousel), CMD-K palette for power users.
2. **Chat-First Onboarding** – progressive Q\&A with zod validation.
3. **Dashboard** – `react-resizable-panels`; Timeline uses Radix Progress.
4. **Finance Lab** – Recharts visualise repayments, grant savings.
5. **Provider Marketplace** – GSAP-animated cards with Lucide icons.

---

## 13. AI-Agent Design

| Agent             | Core Tasks                     | Convex Feature     |
| ----------------- | ------------------------------ | ------------------ |
| Orchestrator      | spawn & route messages         | top-level thread   |
| Buyer/SellerAgent | profile, milestone plan        | memory + text gen  |
| FinanceAgent      | calculators, rate watch        | scheduled workflow |
| ConveyancingAgent | sync provider updates          | long-poll workflow |
| MatchAgent        | vector search & rank providers | hybrid search      |
| InsightsAgent     | delay/risk detection           | cron analytics     |

---

## 14. Timeline (Indicative)

| Phase         | Duration | Outputs                 |
| ------------- | -------- | ----------------------- |
| Discovery     | 2 w      | Refined PRD, Figma flow |
| Agent POC     | 2 w      | Convex Agent demo       |
| Core MVP      | 8 w      | Role→Timeline flows     |
| Marketplace   | 2 w      | Provider matching       |
| Finance Tools | 3 w      | Lab & Equity Studio     |
| Hardening     | 2 w      | Pen-test, a11y audit    |
| Beta          | 1 w      | Closed cohort           |
| GA            | —        | Launch                  |

---

## 15. Assumptions & Risks

| Assumption                      | Risk            | Mitigation                        |
| ------------------------------- | --------------- | --------------------------------- |
| Convex Agent API stabilises     | Breaking change | Pin version, monitor releases     |
| Property APIs allow caching     | Rate-limits     | Server-side cache, back-off       |
| Professionals adopt marketplace | Low liquidity   | Seed partners, early-bird pricing |

Below is a broad, “idea-dump” catalogue of everything Transactor’s AI agents could conceivably handle for a buyer at each stage. Use it as a menu; you can trim or sequence later.

---

## 1. Pre-Purchase (Research & Readiness)

| Theme                   | Agent-Powered Tasks                                                                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Financial Readiness** | • Savings planner & deposit goal tracker <br>• Stamp-duty and LMI calculators <br>• First-home buyer grant / concession eligibility check <br>• Borrowing-capacity modelling with interest-rate stress tests <br>• Credit-score “what-if” coach (e.g. pay down card → +X borrowing) |
| **Market Intelligence** | • Suburb-level price trends & comparable-sales digests <br>• School-catchment, transport & amenities heat-maps <br>• Auction-clearance stats & seasonality tips                                                                                                                     |
| **Property Discovery**  | • Listing scraper → daily short-list email <br>• Voice/Chat search: “3-bed within 10 km of CBD under \$950 k” <br>• Smart alerts when a price guide drops                                                                                                                           |
| **Due-Diligence Prep**  | • Auto-book building/pest, strata, flood-risk reports for shortlisted homes <br>• Explain contract clauses in plain English                                                                                                                                                         |
| **Team Assembly**       | • Match & schedule chats with brokers, conveyancers, inspectors <br>• Surface provider ratings & fixed-fee quotes                                                                                                                                                                   |
| **Offer Strategy**      | • Auction bidding simulator & walk-away price guidance <br>• Negotiation script suggestions for private treaties                                                                                                                                                                    |
| **Logistics**           | • Pre-approved mover/cleaner short-lists for settlement day <br>• Collated ID docs for 100-point checks                                                                                                                                                                             |

---

## 2. During Purchase (Contract → Settlement)

| Theme                     | Agent-Powered Tasks                                                                                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Deal Milestones**       | • Visual timeline auto-generated from contract dates <br>• Reminder nudges: cooling-off, finance, building/pest, Section 32 review, FIRB (if relevant)                                  |
| **Document Management**   | • Secure upload & version control for contract, Form 1, special conditions <br>• AI summaries: “Key obligations & penalties in this contract” <br>• Clause-by-clause compliance checker |
| **Communication Hub**     | • One chat thread spanning buyer, agent, broker, conveyancer <br>• Auto-sync email/SMS into thread; action-item extraction                                                              |
| **Finance Finalisation**  | • Track loan application status; push missing-document checklist <br>• Compare lender’s final rate vs. market & suggest renegotiation language                                          |
| **Funds Flow**            | • Calculate settlement statement (deposit paid, adjustments, fees) <br>• Warn if shortfall likely; queue bank cheque or PEXA instructions                                               |
| **Risk Monitoring**       | • Alert if building/pest report flags major defect <br>• Flag unconditional risk before finance approved                                                                                |
| **Insurance & Utilities** | • Auto-quote building & contents insurance effective settlement day <br>• One-click electricity/gas/internet transfer                                                                   |
| **Legal & Compliance**    | • Verify VOI (Verification of Identity) requirements met <br>• Track discharge of vendor’s mortgage on title                                                                            |
| **Emotion & Support**     | • Explain arcane terms (“caveat”, “encumbrance”) in plain language <br>• Stress-reduction check-ins: “7 days until settlement—here’s what’s left”                                       |

---

## 3. Post-Purchase (Ownership, Optimisation, Growth)

| Theme                      | Agent-Powered Tasks                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Handover & Move-In**     | • Digital “settlement pack” with keys, warranties, appliance manuals <br>• Moving-day timeline & reminder list                                                                                             |
| **Property Admin**         | • Council & water rates calendar; auto-pay setup <br>• Maintenance scheduler (smoke alarms, gutters, termite checks) with service-provider suggestions                                                     |
| **Financial Optimisation** | • Monthly loan repayment monitor; alert when refinance could save >X% <br>• Equity tracker integrating latest CoreLogic valuation feeds <br>• Offset-account sweep rules (“move surplus >\$2 k to offset”) |
| **Tax & Reporting**        | • End-of-financial-year report with deductible interest, depreciation (if investment) <br>• CGT estimator for future sale scenarios                                                                        |
| **Insurance Review**       | • Annual cover comparison; detect under-insurance after renovations                                                                                                                                        |
| **Renovation & Value-Add** | • ROI calculator for kitchen, solar, granny-flat <br>• Permit-requirement checker & recommended tradies                                                                                                    |
| **Lifestyle Services**     | • Reminders to update driver’s licence / electoral roll address <br>• Local community onboarding (rubbish-collection days; “nearest dog park”)                                                             |
| **Portfolio Expansion**    | • Scenario planning: “What if I use \$120 k equity for 2nd investment?” <br>• Cash-flow modelling and linking to mortgage broker pipeline                                                                  |
| **Exit & Sell**            | • Market-timing alerts: “Suburb X median up 8 % YoY—time to list?” <br>• Pre-sale checklist and agent-matching just like the original buy flow                                                             |
| **Health & Happiness**     | • Carbon-footprint tracker for home energy use (green loans) <br>• Mood check-ins: “How’s the new place? Need a handyman?”                                                                                 |

---

### How This Maps to Your Agent Suite

| Phase           | Primary Agent(s)                 | Key Sub-agents / Workflows                         |
| --------------- | -------------------------------- | -------------------------------------------------- |
| Pre-Purchase    | BuyerAgent, FinanceAgent         | MarketIntelAgent, MatchAgent, RiskProfiler         |
| During Purchase | Orchestrator + ConveyancingAgent | ComplianceAgent, FundsFlowAgent, NotificationAgent |
| Post-Purchase   | OwnershipAgent                   | EquityAgent, MaintenanceScheduler, RefinanceScout  |

This exhaustive list should spark feature-prioritisation conversations: decide what belongs in MVP vs. v2, and which tasks can simply be “hand-off” (e.g., launch a partner webform) versus fully automated inside your Convex workflows.

2. What an AI-first consumer concierge actually does
   🔎 Pre-purchase
   Hyper-personalised discovery feed (“3-bed house, < 30 min to CBD, child-care rating ≥ 8”)

Deposit & stamp-duty planner, first-home grant eligibility wizard

Auto-summaries of strata, building & pest reports

Auction-bidding simulator and negotiation playbooks

📝 Contract-to-settlement
Real-time milestone tracker that pushes tasks to professionals:
“Your conveyancer hasn’t ordered searches—shall I nudge them?”

One-tap quotes and live chat with shortlisted conveyancers, brokers, inspectors

Settlement cost calculator + shortfall alerts

Insurance & utilities switch-over wizard

🏡 Post-purchase / Ownership
Live equity meter (CoreLogic or Domain AVM feed)

Refinance scout: alert when saving > A$2 000 p.a. is possible

Maintenance scheduler and tradie marketplace

Reno ROI calculator & DA / permit checker

Capital-gains and depreciation ledger for investors
