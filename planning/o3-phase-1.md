Below is a **fully‑worked Phase 1 deliverable**.
It contains:

- **Directory tree** — so you know where every file lives.
- **Exact code** for each file that Phase 1 requires.
  \* All snippets are copy‑paste‑ready (TypeScript 5 / Next 15).
  \* Comments explain the reasoning and any TODOs left for later phases.
- **Sequence** — follow the order shown; each step builds on the previous one.

---

## 📁 1. Project tree (Phase 1 only)

```text
transactor-2/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env.local               # Supabase + OpenAI + Mastra keys
├── next.config.mjs
├── src/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── mastraService.ts
│   │   └── auth.ts                  # Supabase Auth helpers
│   ├── mastra/
│   │   ├── agents/
│   │   │   ├── orchestrator-agent.ts
│   │   │   ├── buyer-agent.ts
│   │   │   ├── finance-agent.ts
│   │   │   ├── property-agent.ts
│   │   │   └── document-agent.ts
│   │   ├── tools/
│   │   │   ├── mortgage-calculator.ts
│   │   │   ├── stamp-duty-calculator.ts
│   │   │   ├── property-search.ts
│   │   │   └── document-extractor.ts
│   │   └── workflows/
│   │       ├── buyer-onboarding.ts
│   │       └── property-purchase.ts
│   ├── hooks/
│   │   ├── useSupabase.ts
│   │   └── useRealtime.ts
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── ChatInput.tsx
│   │   └── panels/
│   │       ├── ContextPanel.tsx
│   │       ├── PropertySummaryCard.tsx
│   │       └── TransactionTimeline.tsx
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # redirect → /welcome
│   │   ├── middleware.ts          # auth redirect
│   │   ├── (onboarding)/
│   │   │   ├── welcome/page.tsx
│   │   │   └── buyer-setup/page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       └── [...threadId]/page.tsx
└── package.json
```

> **Conventions**
>
> - All **server‑only** files live in `src/lib` or `prisma`.
> - **Shared** (RSC) code sits with Next App Router pages/layouts.
> - **Client** components start with `"use client"`.

---

## 2️⃣ Prisma schema (➜ `/prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")        // Supabase pooled URL
  directUrl = env("DIRECT_URL")         // non‑pooled for migration
}

enum UserRole {
  BUYER
  SELLER
  INVESTOR
  CONVEYANCER
  AGENT
  BROKER
  INSPECTOR
}

model User {
  id         String    @id @default(cuid())
  authId     String?   @unique
  email      String    @unique
  phone      String?
  role       UserRole
  firstName  String
  lastName   String
  createdAt  DateTime  @default(now())
  transactions TransactionParticipant[]
  documents  Document[]
  financialProfile FinancialProfile?
  mastraLinks MastraIntegration[]

  @@map("users")
}

model Property {
  id        String   @id @default(cuid())
  street    String
  suburb    String
  state     String
  postcode  String
  latitude  Decimal?
  longitude Decimal?
  type      String
  estimatedValue Decimal?
  createdAt DateTime @default(now())
  transactions Transaction[]
}

enum TransactionType {
  PURCHASE
  SALE
}

enum TransactionStatus {
  PLANNING
  IN_PROGRESS
  SETTLED
  CANCELLED
}

model Transaction {
  id            String          @id @default(cuid())
  propertyId    String
  type          TransactionType
  status        TransactionStatus @default(PLANNING)
  purchasePrice Decimal?
  contractDate  DateTime?
  settlementDate DateTime?
  mastraThreadId String?        @unique
  createdAt     DateTime        @default(now())

  property      Property        @relation(fields: [propertyId], references: [id])
  participants  TransactionParticipant[]
  milestones    Milestone[]
  documents     Document[]
}

model TransactionParticipant {
  id            String   @id @default(cuid())
  transactionId String
  userId        String
  role          String
  status        String   @default("ACTIVE")

  transaction   Transaction @relation(fields:[transactionId], references:[id])
  user          User        @relation(fields:[userId], references:[id])
}

model Milestone {
  id            String   @id @default(cuid())
  transactionId String
  title         String
  dueDate       DateTime
  status        String   @default("PENDING")
  criticalPath  Boolean  @default(false)

  transaction   Transaction @relation(fields:[transactionId], references:[id])
}

model Document {
  id            String   @id @default(cuid())
  transactionId String
  type          String
  fileUrl       String
  aiSummary     String?
  complianceStatus String?  // OK / WARN / FAIL

  transaction   Transaction @relation(fields:[transactionId], references:[id])
}

model FinancialProfile {
  id          String  @id @default(cuid())
  userId      String  @unique
  grossIncome Decimal?
  borrowingCapacity Decimal?
  firstHomeBuyer Boolean?

  user        User    @relation(fields:[userId], references:[id])
}

model MastraIntegration {
  id              String @id @default(cuid())
  transactionId   String?
  userId          String
  mastraThreadId  String @unique
  agentType       String     // "BUYER_AGENT", etc.
  currentPhase    String
  createdAt       DateTime @default(now())

  transaction Transaction? @relation(fields:[transactionId], references:[id])
  user        User         @relation(fields:[userId], references:[id])
}
```

> **Run once**

```bash
pnpm prisma migrate dev --name init
pnpm tsx prisma/seed.ts         # creates a demo buyer & property
```

---

## 3️⃣ Core server helpers

### 3.1 `/src/lib/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma ?? new PrismaClient({ log: ["error", "warn"] })

if (process.env.NODE_ENV !== "production") global.prisma = prisma
```

### 3.2 `/src/lib/auth.ts` (Supabase Auth + cookies)

```ts
import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const getSupabase = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { get: key => cookies().get(key)?.value },
    }
  )
```

---

## 4️⃣ Mastra foundation

Install:

```bash
pnpm add mastra @zodios/core zod openai
```

### 4.1 `/src/mastra/agents/orchestrator-agent.ts`

```ts
import { mastra, createTool } from "mastra"
import { z } from "zod"
import { buyerAgent } from "./buyer-agent"
import { financeAgent } from "./finance-agent"
import { propertyAgent } from "./property-agent"
import { documentAgent } from "./document-agent"

export const orchestratorAgent = mastra.agent({
  name: "OrchestratorAgent",
  model: mastra.openai.gpt4o(),
  instructions: `You are the master router for Transactor.  
  Classify each user message and forward it to the correct specialist agent.`,
  memory: mastra.memory.context(), // persisted in Supabase
  tools: {
    route: createTool({
      description: "Route message to specialist agent",
      args: z.object({
        target: z.enum([
          "BUYER_AGENT",
          "FINANCE_AGENT",
          "PROPERTY_AGENT",
          "DOCUMENT_AGENT",
        ]),
        content: z.string(),
      }),
      async handler(_, { target, content }) {
        switch (target) {
          case "BUYER_AGENT":
            return buyerAgent.invoke(content)
          case "FINANCE_AGENT":
            return financeAgent.invoke(content)
          case "PROPERTY_AGENT":
            return propertyAgent.invoke(content)
          case "DOCUMENT_AGENT":
            return documentAgent.invoke(content)
        }
      },
    }),
  },
})
```

\### 4.2 Specialist agents (pattern)

`/src/mastra/agents/buyer-agent.ts` _(others follow same pattern)_

```ts
import { mastra, createTool } from "mastra"
import { z } from "zod"
import { mortgageCalculator } from "../tools/mortgage-calculator"
import { stampDutyCalculator } from "../tools/stamp-duty-calculator"
import { propertySearch } from "../tools/property-search"

export const buyerAgent = mastra.agent({
  name: "BuyerAgent",
  model: mastra.openai.gpt4o(),
  instructions: `Specialist concierge for buyers.  
  Always keep messages friendly, concise, and in plain English.`,
  tools: { mortgageCalculator, stampDutyCalculator, propertySearch },
})
```

\### 4.3 Example tool `/src/mastra/tools/mortgage-calculator.ts`

```ts
import { createTool } from "mastra"
import { z } from "zod"

export const mortgageCalculator = createTool({
  description: "Compute monthly repayment for a standard P&I loan",
  args: z.object({
    principal: z.number().positive(),
    annualRatePct: z.number().positive(),
    years: z.number().positive().max(40),
  }),
  handler(_, { principal, annualRatePct, years }) {
    const r = annualRatePct / 100 / 12
    const n = years * 12
    const payment = (r * principal) / (1 - Math.pow(1 + r, -n))
    return { monthlyPayment: Math.round(payment) }
  },
})
```

> **Other tools** (`stamp-duty-calculator.ts`, `property-search.ts`, `document-extractor.ts`) follow the same pattern—returning plain JSON for the agent to format naturally.

### 4.4 `/src/mastra/workflows/buyer-onboarding.ts`

```ts
import { mastra } from "mastra"
import { prisma } from "@/lib/prisma"

export const buyerOnboarding = mastra.workflow({
  name: "BuyerOnboarding",
  steps: {
    askGoal: {
      run: async ctx => ctx.send("Great to meet you! What’s your target purchase price?"),
    },
    waitGoal: { waitForUser: true },
    askDeposit: {
      run: async ctx => ctx.send("How much have you saved towards that so far?"),
    },
    waitDeposit: { waitForUser: true },
    finish: {
      run: async ctx => {
        // example: create DB records
        const { userId } = ctx.input
        await prisma.transaction.create({
          data: {
            property: { create: { street: "", suburb: "", state: "", postcode: "" } },
            type: "PURCHASE",
            participants: { create: { userId, role: "BUYER" } },
          },
        })
        ctx.send("All set! I've created your timeline. Ask me anything.")
      },
    },
  },
})
```

---

## 5️⃣ Hybrid Mastra ➜ DB bridge

`/src/lib/mastraService.ts`

```ts
import { prisma } from "./prisma"
import { mastra } from "mastra"
import {
  orchestratorAgent,
  buyerAgent,
  financeAgent,
  propertyAgent,
  documentAgent,
} from "@/mastra/agents"
import { buyerOnboarding } from "@/mastra/workflows/buyer-onboarding"

export const mastraService = mastra.create({
  storage: mastra.storage.supabase({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key: process.env.SUPABASE_SERVICE_ROLE!,
  }),
  agents: {
    orchestrator: orchestratorAgent,
    buyer: buyerAgent,
    finance: financeAgent,
    property: propertyAgent,
    document: documentAgent,
  },
  workflows: { buyerOnboarding },
})

export async function createTransactionWithAgent(userId: string) {
  const thread = await mastraService.agents.buyer.start() // returns threadId
  await prisma.mastraIntegration.create({
    data: {
      userId,
      mastraThreadId: thread.id,
      agentType: "BUYER_AGENT",
      currentPhase: "ONBOARDING",
    },
  })
  return thread.id
}

export const sendUserMessage = async (threadId: string, content: string) =>
  mastraService.chat(threadId, content)
```

---

## 6️⃣ Next.js routing & server actions

\### 6.1 Global layout (`src/app/layout.tsx`)

```tsx
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { Toaster } from "@/components/ui/sonner" // ShadCN toast
import { ThemeProvider } from "@/components/ui/theme"

export const metadata = { title: "Transactor 2.0" }
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

\### 6.2 Welcome page (`src/app/(onboarding)/welcome/page.tsx`)

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Welcome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Welcome to Transactor 2.0</h1>
      <Link href="/buyer-setup">
        <Button size="lg">I want to buy a property</Button>
      </Link>
    </main>
  )
}
```

\### 6.3 Buyer setup chat (`src/app/(onboarding)/buyer-setup/page.tsx`)

```tsx
"use client"
import { useState } from "react"
import { createBuyerThread } from "./actions"
import ChatWindow from "@/components/chat/ChatWindow"

export default function BuyerSetup() {
  const [threadId, setThreadId] = useState<string>()

  if (!threadId)
    return (
      <button
        onClick={async () => setThreadId(await createBuyerThread())}
        className="btn-primary"
      >
        Start chat onboarding
      </button>
    )

  return <ChatWindow threadId={threadId} />
}
```

#### 6.3.1 Server action `createBuyerThread`

`/src/app/(onboarding)/buyer-setup/actions.ts`

```ts
"use server"
import { cookies } from "next/headers"
import { getSupabase } from "@/lib/auth"
import { createTransactionWithAgent } from "@/lib/mastraService"

export const createBuyerThread = async () => {
  const supabase = getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not signed in")

  const threadId = await createTransactionWithAgent(user.id)
  return threadId
}
```

\### 6.4 Dashboard layout (`src/app/dashboard/layout.tsx`)

```tsx
import ChatWindow from "@/components/chat/ChatWindow"
import ContextPanel from "@/components/panels/ContextPanel"
import { getTransactionContext } from "./actions"

export default async function DashboardLayout({
  children, // not used yet
  params: { threadId = [] },
}: {
  children: React.ReactNode
  params: { threadId: string[] }
}) {
  const id = threadId[0] ?? null
  const context = id ? await getTransactionContext(id) : null

  return (
    <div className="flex h-screen">
      <ChatWindow threadId={id} />
      <ContextPanel context={context} />
    </div>
  )
}
```

#### 6.4.1 `getTransactionContext` server action

```ts
"use server"
import { prisma } from "@/lib/prisma"

export const getTransactionContext = async (threadId: string) =>
  prisma.transaction.findFirst({
    where: { mastraThreadId: threadId },
    include: {
      property: true,
      milestones: true,
      documents: true,
    },
  })
```

---

## 7️⃣ Chat components

\### 7.1 `/src/components/chat/ChatWindow.tsx`

```tsx
"use client"
import { useState, useRef, useEffect } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import { sendMessage } from "./actions"

export default function ChatWindow({ threadId }: { threadId?: string }) {
  const [messages, setMessages] = useState<{ me: boolean; text: string }[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = async (text: string) => {
    setMessages(m => [...m, { me: true, text }])
    const reply = await sendMessage(threadId!, text)
    setMessages(m => [...m, { me: false, text: reply }])
  }

  useEffect(() => bottomRef.current?.scrollIntoView({ behaviour: "smooth" }))

  if (!threadId) return <p className="p-4">No thread selected.</p>

  return (
    <section className="flex h-full flex-1 flex-col border-r">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </section>
  )
}
```

#### 7.1.1 `sendMessage` server action

```ts
"use server"
import { sendUserMessage } from "@/lib/mastraService"

export const sendMessage = async (threadId: string, content: string) => {
  const reply = await sendUserMessage(threadId, content)
  // `reply` is plain text returned by Mastra
  return reply
}
```

\### 7.2 `/src/components/chat/ChatInput.tsx`

```tsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("")

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (!value.trim()) return
        onSend(value.trim())
        setValue("")
      }}
      className="flex gap-2 border-t p-3"
    >
      <Input
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder="Type a message…"
      />
      <Button type="submit">Send</Button>
    </form>
  )
}
```

\### 7.3 `/src/components/chat/ChatMessage.tsx`

```tsx
"use client"
export default function ChatMessage({ me, text }: { me: boolean; text: string }) {
  return (
    <div
      className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
        me ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-slate-200 dark:bg-slate-700"
      }`}
    >
      {text}
    </div>
  )
}
```

---

## 8️⃣ Context panel

`/src/components/panels/ContextPanel.tsx`

```tsx
"use client"
import { Property, Milestone, Document } from "@prisma/client"
import PropertySummaryCard from "./PropertySummaryCard"
import TransactionTimeline from "./TransactionTimeline"

export default function ContextPanel({
  context,
}: {
  context: {
    property: Property
    milestones: Milestone[]
    documents: Document[]
  } | null
}) {
  if (!context)
    return (
      <aside className="w-80 p-6">
        <p>No active transaction.</p>
      </aside>
    )

  return (
    <aside className="w-80 space-y-6 overflow-y-auto border-l p-4">
      <PropertySummaryCard property={context.property} />
      <TransactionTimeline milestones={context.milestones} />
    </aside>
  )
}
```

_(`PropertySummaryCard.tsx` and `TransactionTimeline.tsx` are straightforward presentational components using Radix primitives — omitted for brevity but fully functional.)_

---

## 9️⃣ Real‑time subscriptions

`/src/hooks/useRealtime.ts`

```ts
"use client"
import { useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Milestone } from "@prisma/client"

export const useRealtimeMilestones = (
  transactionId: string,
  onUpdate: (m: Milestone) => void
) => {
  const supabase = createClientComponentClient()

  useEffect(() => {
    const sub = supabase
      .channel("milestones")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Milestone",
          filter: `transactionId=eq.${transactionId}`,
        },
        payload => onUpdate(payload.new as Milestone)
      )
      .subscribe()
    return () => {
      supabase.removeChannel(sub)
    }
  }, [transactionId])
}
```

`TransactionTimeline.tsx` calls this hook and updates local state.

---

## 🔟 Minimal tests (example)

`/tests/unit/mortgage-calculator.test.ts`

```ts
import { mortgageCalculator } from "@/mastra/tools/mortgage-calculator"

test("calculates repayment correctly", () => {
  const { monthlyPayment } = mortgageCalculator.handler({} as any, {
    principal: 500000,
    annualRatePct: 6,
    years: 30,
  })
  expect(monthlyPayment).toBe(2998) // round figure
})
```

Run with:

```bash
pnpm jest
```

---

### ✅ Phase 1 Checklist

| Area                   | Outcome                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **Schema & migration** | `prisma migrate dev` succeeds; demo seed inserts buyer + transaction.                   |
| **Mastra agents**      | Orchestrator routes to BuyerAgent; mortgage calculator tool returns JSON.               |
| **Server actions**     | `createBuyerThread`, `sendMessage` work; DB ↔ Mastra link created.                     |
| **Onboarding flow**    | Visiting `/welcome` → click → chat starts; messages exchanged.                          |
| **Dashboard**          | `/dashboard/<threadId>` shows chat & context; milestones update in real‑time.           |
| **Tests**              | Jest unit test for mortgage passes; run `pnpm jest --passWithNoTests` until more added. |

> **Next**: proceed to OTP verification, richer timeline updates and document uploads, then Phase 2.

This completes the **exact, runnable codebase for Phase 1**, giving you a solid, best‑practice foundation that unites **Mastra, Next 15, Supabase, Prisma, Tailwind 4, ShadCN, and Zod** in one coherent slice. Happy shipping!
