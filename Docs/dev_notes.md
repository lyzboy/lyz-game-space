# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the course of development.

# **BUGS**

# Needed actions before merging to `main`

## 1. Lint and TypeScript cleanup (critical)

- Run:

  ```bash
  pnpm lint
  pnpm build
  ```

- Systematically clean up:
  - All **TypeScript errors** (anything that stops the build).
  - High‑value lint errors in:
    - `app/**`
    - `lib/**`
    - `auth.ts`
    - `prisma/seed.ts`
- You do **not** need to reach zero warnings immediately, but:
  - Fix obvious bugs (wrong types, unused imports/vars in core files).
  - Consider relaxing or disabling overly strict rules in `eslint.config.mjs` once you see consistent patterns.

---

# Docker / Compose architecture

## Current state

- **Dockerfile (multi‑stage)**

  - **Builder stage**:
    - Base: `node:22-slim`
    - `WORKDIR /app`
    - Enable pnpm with `corepack`.
    - Copy `package.json`, `pnpm-lock.yaml`, and host `node_modules`.
    - Copy the full project.
    - `ARG DATABASE_URL` + `ENV DATABASE_URL=${DATABASE_URL}` so Prisma/Next see the DB connection during build.
    - `ENV CI=true`
    - Run:

      ```bash
      pnpm prisma generate && pnpm build
      ```

  - **Runner stage**:
    - Base: `node:22-slim`
    - `WORKDIR /app`
    - Copy from builder:
      - `.next`
      - `public`
      - `package.json`
      - `node_modules`
      - `prisma/`
      - `prisma.config.ts`
    - `ENV NODE_ENV=production`
    - `EXPOSE 3000`
    - Entry command (via Dockerfile `CMD` or compose `command`):

      ```bash
      sh -c "npx prisma migrate deploy && node node_modules/next/dist/bin/next start -p 3000"
      ```

- **docker-compose.yml (baseline)**

  ```yaml
  services:
    web:
      build:
        context: .
        dockerfile: Dockerfile
        no_cache: true
        args:
          DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?schema=public
      image: til-next-test
      container_name: lyzgame-web
      environment:
        - HOSTNAME=0.0.0.0
        - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?schema=public
      ports:
        - "3004:3000"
      restart: always
      depends_on:
        - db

    db:
      container_name: lyzgame-db
      image: postgres:latest
      environment:
        - POSTGRES_DB=${POSTGRES_DB}
        - POSTGRES_USER=${POSTGRES_USER}
        - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      ports:
        - "5432:5432"
      restart: always
      volumes:
        - db-data:/var/lib/postgresql
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -d ${POSTGRES_DB} -U ${POSTGRES_USER}"]
        interval: 30s
        timeout: 60s
        retries: 5
        start_period: 80s

  volumes:
    db-data:
  ```

- `.env` (for Compose and local dev) defines:

  ```env
  POSTGRES_DB=til_app      # or lyz_game_test in earlier setup
  POSTGRES_USER=til_user
  POSTGRES_PASSWORD=til_secret

  # local dev only:
  DATABASE_URL="postgres://til_user:til_secret@localhost:5432/til_app?schema=public"
  ```

  Docker compose builds `DATABASE_URL` for containers from `POSTGRES_*` using the `db` hostname.

---

## Next steps for Docker / Compose

### 1. Split dev and prod compose configurations

- Keep `docker-compose.yml` as the **base** (shared settings).
- Add:

  - `docker-compose.dev.yml`:
    - Mirrors base, but:
      - Dev DB name (e.g. `til_app_dev`).
      - Dev ports (e.g., `3000:3000` instead of `3004:3000`).
      - Optional code mounts for live reload (if you later want Docker dev).
  - `docker-compose.prod.yml`:
    - Mirrors your current working setup:
      - `web` + `db` as in the baseline file.
      - DB credentials and `DATABASE_URL` matching the production-like environment.

- Use overrides:

  - Local prod‑like test:

    ```bash
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
    ```

  - Local dev:

    ```bash
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
    ```

### 2. Plan for true production DB location

- For a Dockerized DB (like current setup):
  - Keep `db` as the host in `DATABASE_URL` inside Compose.
- For an external DB on the server:
  - Set `DATABASE_URL` in the production environment to something like:

    ```text
    postgres://<prod_user>:<prod_pass>@<prod_db_host>:5432/<prod_db_name>?schema=public
    ```

  - Do **not** change application code; only change env.

### 3. (Optional, later) Install OpenSSL in images

- In both builder and runner stages (before Prisma commands):

  ```dockerfile
  RUN apt-get update -y && apt-get install -y openssl
  ```

- This removes Prisma’s libssl/openssl warnings and ensures compatibility with native query engines.

---

# Prisma responsibilities

## Build-time (builder stage)

- `pnpm prisma generate`:
  - Reads `prisma/schema.prisma` (via `prisma.config.ts` if configured).
  - Generates Prisma Client code into `node_modules/@prisma/client`.
  - No DB access.

## Runtime (web startup)

- `npx prisma migrate deploy`:
  - Reads `prisma/migrations/**` and applies pending migrations to the DB at `DATABASE_URL`.
  - Creates/updates tables for `User`, `Entry`, `Focus`, `Session`, etc.
- After migrations succeed:
  - `node node_modules/next/dist/bin/next start -p 3000` runs the Next.js server.

## Before merging / deploying

1. **Local migration sanity**

   - On host:

     ```bash
     pnpm prisma migrate dev
     pnpm prisma migrate status
     ```

   - Ensure the migration history in `prisma/migrations/**` matches the current schema and there are no dirty migrations.

2. **Containerized migration sanity**

   - From a clean state:

     ```bash
     docker compose down -v
     docker compose up --build
     ```

   - After `web` starts:
     - Connect into `web` or `db` and verify tables:

       ```bash
       docker exec -it lyzgame-web bash
       psql "postgres://til_user:til_secret@db:5432/til_app"
       til_app=# \dt
       ```

     - Confirm Prisma models appear as tables.

---

# Git / GitHub flow and release steps

## Before merging `feature-TIL-feed` into `main`

- Confirm locally:

  ```bash
  pnpm lint
  pnpm build
  docker compose up --build
  ```

- Validate:

  - No TypeScript errors.
  - Lint errors in core files are addressed.
  - `web` + `db` start without Prisma P1000/P1001 errors.
  - App is reachable at `http://localhost:<port>` and main flows (home, `/focuses`, auth flows) work in the container environment.

- In GitHub:

  - Use **Squash and Merge** for `feature-TIL-feed` → `main`.
  - Include a PR summary that notes:
    - Prisma client refactor to `@prisma/client`.
    - Docker multi-stage build + Compose for `web` + `db`.
    - Migration strategy (`npx prisma migrate deploy` on container startup).
    - Any pages marked as `dynamic = "force-dynamic"` to avoid DB calls during `next build`.

---

# Production server checklist

## On the server (high-level steps)

1. **Fetch code / images**

   - Pull latest from `main` and, if using a registry, pull the built image(s).

2. **Set environment variables on the server**

   - For DB:

     ```env
     POSTGRES_DB=<prod_db_name>
     POSTGRES_USER=<prod_db_user>
     POSTGRES_PASSWORD=<prod_db_password>
     ```

   - For app:

     ```env
     DATABASE_URL=postgres://<prod_db_user>:<prod_db_password>@<prod_db_host>:5432/<prod_db_name>?schema=public
     AUTH_SECRET=...
     AUTH_GOOGLE_ID=...
     AUTH_GOOGLE_SECRET=...
     AUTH_GITHUB_ID=...
     AUTH_GITHUB_SECRET=...
     ```

   - Ensure these are stored securely (server env, secrets manager, etc.).

3. **Start the stack**

   - For a production-like stack:

     ```bash
     docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
     ```

   - This will:
     - Build (if necessary) and start `db`.
     - Start `web`, which:
       - Runs `npx prisma migrate deploy` against the prod DB.
       - Starts Next.js (`next start`).

4. **Verify production health**

   - Check logs:

     ```bash
     docker logs lyzgame-web
     docker logs lyzgame-db
     ```

   - Confirm:
     - Migrations applied successfully (no Prisma migrate errors).
     - No login/auth failures against the DB.
     - App is reachable at the expected external port.
     - Key routes load without Prisma errors.


# Testing implementation
## Testing stack
**JEST/RTL** - This will be used for unit and component tests. This will include 
business logic and data access (prisma) as plain unit tests. Client 
components and any server components that are do not need to be async will
utilize these libraries.

**Cypress** - We will use cypress for e2e testing for pages or layouts that
are async server components and Jest is lacking a built in solution for these
without custom work-arounds. Any critical flows that involve server-side 
rendering and data fetching will also be done using cypress.

For more information on how these work directly with nextjs, check out the 
official [the nextjs guides](https://nextjs.org/docs/pages/guides/testing)


# Other Notes

- Add a blog portion to the website.
- Add the ability to upload photos by admin for entry or lesson purposes.
- start moving the notes from lyz notes into "lessons" in the form of blogs
