-- Smart Study Transformer: Auth + Subject/Chapter organization
-- Run this in Supabase SQL Editor. Safe to run on a fresh project.
-- If you already ran the old README SQL (a bare study_sessions table with
-- an "Allow all" policy), this migration upgrades it in place.

-- 1) Subjects (top level, owned by a user)
create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

-- 2) Chapters (belong to a subject, owned by a user)
create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (subject_id, name)
);

-- 3) study_sessions: create if missing, otherwise upgrade existing table
create table if not exists study_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  question text not null,
  raw_answer text not null,
  easy_points jsonb,
  important_points jsonb,
  flashcards jsonb,
  flowchart_mermaid text
);

alter table study_sessions
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table study_sessions
  add column if not exists chapter_id uuid references chapters(id) on delete set null;

-- 4) Row Level Security: every user only sees/edits their own rows
alter table subjects enable row level security;
alter table chapters enable row level security;
alter table study_sessions enable row level security;

-- Remove the old wide-open policy from the previous version of this project
drop policy if exists "Allow all" on study_sessions;

drop policy if exists "Users manage own subjects" on subjects;
create policy "Users manage own subjects" on subjects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own chapters" on chapters;
create policy "Users manage own chapters" on chapters
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own sessions" on study_sessions;
create policy "Users manage own sessions" on study_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 5) Helpful indexes
create index if not exists idx_chapters_subject_id on chapters(subject_id);
create index if not exists idx_sessions_chapter_id on study_sessions(chapter_id);
create index if not exists idx_sessions_user_id on study_sessions(user_id);

-- NOTE: If you have existing rows in study_sessions from before this
-- migration, they will have a null user_id/chapter_id and become invisible
-- once RLS is enabled (since they don't belong to any user). Either delete
-- them or manually backfill user_id for rows you want to keep:
--   update study_sessions set user_id = '<your-auth-user-id>' where user_id is null;
