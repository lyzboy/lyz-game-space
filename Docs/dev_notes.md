# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the course of development.

# **BUGS**
If visiting sites, and the endpoint is on /#sites, the window will not move to 
the sites section. This will need to will need to be handled manually by
checking the path if it is already at /#sites, prevent default, and then smooth 
scroll to the sites section.

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

### Edit entries and focuses
Need to be able to edit entries or focuses if something was added incorrectly.
This will be completed using an "in-place" editor. The admin will visit the page
and, if logged in, an edit and delete button will be shown.
- ✅ Delete pressed - a popup wil be shown confirm deletion, if confirmed, a toast
will appear shown that item has been deleted.
- Edit pressed - The card that shows the item will turn into an editable "form"
where the admin can make changes and either save the changes or cancel the
changes.

## Entry published
Implement the ability to save an entry for it to be published at a later time.
It would be saved as a draft.


# Other Notes

- Add a blog portion to the website.
- Add the ability to upload photos by admin for entry or lesson purposes.
- start moving the notes from lyz notes into "lessons" in the form of blogs
