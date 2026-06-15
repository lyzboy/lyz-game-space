# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the course of development.

# **BUGS**

# Additional Features
 1. Add ability to add/remove technologies to a focus.
  - Technologies will still need to be created on the admin page. They will be able to be added or removed from the focus/[id] page.
2. Styling for the admin page will be styled using shadcn/ui
  - Cards will need to be used.
  - Ensure the responsive design is used. Currently, on mobile, the cards don't stack and the submit buttons overflow and are hidden.
3. Adjust the headings styles for prose for rendered markdown on the site. Specifically h3-h6 

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
