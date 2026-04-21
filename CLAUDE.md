# draftduder

Dead simple React + TypeScript hello world app.

## Stack

- Bun runtime + package manager
- React 19, React Router 7, Vite
- TypeScript strict mode
- Biome for linting, Prettier for formatting
- Bun test + Testing Library + happy-dom

## Commands

```bash
bun dev          # dev server
bun test         # run tests
bun run lint     # biome check
bun run lint:fix # biome autofix
bun run format   # prettier
bun run build    # production build
```

## Structure

```
src/
  main.tsx        # entry point
  App.tsx         # router + layout
  App.test.tsx    # tests
  pages/
    Home.tsx      # / route
    About.tsx     # /about route
```

## Conventions

- Functional components, named exports
- Biome for lint rules, Prettier for formatting (biome formatter disabled)
- Tests use bun:test + @testing-library/react + happy-dom
