# OngCDH Research Site

Static marketing and repository landing page for the Walter J. Ong, S.J. Center for Digital Humanities at Saint Louis University.

## Getting started

1. Open `index.html` in your browser to view the site locally. No build step is required.
2. All styles live in `assets/css/main.css` and client-side behavior in `assets/js/app.js`.
3. Featured projects are loaded from JSON files inside `assets/data/projects`. Drop new JSON files in that directory to publish additional work.

### Adding a project

1. Copy one of the existing files in `assets/data/projects` (for example `project-04.json`).
2. Rename the copy using the `project-XX.json` pattern. Increment `XX` with the next available number (e.g., `project-05.json`).
3. Update the JSON fields:
   - `title`: Project name displayed on the card.
   - `description`: Short summary of the work.
   - `type`: One of `faculty`, `student`, or `community` for filtering.
   - `team`: People or units involved.
   - `year`: Launch year or most recent major update.
   - `link`: URL to the live project or repository.
   - `tags`: Array of keywords.
4. Save the file. No JavaScript changes are needed—the page automatically loads all numbered project files.

White papers can be listed by updating the `WHITE_PAPERS` array in `assets/js/app.js` when documents are ready to share.

## Brand alignment

- Color palette follows SLU brand guidance (SLU Blue, deep navy, neutral grays, accent red).
- Typeface pairing uses Montserrat and Source Serif as accessible web alternatives to SLU&rsquo;s Proxima Nova and Mercury families.
- Custom SVG shield and geometric background evoke university identity without relying on WordPress themes.

## Accessibility & responsiveness

- Semantic HTML structure with landmark elements and accessible navigation controls.
- Responsive layout using CSS grid/flexbox and mobile navigation toggle.
- Searchable white paper list and filterable project grid for quick discovery.
