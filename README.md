# Lyz Game Space - Personal Portfolio & Diary Platform

A personal portfolio and sandbox space built with modern web tooling, showcasing my work as a full‑stack PERN engineer, CAD designer, and lifelong learner.

## Overview
This is a personal website used to showcase projects and my developer journey. The site is a living project and new features are added regularly. For example, a dev diary captures daily progress across projects, including 'aha' moments. Planned features include a guided learning section where I share experiences with different technologies to help others who are learning.

This site has been built with Next.js (App Router) with a PostgreSQL DB and Prisma as the ORM. I use component libraries such as shadcn/ui and MagicUI with Lucide icons to improve the style of the site. The live site is hosted on an Ubuntu server at my residence, using Cloudflare for external access.

My background includes a BSIT in Software Systems Engineering, web development bootcamp certifications, and multiple CAD and design certifications. I’m currently focused on roles involving full-stack TypeScript development, systems-oriented web applications, and opportunities that benefit from both software and CAD/design experience.

### What this project demonstrates

- End-to-end ownership: architecture, backend, frontend, deployment, and monitoring.
- Ability to design and evolve a real-world codebase over time.
- Practical use of modern tooling (Next.js App Router, Prisma, CI/CD, containerization)

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, MagicUI, Lucide Icons, Framer Motion.
- **Backend:** Next.js Route Handlers / API routes, Prisma ORM
- **Database:** PostgreSQL (local Postgres)
- **Tooling:** ESLint, Prettier, Jest, RTL
- **Deployment:** Docker, Github Actions (CI/CD), Cloudflare

Why this stack? This stack was chosen for performance, type safety, and developer experience. As a full‑stack developer, I wanted to showcase my ability to build a complete, performant ecosystem.

## AI Statement:
The use of AI within this project has been limited to:
- Editing text content for clarity and readability.
- Planning and understanding new technologies.
- Reviewing code and security vulnerabilities.
- Supporting design documentation and suggesting features.

These have been completed using Perplexity AI Spaces as a supporting tool, not as a replacement for design or implementation decisions

## Key Features
- **Portfolio** - Projects with concise write-ups.
- **Dev Diary** - short accomplishments and moments of discovery relating to a specific focus.
- **Responsive Design** - Layout tuned for desktop, tablet, and mobile. 

### Future Features
- **Learning Guide** - Project/component based learning platform where users can follow and complete learning lessons for free.

## Architecture / Design Notes

- Uses Next.js App Router for file-based routing and server components where appropriate.
- Prisma schema as a single source of truth for database models.
- Clear separation between UI components, domain logic, and data access.
- Focus on type safety end-to-end (TypeScript, Prisma types, strict mode).

## Live Demo and Contact
You can visit the live site at [lyzgame.space](https://www.lyzgame.space) or [lyzstudios.com](https://www.lyzstudios.com)

To contact me:
- [GitHub](https://github.com/lyzboy)
- [LinkedIn](https://www.linkedin.com/in/joshuaraysanford)

## Running Locally
This project is primarily for personal use, but can be run locally with a standard Next.js + Prisma + PostgreSQL setup using the steps below.

Make sure you have PostgreSQL running and a database URL configured in your .env file.

### Clone Repo
`git clone https://github.com/lyzboy/lyz-game-space.git`

### Install Packages
`pnpm install`

### Migrate DB from prisma
`npx prisma migrate dev`

### Generate DB from Prisma
`npx prisma generate dev`

### Seed DB
`npx prisma db seed`

### Run
`pnpm dev`