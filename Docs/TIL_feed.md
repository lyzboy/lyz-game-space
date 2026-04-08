# Today I Learned (TIL) Feed Design outline
This section will be part of the dev diary. It will act as a sort of progress API make it easy to scan and get a concept
of daily work that has been completed on various projects.

There will need to be various front and back end elements made for this "feed". A high-level overview of the sections that
will need to be created are below. Visit the implementation diagram (/docs/LyzStudios - Design Roadmap.drawio) to learn more.

## Current Sprint Widget
This will be located at the top of the diary. It will state the current project that is being worked on. For example: 
"Current Focus: Migrating Markdown notes to MongoDB".

## Diary Entry
The last entry within the dev dairy will show under the current sprint widet. It will show the last diary entry with an 
80 character snippet of the entry. This entry will be directly tied to the current focus and act as a complete record.

## Aha! Moment
Entries in the diary will be tagged with Aha! when the explain breaktroughs. If a task was difficult to overcome and required
a deeper understand to figure out, these entries should be tagged. The top 3 most recent Aha tagged entries will be shown 
directly underneath the diary entry snippet.

## Diary Entries
Each diary entry will have the ability to be tied to a commit within the projects repo allowing for traceability. An entry can
have 0-* number of commits attached.

# Required Compontents
## Current Sprint Widget
- Current Sprint title
- Last entry
- Aha! moment
## Sprints Overview page
## Expanded Sprint View
