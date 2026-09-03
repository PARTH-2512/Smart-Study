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

## 4) Create database table + policy

In Supabase dashboard:

1. Open **SQL Editor**.
2. Click **New query**.
3. Run this SQL:

```sql
create table study_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  question text not null,
  raw_answer text not null,
  easy_points jsonb,
  important_points jsonb,
  flashcards jsonb,
  flowchart_mermaid text
);

alter table study_sessions enable row level security;

create policy "Allow all" on study_sessions
  for all using (true) with check (true);
```

4. Confirm table is visible in **Table Editor** as `study_sessions`.

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

1. Enter a study **Question**.
2. Paste a long **Answer**.
3. Click **Transform 🚀**.
4. Review generated tabs:
   - Easy Points
   - Important Points
   - Flashcards
   - Flowchart
5. Check **Recent Sessions** to reload previous results from Supabase.

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

