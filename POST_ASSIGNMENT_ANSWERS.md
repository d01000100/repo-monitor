**Describe the major design/build decisions and why you made them.**

- Using Next.js to have a solid framework and startup point to build the application in.
- Use redux to have a global state to manage the repository data retrieved by the API. A lot of components across the application need to read or update the data, and with redux I avoid prop drilling
- Using tailwind for styling. I mostly decided to use tailwind to practice how to use it, because I haven't used it a lot. It simplifies dynamic styling somewhat, but I could have used it better
- MUI's graph library. I've worked with MUI before and it was really easy to setup. Although I hadn't used the graph before. 

**How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").**

| Task                                            | Time (hours) |
| ----------------------------------------------- | ------------ |
| Research and experiment with github API         | 1.5          |
| Research and experiment with graph component    | 2            |
| Create sidebar and repo cards                   | 1            |
| Model data and create state hooks               | 1            |
| Create autocomplete component                   | 4            |
| Fetch repositories on search                    | 1            |
| Fetch commit history on repo select (coding)    | 1            |
| Fetch commit history on repo select (debugging) | 1.5          |
| Graph commit actiity (development)              | 1            |
| Graph commit actiity (debugging)                | 2            |
| **Total**                                       | **15**       |

**If you could go back and give yourself advice at the beginning of the project, what would it be?**

- I'd use another graph component library. MUI's was very finnicky and lacked documentation for the edge cases. I did an exploration at the beginning and it seemed that I could do everything I needed, but I didn't test deep enough and there was a lot of debugging involved
- Really taking advantage on tailwind to create specific designs requires a custom configuration. I found myself a lot of times adding css styles to match the correct colors or effects, that weren't in the tailwind default configuration.
- Just take the time to configure the icons as resources. I copy pasted the svg code into React component, but that got time consuming and had a couple of bugs that I could have easily avoided

**Did you learn anything new?**

- I've never used redux with typescript before and it definitely needs some extra work to get all the types to configure correctly, but it really helps you to know what data you're working in with each reducer
- Memoizing functions and data. I haven't used them before and they're pretty nice. Makes it easy to write code being safe your components are performant
- Everytime I use a different graph component I learn a different an "interesting" way to use a graph component

**Do you feel that this assignment allowed you to showcase your abilities effectively?**

Definitely. It has design readings, development of reactive and interactive components, data fetching from API, state management, third-party components and libraries. Mostly everything you do day-to-day making front-end.

**Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?**

- Creation and configuration of libraries ([like this one](https://github.com/d01000100/figma-token-engine))
- Bundling and deployment of a page
- Database creation and connection

**Extra question: All the features and polish I could have added if I had more time**

- Add design colors and effects to tailwind config, so I could only use tailwind across the application
- Complete keyboard interaction in autocomplete: Going through the options with the arrows keys and closing the list with Esc
- Add "loading" state to graphs. The commit activity request takes a bit so there's a bit of wait from the repo being added to the list and the graph appearing. So I would have added a "commits loading..." legend on the repo cards.
- Don't include the github api on the client code. I started focusing on components and UI, so I ran out of time to configure that correctly. I would have made a Next REST API to fetch the repositories and that way only the server-side code hast the key.

  _It is a temporal key with the least permissions I could give it, but still_