# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the course of development.

# **BUGS**
- If visiting sites, and the endpoint is on /#sites, the window will not move to 
the sites section. This will need to will need to be handled manually by
checking the path if it is already at /#sites, prevent default, and then smooth 
scroll to the sites section.

# Still Needed

- Fix BUGS!

- need to double check auth entry points

- need final review of style
  - Focuses page needs style update
    - Badges for focuses need updated shadcn/ui
    - Focus cards need updated to shadcn/ui
  - Focus view page needs to have `Return to Focuses` link removed
    - Fix gap between items on focus view page when in mobile view
  - Signin dialog needs some fine tuning
    - cancel sign button needs to be destructive variant.

- need pass all tests before release

# Production Release

- Use squash and merger on github to merge the branch

- Handle prisma migration. Ensure to run `prisma migrate deploy` on production 
server. Ensure that `prisma generate` and `prisma migrate deploy` before `next
build` in the docker file.

- Update docker compose and docker file so that it references the server db.
Ensure that the system is using pnpm and not npm commands
  - Create two separate docker-compose files `docker-compose.dev.yml` and 
  `docker-compose.prod.yml`. The dev file should mirror the prod file with dev
  overrides, local env vars, etc. The prod compose file can be used locally to
  ensure that it closely meets "what the production server will do", but using 
  a different DB. 

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
