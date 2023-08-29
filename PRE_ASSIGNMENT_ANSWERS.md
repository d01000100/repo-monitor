**What do you think are the greatest areas of risk in completing the project?**

- Making the autocomplete search input. There's a lot of interactibility, state management and debugging
- Making efficient calls to the github API.

**What changes/additions would you make to the design?**

- Move the text on the placeholder to a label or text outside the input. Sometimes placeholder texts can be confused with pre-filled values.
- Make the delete button on the repository cards always visible, to make it clear to a user that you can delete them.
- Add some legend to the graph or the lines. Relying on only color to distinguish information may be difficult for some people.

**List two or three features that you would consider implementing in the future that would add significant value to the project.**

- Bookmark or store repositories in some way, so when you revisit the page they auto load
- Change the scale on the graph, or change the range of dates showing the commit activities 

**Are there any clarifying questions you would ask? If you're able to make assumptions about these and continue, please record and share your assumptions**

- Is there a limit on the repositories I can show on the graph at one time? I assume not, but they will probably become a really messy graph to read if there is not. And most likely have a performance liabilty
  - What happens when the list of added repositories does not fit on the screen? I'll add a scroll around the commit list
- From the second screen: Do I only show six result maximun when searching repositories? I'm going to assume yes, but there could also be a scroll inside the suggestions
- ¿What colors should I use when there's more than 3 repos? I'll just search a color palette from some design system and make a sufficiently long list. I'll loop around it if there are even more repositories.
- ¿What exactly is the logic for the "last updated at" text on the repo list? I'll assume is:
  - If it's on the same day as today, it says "Updated X hours ago"
  - If it's more than a day but less than a week, it says "Updated X days ago"
  - If it's more, it just says the date