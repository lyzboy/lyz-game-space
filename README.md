This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the 
result.

You can start editing the page by modifying `app/page.tsx`. The page 
auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 
to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Install Postgres

Install a local copy of postgres following the [`official site's`](https://www.postgresql.org/download/)
instructions or follow [`the prisma guide`](https://www.prisma.io/docs/guides/frameworks/nextjs)
to use a remote DB.

### Creating a user and database
You may have to create a new user and database to use for development. The following
command will utilize the user name from the signed in user
```
sudo -u postgres createuser -s $USER
createdb lyz_game_test
```

### Log into psql
To long into the database using psql, use
```
psql -d lyz_game_test
```

### Roles
Ensure you create a user to access the database with and give them ownership
of the database
```
sudo -u postgresql psql
```
Once in the psql interface:
```
CREATE USER lyz_app WITH LOGIN PASSWORD 'secure-password';
ALTER DATABASE lyz_game_test OWNER TO lyz_app;
```

### Change DB data in .env
Change the `DATABASE_URL` to match you local setup:
```
DATABASE_URL="postgres://lyz_app:your-secret-password@localhost:5432/lyz_game_test?schema=public"
```
### Adding CREATEDB role
To allow prisma to generate a shadow db, used for migration, the new role must have the CREATEDB role. You can accomplish this by using:
```
ALTER ROLE lyz_app WITH CREATEDB
```
If the user has already been created.