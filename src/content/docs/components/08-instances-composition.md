---
title: "Instances & Composition"
order: 8
section: "components"
---

### Creating Component Instances

For local components, always use `create_instance_from_local`:

```
# From a specific component
create_instance_from_local(componentId: "component-node-id", x: 100, y: 200)

# From a component SET (auto-picks the default variant)
create_instance_from_local(componentId: "component-set-id", x: 100, y: 200)

# Inside a parent frame (auto-layout handles positioning)
create_instance_from_local(componentId: "...", parentId: "auto-layout-frame-id")
```

> **Note**: `create_instance_from_library` (by key) only works for **published library** components, not local ones. Always use `create_instance_from_local` for components in the same file.

### Composing Layouts with Instances

Build compositions by combining instances inside auto-layout frames:

```
# Create a card container
create_frame(
  name: "Dialog Card",
  x: 0, y: 0, width: 320, height: 200,
  layoutMode: "VERTICAL",
  itemSpacing: 12,
  paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20,
  fillColor: { r: 1, g: 1, b: 1 },
  cornerRadius: 12,
  layoutSizingVertical: "HUG"
)

# Add instances as children
create_text(text: "Are you sure?", parentId: "card-id", fontSize: 16, fontWeight: 700, x: 0, y: 0)
create_text(text: "This action cannot be undone.", parentId: "card-id", fontSize: 13, x: 0, y: 0)

# Button row
create_frame(
  name: "Button Row", parentId: "card-id",
  x: 0, y: 0, width: 100, height: 28,
  layoutMode: "HORIZONTAL",
  itemSpacing: 8,
  primaryAxisAlignItems: "MAX",
  layoutSizingHorizontal: "FILL",
  layoutSizingVertical: "HUG"
)

# Drop in button instances
create_instance_from_local(componentId: "bordered-button-id", parentId: "button-row-id")
create_instance_from_local(componentId: "default-button-id", parentId: "button-row-id")
```

### Overriding Instance Content

```
# Find text nodes inside an instance
scan_text_nodes(nodeId: "instance-id")

# Override a single text node
set_text_content(nodeId: "text-node-inside-instance", text: "Cancel")

# Override multiple text nodes in one call (saves round-trips)
set_multiple_text_contents(
  nodeId: "instance-id",
  text: [
    { nodeId: "title-text-id", text: "Confirm Delete" },
    { nodeId: "body-text-id", text: "This action cannot be undone." },
    { nodeId: "button-text-id", text: "Delete" }
  ]
)
```

`set_multiple_text_contents` processes nodes in batches of 5 — significantly faster than individual `set_text_content` calls when updating multiple labels.
