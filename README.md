# Smart Study Transformer

A React + Supabase web app that converts long study answers into:
- Easy bullet points
- Important exam points
- Flashcards
- Mermaid flowcharts

The app uses Google's Gemini API through the Express backend and saves every session in Supabase.

---

## 1) Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- A Supabase account
- A Gemini API key

---

## 2) Install and run locally

From the project root:

```bash
npm install
npm run dev
```
#Server  firsts terminal

npm run server
Open:

- `http://localhost:5173`

For production build test:

```bash
npm run build
npm run preview
```

---

## 3) Create Supabase project (step-by-step)

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**. 
3. Choose organization, set:
   - Project name (example: `smart-study-transformer`)
   - Database password (save it safely)
   - Region
4. Wait until the project is fully provisioned.

Then get API credentials:

1. Open your project dashboard.
2. Go to **Project Settings** > **API**.
3. Copy:
   - **Project URL** -> use as `VITE_SUPABASE_URL`
   - **anon public key** -> use as `VITE_SUPABASE_ANON_KEY`

---

## 4) Create database tables + policies

In Supabase dashboard:

1. Open **SQL Editor**.
2. Click **New query**.
3. Paste and run the contents of [`supabase/migration.sql`](./supabase/migration.sql).

This creates three tables, each locked down with Row Level Security so a user
can only ever see their own data:

- `subjects` — top-level subject a user creates (e.g. "Physics")
- `chapters` — belongs to a subject (e.g. "Thermodynamics")
- `study_sessions` — one transformed question, tagged with `user_id` and
  `chapter_id`

If you previously ran the old version of this SQL (a single `study_sessions`
table with an "Allow all" policy), running the migration will upgrade it in
place — it adds the missing columns/tables and replaces the open policy with
per-user policies. See the note at the bottom of the migration file about
backfilling `user_id` on any pre-existing rows.

4. Confirm the tables are visible in **Table Editor**: `subjects`, `chapters`,
   `study_sessions`.

### Enable email/password auth

Supabase projects have email/password sign-in enabled by default under
**Authentication** > **Providers** > **Email**. If you want to skip email
confirmation while testing locally, you can turn off "Confirm email" there —
otherwise new users need to click the confirmation link sent to their inbox
before they can sign in.

---

## 5) Setup `.env.local`

Create/update `.env.local` in project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

`GEMINI_API_KEY` is read only by the Express backend. Never prefix it with `VITE_`, because Vite exposes `VITE_` variables to the browser.

After editing env values, restart dev server:

```bash
npm run dev
npm run server
```

---

## 6) How to use the app

1. **Sign up** with an email and password (or sign in if you already have an
   account).
2. You'll land on **Your Subjects** — a grid of subject cards. Click one to
   open it, or use the dashed **+ New Subject** card to create one.
3. Inside a subject, pick a **Chapter** card (or create a new one). Each card
   shows how many questions are saved inside it.
4. Inside a chapter, you get the actual workspace:
   - Enter a **Question**
   - Paste a long **Answer**
   - Click **Transform 🚀**
   - Review the generated tabs (Easy Points / Important Points / Flashcards
     / Flowchart)
   - Below that, **Questions in this chapter** lists everything saved here —
     click any of them to reload it
5. Use the breadcrumb at the top (Subjects / Subject / Chapter) to jump back
   up a level at any time.

---

## 7) Common issues and fixes

- **AI response parsing failed**
  - Gemini returned content that was not valid JSON. Try the request again.
- **Network/API errors**
  - Recheck `GEMINI_API_KEY` and `GEMINI_MODEL` in the backend environment.
- **Supabase insert/fetch fails**
  - Verify `study_sessions` table exists.
  - Verify RLS policy is created.
  - Recheck URL and anon key.
- **Blank app / env not working**
  - Ensure env file name is exactly `.env.local`.
  - Restart dev server after env changes.

---

## 8) Tech stack

- React + Vite
- Tailwind CSS
- Supabase JS SDK
- Mermaid.js

---

## 9) Security note

`.env.local` should never be committed to git.  
This project already ignores local env files via `.gitignore` (`*.local`).

