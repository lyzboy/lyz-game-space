# Developer Notes
This notes are used for development ideas that might popup during the course of 
the development. These notes are meant to capture ideas for later 
planning/implementation. This is a living document and might change during the 
course of development.

# TIL Feed feature
## Update prisma

Following section 2.6 Set up prisma client on 
[the prisma guide](https://www.prisma.io/docs/guides/frameworks/nextjs) for 
next js, we need to create a Prisma Client and attach it to the 
global object so there is only one instance of the client.

Once done, we need to change how the TIL feed connects to the client and use the 
global client.

## TIL feed focus badges
Need to add the badges to the focus, needs to show on the feed, and in the view
page needs to list them all

## Limit Descriptions
On the TIL Feed, the entries need to have their description limited to 80 chars
with any extra being `...`

## Focus list page
Need to make a page to list all focuses

## Focus view page
Need a page to fully view the focus and see a list of it's entries.
On this page, the entries will look similar to the TIL feed, but will include
a drop down where the modal expands showing the full entry details.

## Focus Admin page
A restricted page where I can create focus and entry items.

# Other Notes

- Add a blog portion to the website.
- add a sign in portion? for saving learning progress
- start moving the notes from lyz notes into "lessons" in the form of blogs
