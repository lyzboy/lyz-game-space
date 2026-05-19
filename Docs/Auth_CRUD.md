# Admin Auth & CRUD Implementation Guide

## Overview

This document covers three implementation phases for the lyz-game-space project:

1. Setting up Auth.js with OAuth (Google + GitHub) and protecting routes/components
2. Implementing inline Edit and Delete for Focuses and Entries on content pages
3. Adding a quick-access "Add Entry" floating button on Focus detail pages

The existing stack is **Next.js App Router + Prisma + PostgreSQL**. Auth.js v5 (beta, also called NextAuth v5) is designed natively for this setup and is the library being used throughout.

***

## Part 1 — Auth.js + OAuth Setup

### 1.1 Install Dependencies

```bash
pnpm add next-auth@beta @auth/prisma-adapter
```

- `next-auth@beta` — Auth.js v5, the App Router-native version
- `@auth/prisma-adapter` — official adapter that handles creating User, Account, and Session tables via Prisma

> **Docs:** https://authjs.dev/getting-started/installation?framework=next.js

***

### 1.2 Update the Prisma Schema

The Prisma adapter requires specific models to be present in `schema.prisma`. Add the following models and update the existing ones to include the required relations. Also add a `Role` enum and attach it to the `User` model.

The required Auth.js models are `User`, `Account`, `Session`, and `VerificationToken`. The full schema additions can be copied directly from the adapter docs:

> **Prisma Adapter Schema Docs:** https://authjs.dev/getting-started/adapters/prisma#schema

Key addition on top of the generated schema — add a `role` field to `User`:

```prisma
enum Role {
  ADMIN
  MEMBER
}

model User {
  // ...all Auth.js required fields...
  role Role @default(MEMBER)
}
```

After updating the schema, run:

```bash
npx prisma migrate dev --name add-auth-and-roles
npx prisma generate
```

***

### 1.3 Create the Auth Config

Create `auth.ts` at the **project root** (alongside `package.json`):

```ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma" // adjust to actual prisma client path

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role  // expose role to session
      return session
    },
  },
})
```

The `callbacks.session` function is what makes the `role` field available on the client session object — without it, role would be silently dropped.

> **Docs:** https://authjs.dev/getting-started/installation?framework=next.js#configure

***

### 1.4 Add the API Route Handler

Create `app/api/auth/[...nextauth]/route.ts`:

```ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

This single file handles all OAuth callback routing automatically.

***

### 1.5 Set Up OAuth App Credentials

Register OAuth apps in both provider dashboards and add the credentials to `.env`:

```env
AUTH_SECRET=<generate with: npx auth secret>
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_CLIENT_ID=
AUTH_GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

**GitHub OAuth App:** https://github.com/settings/developers  
Set callback URL to: `http://localhost:3000/api/auth/callback/github`

**Google OAuth App:** https://console.cloud.google.com/apis/credentials  
Set callback URL to: `http://localhost:3000/api/auth/callback/google`

> **Provider setup docs:** https://authjs.dev/getting-started/providers/github and https://authjs.dev/getting-started/providers/google

***

### 1.6 Extend the Session Type

Auth.js TypeScript types don't include `role` by default. Create or update `types/next-auth.d.ts`:

```ts
import { Role } from "@/app/generated/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      role: Role
    } & DefaultSession["user"]
  }

  interface User {
    role: Role
  }
}
```

> **Docs:** https://authjs.dev/getting-started/typescript

***

### 1.7 Protect Routes with Middleware

Create `middleware.ts` at the **project root**:

```ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  const role = req.auth?.user?.role

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }
})

export const config = {
  matcher: ["/admin/:path*"],
}
```

This protects all `/admin/*` routes at the edge — unauthenticated or non-admin users are redirected to the homepage before the page ever renders.

> **Middleware docs:** https://authjs.dev/getting-started/session-management/protecting?framework=next.js#nextjs-middleware

***

### 1.8 Seed the Admin Role

After the first OAuth login with the personal Google or GitHub account, the `User` row will exist in the database with `role = MEMBER` (the default). Manually update it once:

```bash
npx prisma studio
```

Find the User record and change `role` to `ADMIN`. Alternatively, add a one-time seed helper. This only needs to be done once — the role persists in the database.

***

### 1.9 Sign In / Sign Out UI

Add sign in and sign out buttons to `NavBar.tsx`. These use Auth.js Server Actions directly:

```ts
import { signIn, signOut } from "@/auth"

// Sign in button (Server Component)
<form action={async () => { "use server"; await signIn("github") }}>
  <button type="submit">Sign in with GitHub</button>
</form>

// Sign out button
<form action={async () => { "use server"; await signOut() }}>
  <button type="submit">Sign out</button>
</form>
```

For showing/hiding these based on session state in a Server Component, use `auth()` directly:

```ts
import { auth } from "@/auth"

const session = await auth()
if (session) { /* show sign out */ } else { /* show sign in */ }
```

> **Docs:** https://authjs.dev/getting-started/session-management/login

***

### 1.10 Protecting Rendered Components (Admin-Only UI)

In **Server Components**, check the session directly:

```ts
import { auth } from "@/auth"

const session = await auth()
const isAdmin = session?.user?.role === "ADMIN"

// Conditionally render admin controls
{isAdmin && <AdminControls focusId={focus.id} />}
```

In **Client Components**, use the `useSession` hook:

```ts
"use client"
import { useSession } from "next-auth/react"

const { data: session } = useSession()
const isAdmin = session?.user?.role === "ADMIN"
```

Wrap the app with `SessionProvider` in `layout.tsx` to enable the hook — or pass session data down as a prop from a Server Component parent to avoid the provider overhead.

> **Session docs:** https://authjs.dev/getting-started/session-management/get-session

***

## Part 2 — Inline Edit & Delete on Content Pages

### 2.1 The Pattern

When logged in as admin, each Focus detail page (`/focuses/[id]`) and each Entry card shows a small button group. The **Delete** button triggers a server action with a confirmation step. The **Edit** button replaces the rendered content with an inline form, in place, without any page navigation.

The visibility of these controls is determined server-side — the admin button group is only included in the rendered HTML when the session role is `ADMIN`.

***

### 2.2 Focus-Level Controls (`/focuses/[id]`)

On the Focus detail page, check the session and conditionally render an `AdminFocusControls` component in the top-right of the Focus header area:

```ts
// app/focuses/[id]/page.tsx (Server Component)
import { auth } from "@/auth"

const session = await auth()
const isAdmin = session?.user?.role === "ADMIN"

// In JSX:
<div className="relative">
  <FocusHeader focus={focus} />
  {isAdmin && <AdminFocusControls focusId={focus.id} focus={focus} />}
</div>
```

`AdminFocusControls` is a Client Component that manages the `isEditing` toggle state:

```ts
"use client"
// Shows: Edit button + Delete button (with confirm)
// When isEditing === true: renders the FocusEditForm inline instead of the header
```

The **Delete** action should use a shadcn `AlertDialog` for the confirmation step rather than a plain `window.confirm` — it's accessible and stays within the app's visual style.

> **shadcn AlertDialog:** https://ui.shadcn.com/docs/components/alert-dialog

The **Edit** form replaces the content in place. On submit, it calls a Server Action to update the record and then calls `router.refresh()` to re-fetch the updated server data.

> **Next.js Server Actions:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

***

### 2.3 Entry-Level Controls (within Focus detail page)

Each Entry card rendered inside the Focus detail page gets the same two-button treatment when the session is admin. Since the Focus detail page is already a Server Component with the session available, pass `isAdmin` down as a prop to the Entry card components:

```ts
<EntryCard entry={entry} isAdmin={isAdmin} />
```

`EntryCard` stays a Server Component. When `isAdmin` is true, it renders a Client Component wrapper (`AdminEntryControls`) that handles the `isEditing` toggle and delete confirmation.

The inline edit form for an entry replaces the card content. On successful submission (Server Action + `router.refresh()`), the form closes and the updated card data re-renders.

***

### 2.4 Server Actions for Update and Delete

Create a dedicated actions file, e.g. `app/lib/actions/focusActions.ts` and `app/lib/actions/entryActions.ts`. Each action must verify admin role server-side — **never rely solely on the UI being hidden**:

```ts
"use server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateFocus(id: number, data: FocusUpdateInput) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

  await prisma.focus.update({ where: { id }, data })
  revalidatePath(`/focuses/${id}`)
}

export async function deleteFocus(id: number) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

  await prisma.focus.delete({ where: { id } })
  revalidatePath("/focuses")
  // also redirect after deletion
}
```

The `revalidatePath` call invalidates the Next.js cache for the affected route so the updated data is shown immediately without a full page reload.

> **revalidatePath docs:** https://nextjs.org/docs/app/api-reference/functions/revalidatePath  
> **Server Actions security:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security

***

### 2.5 Inline Edit Form — shadcn Sheet Option

For the Focus edit specifically (more fields), a shadcn `Sheet` (slide-in panel from the right) is cleaner than expanding in place, since it gives more form space without pushing the page content around:

```ts
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
```

For Entry edits (shorter content), a simple in-place expand is sufficient — the card grows to show the form fields, with a Save and Cancel button. No Sheet needed.

> **shadcn Sheet docs:** https://ui.shadcn.com/docs/components/sheet

***

## Part 3 — Quick "Add Entry" Button on Focus Pages

### 3.1 The Pattern

On every Focus detail page (`/focuses/[id]`), a floating action button (FAB) is fixed to the bottom-right corner of the viewport — but **only when logged in as admin**. Pressing it opens a shadcn Sheet or Dialog containing the existing entry creation form, pre-populated with the current `focusId`.

This removes all navigation friction for the most frequent admin action — logging a new entry or aha moment.

***

### 3.2 Implementation

The FAB is a Client Component (needs `useState` for the Sheet open/close state). It receives `focusId` and `isAdmin` as props from the Server Component page:

```ts
// Floating button — fixed position, bottom-right
// Only rendered when isAdmin === true

"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import EntryForm from "@/app/ui/components/EntryForm" // existing form

export default function AddEntryFAB({ focusId }: { focusId: number }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 ..."
        aria-label="Add new entry"
      >
        + Add Entry
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>New Entry</SheetTitle>
          </SheetHeader>
          <EntryForm focusId={focusId} onSuccess={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}
```

In `app/focuses/[id]/page.tsx`, add at the bottom of the JSX:

```ts
{isAdmin && <AddEntryFAB focusId={focus.id} />}
```

After the form's Server Action completes, call both `revalidatePath(`/focuses/${focusId}`)` (to refresh the entry list) and trigger the `onSuccess` callback to close the Sheet.

> **shadcn Sheet:** https://ui.shadcn.com/docs/components/sheet  
> **shadcn Dialog (alternative):** https://ui.shadcn.com/docs/components/dialog

***

### 3.3 Styling the FAB

The button should be visually prominent but not intrusive. A good approach using existing Tailwind classes:

```
fixed bottom-8 right-8 z-50
rounded-full px-5 py-3
bg-primary text-primary-foreground
shadow-lg hover:shadow-xl
transition-all duration-200
flex items-center gap-2
```

Consider adding a `+` icon from the existing `material-symbols` package already installed in the project — `<span className="material-symbols-outlined">add</span>`.

***

## Reference Links Summary

| Topic | URL |
|-------|-----|
| Auth.js v5 Installation | https://authjs.dev/getting-started/installation?framework=next.js |
| Prisma Adapter Schema | https://authjs.dev/getting-started/adapters/prisma |
| Auth.js TypeScript | https://authjs.dev/getting-started/typescript |
| Route Protection / Middleware | https://authjs.dev/getting-started/session-management/protecting |
| Session Management | https://authjs.dev/getting-started/session-management/get-session |
| GitHub Provider Setup | https://authjs.dev/getting-started/providers/github |
| Google Provider Setup | https://authjs.dev/getting-started/providers/google |
| Next.js Server Actions | https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations |
| revalidatePath | https://nextjs.org/docs/app/api-reference/functions/revalidatePath |
| shadcn AlertDialog | https://ui.shadcn.com/docs/components/alert-dialog |
| shadcn Sheet | https://ui.shadcn.com/docs/components/sheet |
| shadcn Dialog | https://ui.shadcn.com/docs/components/dialog |