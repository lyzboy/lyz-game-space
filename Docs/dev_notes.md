# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the 
course of development.

# TIL Feed feature

## Focus list page
Need to add a way to get to each focuses 'focus view page'

## Focus view page
Need a page to fully view the focus and see a list of it's entries.
On this page, the entries will look similar to the TIL feed, but will include
a drop down where the modal expands showing the full entry details.

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

## Entry published
Implement the ability to save an entry for it to be published at a later time.
It would be saved as a draft.

# Other Notes

- Add a blog portion to the website.
- Add the ability to upload photos by admin for entry or lesson purposes.
- add a sign in portion? for saving learning progress
- start moving the notes from lyz notes into "lessons" in the form of blogs
