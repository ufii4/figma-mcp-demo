---
title: "Page Structure & Organization"
order: 4
section: "guide"
---

### Recommended Page Hierarchy (from macOS design)

Professional Figma design systems follow this page organization:

```
Landing / Cover          — Title, description, version info
Foundations
  ├── Colors             — Color variables and swatches
  ├── Materials          — Paint styles (fills, gradients)
  └── Typography         — Text styles and type scale
Components (alphabetical)
  ├── Buttons
  ├── Checkboxes
  ├── Dialogs
  ├── Inputs
  ├── Switches / Toggles
  └── ...
Examples / Templates     — Composed layouts using instances
Meta / Internal          — Internal documentation, changelog
```

### Creating the Page Structure

```
create_page(name: "Foundations")
create_page(name: "Components")
create_page(name: "Examples")
set_current_page(pageName: "Components")   ← switch to work on a page
```

### Sections as Organizational Containers

Use **sections** to group related content on a page. Sections are Figma's top-level organizational primitive on the canvas:

```
# On the Components page:
create_section(name: "Push Buttons", x: 0, y: 0, width: 800, height: 400)
create_section(name: "Toggles", x: 0, y: 440, width: 800, height: 400)
```

**Important**: Sections do NOT support auto-layout. They are organizational containers only. For auto-layout behavior, nest frames inside sections.

### Naming Conventions (from macOS design)

- **Pages**: Clear category names, capitalized (`Buttons`, `Text Fields`)
- **Components**: Descriptive, PascalCase (`Push Button`, `Switch`)
- **Variants**: `Property=Value` format (`Style=Default, State=Idle`)
- **Internal/sub-components**: `_` prefix (`_Button Icon`, `_Switch Track`)
- **Styles**: Slash-separated hierarchy (`Materials/Thick`, `Accent/Blue`)
- **Variables**: Slash-separated (`color/background/primary`, `size/spacing/md`)
