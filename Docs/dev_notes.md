# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the 
course of development.

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

# TIL Feed feature

## Focus Admin page
A restricted page where I can create focus and entry items. It should have a 
quick entry component to enter the entry into. It should also utilize the github
api to grab the commits for the repo associated with the focus, this will create
a list so I can quickly select a commit to associate with the current entry.

This feature will need to use next.js suggested guidelines for auth found in the
[guide](https://nextjs.org/learn/dashboard-app/adding-authentication). Note that
it does utilize the [Auth.js next-auth library](https://authjs.dev/reference/nextjs).
We do not need to implement any database items for log in as the only login will
be from the admin. We will store a bcrypt hashed password in the .env file on the
server, and there will be only a password for for access to the admin dash. Once
the admin enters the password, we will use bcrypt to salt and hash the password
and compare it against the stored hashed password on the server side.

### Edit entries and focuses
Need to be able to edit entries or focuses if something was added incorrectly.

## Add Markup viewer
Entries should be able to use markup to write them. Need to parse the entry data
so that markup is rendered and html. Might need to adjust global tailwind styles
to ensure that formatting works correctly.

The suggest npm library stack for completing this feature will be:
- `prisma`
- `@prisma/client`
- `react-markdown`
- `remark-gfm`
- `rehype-sanitize`
- `@tailwindcss/typgraphy`
- `@mdxeditor/editor`

The install order of these packages for testing to ensure operability should be:
1. `@prisma/client` and `prisma` 
These will need to be implemented and confirmed to be able to store plain text markdown. The will also me to focus on testing the storage and ensure that the markdown is being saved correctly.

2. `react-markdown`
This package will the **public rendering** of the markdown to html. (install `remark-gfm` also) This will be what the user *sees*. So it will take the markdown from prisma and *show* it on the page. It is designed to safely render a markdown string into react elements. This will need to be down to test that the saved markdown in postgres can be rendered to a page.

3. `remark-gfm`
This will need to be installed along with `react-markdown`. This will give me the ability to support GitHUb-flavored  markdown features like tables, task lists, and strike-through which will be necessary for later "lessons".

4. `rehype-sanitize`
This will add sanitization to the rendering setup ensuring that the entered markdown can be rendered correctly.

5. `@tailwindcss/typography`
This will be installed after the renderer pipeline is working and will allow the rendered markdown to be styled with Tailwind's `prose' classes as recommended by Next.js.

6. `@mdxeditor/editor`
Once storage and rendering have been proven, I will add MDXEDITOR for admin authoring of pages. This does not support server side rendering and must be used as client-side only rendering within App router. It must be treated as teh final "authoring layer" once the database and public rendering paths are proven to work.

## Entry published
Implement the ability to save an entry for it to be published at a later time.
It would be saved as a draft.

# Other Notes

- Add a blog portion to the website.
- Add the ability to upload photos by admin for entry or lesson purposes.
- add a sign in portion? for saving learning progress
- start moving the notes from lyz notes into "lessons" in the form of blogs
