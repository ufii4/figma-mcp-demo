---
title: "Exploration First — Always Read Before Writing"
order: 2
section: "guide"
---

### The Read-First Principle

Before creating anything, understand the existing file structure. This prevents duplicating styles, mismatching naming conventions, and breaking existing patterns.

### Exploration Toolkit (ordered by scope)

| Scope | Tool | Purpose |
|-------|------|---------|
| Document | `get_pages` | List all pages with child counts |
| Document | `get_current_page` | Current page + top-level children (safe) |
| Document | `get_document_info(depth: 0)` | Document overview with pages |
| Page | `set_current_page(pageName: "Colors")` | Switch to a page by name (case-insensitive partial match) |
| Page | `search_nodes(query, types, limit)` | Find nodes by name/type with pagination |
| Node | `get_node_info(nodeId, depth: 0)` | Node details with child stubs (names/types only) |
| Node | `get_node_info(nodeId, depth: 1)` | Node + direct children fully detailed |
| Tokens | `get_styles` | List all paint/text/effect/grid styles |
| Tokens | `get_local_variable_collections` | List variable collections |
| Tokens | `get_local_variables` | List variables (names, IDs, types) |
| Components | `get_local_components(setsOnly: true)` | List component sets only (not individual variants) |
| Components | `get_component_by_id(componentId)` | Full component details with property definitions |
| Selection | `get_selection` | What's currently selected |
| Selection | `read_my_design(depth: 1)` | Detailed selection info |
| Fonts | `get_available_fonts(query: "Inter")` | Check available fonts before creating text styles |

### Depth Parameter Strategy

The `depth` parameter is your primary tool for controlling response size:

- **`depth: 0`** — Node itself + child stubs (name, type, ID only). Best for scanning structure.
- **`depth: 1`** — Node + direct children with full details. Good for understanding one level.
- **`depth: 2`** — Two levels deep. Use for component internals.
- **`depth: -1`** — Unlimited recursion. **Avoid on large nodes** — can overflow context.

**Rule of thumb**: Start with `depth: 0`, then drill into specific children with `depth: 1`.
