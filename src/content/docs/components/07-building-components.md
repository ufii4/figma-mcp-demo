---
title: "Building Components & Variants"
order: 7
section: "components"
---

### Component Creation Strategies

There are two approaches to creating components:

**Approach A: Direct Component Creation** (best for variants)
1. Create individual components with `create_component` (one per variant)
2. Combine into a component set with `combine_as_variants`
3. *Do NOT manually position variants* — `combine_as_variants` handles layout

**Approach B: Build-Then-Promote** (best for iterative/complex components)
1. Build a frame with `create_frame`, style it, add children
2. Verify it visually with `export_node_as_image`
3. Promote to component with `create_component_from_node`

```
# Build a badge as a regular frame first
create_frame(name: "Badge", ..., layoutMode: "HORIZONTAL", fillColor: { r: 1, g: 0.23, b: 0.19 })
create_text(text: "NEW", parentId: "frame-id", ...)
set_corner_radius(nodeId: "frame-id", radius: 12)

# Verify it looks right
export_node_as_image(nodeId: "frame-id", format: "PNG", scale: 2)

# Promote to component
create_component_from_node(nodeId: "frame-id")  → { id: "new-id", key: "..." }
```

> **Warning**: `create_component_from_node` returns a **new node ID**. The original frame ID becomes invalid. Always use the returned ID for subsequent operations.

### Step-by-Step: Building a Button Component

#### Step 1: Create Each Variant as a Component

```
# Variant 1: Default Idle
create_component(
  name: "Style=Default, State=Idle",
  x: 0, y: 0, width: 80, height: 28,
  layoutMode: "HORIZONTAL",
  primaryAxisAlignItems: "CENTER",
  counterAxisAlignItems: "CENTER",
  paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4,
  layoutSizingHorizontal: "HUG",
  fillColor: { r: 0, g: 0.48, b: 1 },
  cornerRadius: 6
)  → returns componentId

# Add text child
create_text(
  text: "Button", x: 0, y: 0,
  fontSize: 13, fontWeight: 600,
  fontColor: { r: 1, g: 1, b: 1 },
  parentId: "component-id"        ← parent to the component
)

# Set text to fill width in auto-layout
set_layout_sizing(nodeId: "text-id", layoutSizingHorizontal: "HUG")
```

#### Step 2: Build All Variants

Repeat for each variant combination:
- `Style=Default, State=Disabled` — lower opacity, same structure
- `Style=Bordered, State=Idle` — stroke instead of fill
- `Style=Bordered, State=Disabled` — stroke + lower opacity

#### Step 3: Combine as Variants

```
combine_as_variants(
  componentIds: ["comp-1", "comp-2", "comp-3", "comp-4"],
  name: "Push Button"
)  → creates a COMPONENT_SET containing all variants
```

This automatically:
- Groups all variants into a component set
- Infers variant properties from the `Property=Value` naming
- Lays out variants in a grid

### Variant Naming Convention

Figma parses variant component names to extract properties:

```
"Style=Default, State=Idle"      → Properties: Style (Default), State (Idle)
"Style=Default, State=Disabled"  → Properties: Style (Default), State (Disabled)
"Style=Bordered, State=Idle"     → Properties: Style (Bordered), State (Idle)
```

**Rules:**
- Comma-separated `Property=Value` pairs
- All variants in a set must have the **same property names**
- Values can differ across variants
- Property names and values are case-sensitive

### Component Properties (beyond variants)

Add interactive properties to components:

```
# Boolean property (show/hide a layer)
add_component_property(componentId: "...", propertyName: "Show Icon", type: "BOOLEAN", defaultValue: true)

# Text property (override text content)
add_component_property(componentId: "...", propertyName: "Label", type: "TEXT", defaultValue: "Button")

# Instance swap property (swap a nested component)
add_component_property(componentId: "...", propertyName: "Icon", type: "INSTANCE_SWAP")
```

### Icons and SVG Import

Use `create_node_from_svg` to import icons directly as SVG strings:

```
create_node_from_svg(
  svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>',
  name: "Icon/Checkmark",
  x: 0, y: 0
)  → returns a FRAME wrapping the SVG paths
```

This is the most practical way to add icons. The agent can generate SVG markup for common icons and import them directly — no external files needed.

### Building Icons with Boolean Operations

For icons that can't be expressed as a single SVG path, use `create_boolean_operation` to combine shapes:

```
# Create a ring by subtracting inner circle from outer
create_ellipse(name: "Outer", x: 0, y: 0, width: 40, height: 40)
create_ellipse(name: "Inner", x: 8, y: 8, width: 24, height: 24)

create_boolean_operation(
  nodeIds: ["outer-id", "inner-id"],
  operation: "SUBTRACT",
  name: "Ring Icon"
)
```

Operations: `UNION` (combine), `SUBTRACT` (cut out), `INTERSECT` (overlap only), `EXCLUDE` (XOR).

**Order matters for SUBTRACT** — the first node is the base shape, subsequent nodes are subtracted from it.

### Responsive Constraints

For components that need responsive behavior (e.g., elements pinned to edges when the parent resizes):

```
set_constraints(nodeId: "close-button-id", horizontal: "MAX", vertical: "MIN")   ← pin to top-right
set_constraints(nodeId: "footer-id", horizontal: "STRETCH", vertical: "MAX")     ← stretch across bottom
```

| Value | Behavior |
|-------|----------|
| `MIN` | Pin to left (horizontal) or top (vertical) |
| `MAX` | Pin to right (horizontal) or bottom (vertical) |
| `CENTER` | Stay centered |
| `STRETCH` | Stretch with parent |
| `SCALE` | Scale proportionally with parent |

> **Note**: Constraints only apply inside non-auto-layout frames. Auto-layout uses `FILL`/`HUG`/`FIXED` sizing instead.
