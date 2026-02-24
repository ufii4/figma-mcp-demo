---
title: "Visual Verification"
order: 9
section: "components"
---

### Always Verify Your Work

After creating or modifying designs, export an image to verify:

```
export_node_as_image(nodeId: "node-id", format: "PNG", scale: 1)
```

Common scales:
- `scale: 1` — actual size (best for layout verification)
- `scale: 2` — retina/detailed view (useful for small components)
- `scale: 0.5` — overview of large pages

### What to Check

1. **Children inside parent bounds** — no orphaned nodes sticking out
2. **Text not truncated** — text content fully visible
3. **Spacing consistent** — even gaps between elements
4. **Colors correct** — fills and strokes match intent
5. **Alignment** — elements aligned as expected

### Configuring Export Presets

Set export settings on components or frames for developer handoff:

```
set_export_settings(nodeId: "component-id", settings: [
  { format: "PNG", constraint: { type: "SCALE", value: 1 }, suffix: "" },
  { format: "PNG", constraint: { type: "SCALE", value: 2 }, suffix: "@2x" },
  { format: "SVG" }
])
```

Common presets:
- **iOS**: 1x, 2x, 3x PNG
- **Android**: mdpi (1x), hdpi (1.5x), xhdpi (2x), xxhdpi (3x) PNG
- **Web**: 1x PNG + SVG
- **Icons**: SVG only

### Viewport Tools

Navigate the Figma canvas to show the user what you've created:

```
zoom_into_view(nodeIds: ["node-1", "node-2"])   ← fit specific nodes on screen
set_viewport(center: { x: 400, y: 300 }, zoom: 1.0)   ← set exact view
set_focus(nodeId: "node-id")   ← select and scroll to a single node
```
