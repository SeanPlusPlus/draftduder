# draftduder

Push messages from your terminal. See them appear in realtime on any device.

## Stack

- **Runtime:** Bun
- **Framework:** React 19 + React Router 7
- **Build:** Vite
- **Language:** TypeScript (strict)
- **Realtime DB:** Supabase (Postgres + websocket subscriptions)
- **Lint:** Biome
- **Format:** Prettier
- **Test:** Bun test + Testing Library + happy-dom
- **Hosting:** Vercel

## Getting Started

```bash
bun install
cp .env.example .env   # fill in your Supabase creds
bun dev
```

Open [http://localhost:5173](http://localhost:5173).

## Push a Message

```bash
bun run push "hello from the terminal"
```

Anyone with the site open sees it instantly.

## Scripts

| Command | What it does |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun run build` | Production build |
| `bun run push "msg"` | Insert a message from terminal |
| `bun test` | Run tests |
| `bun run lint` | Biome lint check |
| `bun run format` | Prettier format |

## Routes

| Path | Page |
|------|------|
| `/` | Live message feed |
| `/about` | About |

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run this SQL in the SQL Editor:

```sql
create table messages (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  created_at timestamptz default now()
);

alter table messages enable row level security;
create policy "Anyone can read" on messages for select using (true);
create policy "Anyone can insert" on messages for insert with check (true);
alter publication supabase_realtime add table messages;
```

3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env` and Vercel env vars
