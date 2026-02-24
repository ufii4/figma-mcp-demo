# Agent Instructions

Build the presentation layer for a documentation website. Content already exists in `src/content/docs/` as markdown files. Your job is to create the layouts, styles, components, and page logic to render that content into a polished documentation site.

**Stack**: Astro (static site), deployed to GitHub Pages. No additional frameworks.

---

## Content Structure (already provided, do not modify)

```
src/content/docs/
├── guide/           # Sections 1-6
│   ├── 01-connection-setup.md
│   ├── 02-exploration.md
│   ├── 03-coordinate-system.md
│   ├── 04-page-structure.md
│   ├── 05-auto-layout.md
│   └── 06-design-tokens.md
├── components/      # Sections 7-9
│   ├── 07-building-components.md
│   ├── 08-instances-composition.md
│   └── 09-visual-verification.md
└── reference/       # Sections 10-13
    ├── 10-context-management.md
    ├── 11-pitfalls.md
    ├── 12-recipes.md
    └── 13-quick-reference.md
```

Each markdown file has frontmatter: `title`, `order`, `section`. Read them to build the TOC and page rendering.

---

## Site Architecture

### Pages (4 routes)

| Route | File | Renders content from |
|-------|------|---------------------|
| `/` | `src/pages/index.astro` | Home — hero + section cards |
| `/guide/` | `src/pages/guide.astro` | `src/content/docs/guide/*.md` |
| `/components/` | `src/pages/components.astro` | `src/content/docs/components/*.md` |
| `/reference/` | `src/pages/reference.astro` | `src/content/docs/reference/*.md` |

### Layout

- **Nav bar**: Fixed top bar with site title and links to all 4 pages. Show active page state.
- **Home page**: No sidebar. Hero section with title, subtitle, and a "Get Started" link to `/guide/`. Below that, a card grid linking to the 3 content sections (Guide, Components, Reference) with brief descriptions.
- **Content pages**: Sidebar + main content. Sidebar has a table of contents with anchor links to each section on the page. Main area renders all markdown files from the section directory, sorted by `order`.

Each content page:
1. Reads all `.md` files from its section directory
2. Sorts by `order` from frontmatter
3. Renders each markdown file's content sequentially
4. Builds sidebar TOC from the file titles

---

## Display Elements

The content includes code blocks, tables, blockquotes, and other markdown elements. Style them well. At minimum, handle these:

1. **Code blocks** — The content is code-heavy. Use Astro's built-in Shiki syntax highlighting. Add a copy-to-clipboard button.

2. **Data tables** — Many sections have reference tables. Style them with clear headers, readable rows, and horizontal scroll on mobile.

3. **Callout boxes** — Blockquotes in the content carry warnings, tips, and notes. Render them as visually distinct callouts. Detect the type from content keywords (e.g., "Warning", "Tip", "Note").

4. **Section cards** — Home page cards linking to content sections. Show title, brief description, and section count.

5. **Collapsible sections** — Section 11 (pitfalls) lists common mistakes. Render these as collapsible `<details>` elements.

---

## Implementation Checklist

### Astro Setup
- [ ] Configure content collections in `src/content.config.ts` (or `src/content/config.ts`) with schema for `title`, `order`, `section`
- [ ] Create base layout with nav bar
- [ ] Create docs layout with sidebar + content area

### Pages
- [ ] `src/pages/index.astro` — Home with hero + section cards
- [ ] `src/pages/guide.astro` — Renders guide/*.md sorted by order
- [ ] `src/pages/components.astro` — Renders components/*.md sorted by order
- [ ] `src/pages/reference.astro` — Renders reference/*.md sorted by order

### Styling
- [ ] Choose a cohesive color scheme and typography
- [ ] Style all 5 display element types listed above
- [ ] Responsive: sidebar collapses on small screens
- [ ] Smooth scroll with offset for fixed nav

### Behavior (client JS)
- [ ] Copy button on code blocks
- [ ] Smooth scroll to anchors
