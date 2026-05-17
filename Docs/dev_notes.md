# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the course of development.

# **BUGS**
- main animation wrapper should not run twice, if visitor goes to another page, the animation should not play. Need to implement a state that stays with visitor.


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

## Focus Admin page (Complete)
Need to implement Auth.

### Edit entries and focuses
Need to be able to edit entries or focuses if something was added incorrectly.


## Entry published
Implement the ability to save an entry for it to be published at a later time.
It would be saved as a draft.

# Style Changes

- Fix socials, they need to be round
- Fix TIL feed style to use shadcn/ui
  - There will need to be separate cards for each. The will be becuase the formatted style of the TIL components should be condensed and should not show as much as the full entries.
    - TIL_CurrentFocus
    - CurrentFocus
    - TIL_LatestEntry
    - LatestEntry
    - TIL_AhaEntry
    - AhaEntry


# Other Notes

- Add a blog portion to the website.
- Add the ability to upload photos by admin for entry or lesson purposes.
- add a sign in portion? for saving learning progress
- start moving the notes from lyz notes into "lessons" in the form of blogs
