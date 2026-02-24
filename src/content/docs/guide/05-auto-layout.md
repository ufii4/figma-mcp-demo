---
title: "Auto-Layout — The Foundation of Good Structure"
order: 5
section: "guide"
---

### Why Auto-Layout is Non-Negotiable

Without auto-layout, every child needs manual x/y coordinates. This leads to:
- Orphaned nodes (children outside parent bounds)
- Coordinate confusion (relative vs absolute)
- Brittle layouts that break when children are added/removed/resized

**Auto-layout eliminates all of these problems.**

### Creating Auto-Layout Frames

```
# Create a horizontal auto-layout frame
create_frame(
  name: "Button Row",
  x: 0, y: 0, width: 400, height: 60,
  layoutMode: "HORIZONTAL",
  itemSpacing: 16,
  paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
  counterAxisAlignItems: "CENTER",
  layoutSizingHorizontal: "HUG",    ← shrink-wrap to content width
  layoutSizingVertical: "HUG"       ← shrink-wrap to content height
)
```

### Wrapping Existing Nodes in Auto-Layout

The `create_auto_layout` tool wraps existing nodes in a single call — no need to create a frame, set layout mode, and insert children separately:

```
create_auto_layout(
  nodeIds: ["node-1", "node-2", "node-3"],
  name: "Button Row",
  layoutMode: "HORIZONTAL",
  itemSpacing: 16,
  paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
  layoutSizingHorizontal: "HUG",
  layoutSizingVertical: "HUG"
)
```

This replaces the multi-step pattern: `create_frame` → `set_layout_mode` → `insert_child` × N.

### Converting Existing Frames to Auto-Layout

```
set_layout_mode(nodeId: "frame-id", layoutMode: "VERTICAL")
set_item_spacing(nodeId: "frame-id", itemSpacing: 20)
set_padding(nodeId: "frame-id", paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24)
```

### Auto-Layout Properties Reference

| Tool | Purpose |
|------|---------|
| `set_layout_mode` | HORIZONTAL, VERTICAL, or NONE |
| `set_item_spacing` | Gap between children (px) |
| `set_padding` | Inner padding (top, bottom, left, right) |
| `set_axis_align` | Primary axis: MIN/CENTER/MAX/SPACE_BETWEEN; Counter axis: MIN/CENTER/MAX |
| `set_layout_sizing` | HUG (shrink-wrap), FILL (stretch to parent), FIXED (exact size) |

### Sizing Modes Explained

| Mode | Behavior | Valid On |
|------|----------|----------|
| `HUG` | Shrink-wrap to fit children | Auto-layout frames, text nodes |
| `FILL` | Stretch to fill parent's available space | Children of auto-layout frames |
| `FIXED` | Exact pixel dimensions | Any node |

### The Auto-Layout Page Pattern

For a well-structured components page:

```
Page
  └── Section "Buttons" (no auto-layout — sections can't have it)
        └── Frame "Buttons Content" (VERTICAL auto-layout, HUG both axes)
              ├── Text "Push Button" (heading)
              ├── Component Set "Push Button" (the variants)
              ├── Text "Icon Button" (heading)
              └── Component Set "Icon Button" (the variants)
```

This way, adding a new component set automatically pushes content below it — no manual position calculations.
