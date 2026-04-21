# draftduder

Realtime message feed — push from terminal, see on any device.

## Stack

- Bun runtime + package manager
- React 19, React Router 7, Vite
- TypeScript strict mode
- Supabase (Postgres + realtime websocket subscriptions)
- Biome for linting, Prettier for formatting
- Bun test + Testing Library + happy-dom
- Deployed on Vercel

## Commands

```bash
bun dev              # dev server
bun run push "msg"   # insert message from terminal
bun test             # run tests
bun run lint         # biome check
bun run lint:fix     # biome autofix
bun run format       # prettier
bun run build        # production build
```

## Structure

```
src/
  main.tsx            # entry point
  styles.css          # global styles
  App.tsx             # router + layout
  App.test.tsx        # tests
  lib/
    supabase.ts       # supabase client + Message type
  hooks/
    useMessages.ts    # realtime message subscription hook
  pages/
    Home.tsx          # / route — live message feed
    About.tsx         # /about route
scripts/
  push.ts             # CLI script to insert messages
```

## Environment

- `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (gitignored)
- `.env.example` has the template
- Same vars must be set in Vercel for production

## Conventions

- Functional components, named exports
- Biome for lint rules, Prettier for formatting (biome formatter disabled)
- Tests use bun:test + @testing-library/react + happy-dom
- Supabase anon key is a publishable key (safe for client-side)
