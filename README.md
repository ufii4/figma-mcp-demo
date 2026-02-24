# TalkToFigma MCP Documentation Site

A static documentation website presenting the TalkToFigma MCP guide — 58 tools for building Figma design systems with AI agents. Built with Astro, deployed to GitHub Pages.

## Purpose

Comparison experiment: two AI agents build the same documentation site from the same spec (`AGENTS.md`) and content (`src/content/docs/`):

- **`with-figma-mcp`** branch: Agent has live Figma MCP access + design skill to reference a Figma mockup
- **`without-figma-mcp`** branch: Agent works from the written spec in AGENTS.md only

## Pages

| Page | Route | Content |
|------|-------|---------|
| Home | `/` | Hero + overview cards |
| Guide | `/guide/` | Sections 1-6: Setup, exploration, coordinates, auto-layout, tokens |
| Components | `/components/` | Sections 7-9: Building components, instances, verification |
| Reference | `/reference/` | Sections 10-12: Context management, pitfalls, recipes, tool reference |

## Development

```bash
npm install
npm run dev      # localhost:4321
npm run build    # static output to dist/
```

## Content

All documentation content lives in `src/content/docs/` as markdown files with frontmatter. The site renders this content — agents build the presentation layer (layouts, styles, components).

## Deploy

Push to `main` triggers GitHub Pages deployment via `.github/workflows/deploy.yml`.
