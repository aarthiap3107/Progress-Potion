# ⚡ Progress Potion

A personal life management and productivity app built with a magical Harry Potter theme. Track habits, log moods, journal thoughts, set goals, and monitor your progress — all in one beautifully crafted dark-themed app.

---

## Features

- **Great Hall (Dashboard)** — Daily quote, habit streaks, today's tasks, mood snapshot, and a Journal Your Thoughts box
- **Daily Spells** — Morning and evening routine tracker with done/missed cycling
- **Potions** — Health log: fruits, water intake, junk food, meal quality
- **Dormitory** — Sleep tracker with history, edit and delete support
- **Free Period** — Hobby/activity logger with duration and mood
- **Journal** — Full journal with create, edit, and delete entries
- **Divination** — Mood tracker with 7-day history
- **Goals** — Weekly goal setting with past goal archive
- **Focus (Pomodoro)** — 25/5/15 minute timer with session counter
- **Progress** — Analytics with heatmap, charts, and LeetCode-style Recent Activity log

---

## Tech Stack

- React + TypeScript + Vite
- Supabase (Auth + Database)
- PWA (installable on mobile)

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/aarthiap3107/Progress-Potion.git
cd Progress-Potion
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Supabase
- Create a project at [supabase.com](https://supabase.com)
- Enable Email/Password auth
- Run this SQL in the SQL Editor:

```sql
create table user_data (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  key text not null,
  value text not null,
  updated_at timestamptz default now(),
  constraint user_data_user_key unique (user_id, key)
);

alter table user_data enable row level security;

create policy "Users can manage their own data"
  on user_data for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 4. Add environment variables
Create a `.env` file in the root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Run locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — your potion is ready to brew! 🧪⚡

---

## Live Demo

[progress-potion-h347.vercel.app](https://progress-potion-h347.vercel.app)
