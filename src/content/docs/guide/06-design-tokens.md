---
title: "Design Tokens: Variables & Styles"
order: 6
section: "guide"
---

### Variable Collections

Variable collections hold design tokens with multiple modes (e.g., Light/Dark):

```
# Create collection
create_variable_collection(name: "Appearance")   → returns collectionId + default modeId

# Rename the default mode
rename_mode(collectionId: "...", modeId: "default-mode-id", name: "Light")

# Add dark mode
add_mode(collectionId: "...", name: "Dark")   → returns new modeId

# Create a color variable
create_variable(collectionId: "...", name: "background/primary", resolvedType: "COLOR")

# Set values per mode
set_variable_value(variableId: "...", modeId: "light-mode-id", value: { r: 1, g: 1, b: 1, a: 1 })
set_variable_value(variableId: "...", modeId: "dark-mode-id", value: { r: 0.1, g: 0.1, b: 0.1, a: 1 })
```

### Variable Types

| Type | Use Case | Value Format |
|------|----------|--------------|
| `COLOR` | Colors | `{ r: 0-1, g: 0-1, b: 0-1, a: 0-1 }` |
| `FLOAT` | Spacing, sizing, radii | Number |
| `STRING` | Text content | String |
| `BOOLEAN` | Visibility toggles | `true`/`false` |

### Binding Variables to Nodes

Variables become useful only when bound to node properties. Use `set_variable_binding`:

```
# Color variables → paint properties
set_variable_binding(nodeId: "...", field: "fills/0/color", variableId: "color-var-id")
set_variable_binding(nodeId: "...", field: "strokes/0/color", variableId: "color-var-id")

# Float variables → numeric properties
set_variable_binding(nodeId: "...", field: "height", variableId: "size-var-id")
set_variable_binding(nodeId: "...", field: "width", variableId: "size-var-id")
set_variable_binding(nodeId: "...", field: "cornerRadius", variableId: "radius-var-id")
set_variable_binding(nodeId: "...", field: "itemSpacing", variableId: "spacing-var-id")
set_variable_binding(nodeId: "...", field: "paddingLeft", variableId: "spacing-var-id")
set_variable_binding(nodeId: "...", field: "opacity", variableId: "float-var-id")
set_variable_binding(nodeId: "...", field: "strokeWeight", variableId: "float-var-id")
```

**Important**: For `fills/0/color` and `strokes/0/color`, the node must already have at least one fill or stroke applied. If the index is out of range (e.g., binding `strokes/0/color` to a node with no strokes), the tool will error.

### Paint Styles (Colors)

For simple, non-modal colors (e.g., brand colors, materials):

```
create_paint_style(name: "Materials/Thick", color: { r: 0.96, g: 0.96, b: 0.96, a: 0.9 })
create_paint_style(name: "Accent/Blue", color: { r: 0, g: 0.48, b: 1, a: 1 })
```

Apply to nodes:
```
apply_style_to_node(nodeId: "...", styleId: "style-id", styleType: "fill")
```

### Text Styles

Before creating text styles, verify that the font family and styles are available:

```
get_available_fonts(query: "SF Pro")
→ { familyCount: 4, fonts: [
    { family: "SF Pro", styles: ["Regular", "Bold", "Medium", "Semibold", ...] },
    { family: "SF Pro Display", styles: [...] },
    ...
  ]}
```

**Always use the `query` parameter** — calling `get_available_fonts()` without a filter returns every installed font (450K+ chars) and will overflow context.

Define a type scale:

```
create_text_style(name: "Heading/Large Title", fontFamily: "SF Pro", fontSize: 26, fontStyle: "Bold")
create_text_style(name: "Body/Regular", fontFamily: "SF Pro", fontSize: 13, fontStyle: "Regular",
                  lineHeight: { value: 18, unit: "PIXELS" })
```

Apply to text nodes:
```
apply_style_to_node(nodeId: "...", styleId: "style-id", styleType: "text")
```

### Effect Styles

```
create_effect_style(
  name: "Shadow/Medium",
  effects: [{
    type: "DROP_SHADOW",
    radius: 8,
    offset: { x: 0, y: 2 },
    color: { r: 0, g: 0, b: 0, a: 0.15 },
    spread: 0,
    visible: true
  }]
)
```

### Style Naming Convention (Slash Hierarchy)

Figma uses `/` in style names to create groups in the UI:

```
Materials/Thick         → "Materials" group
Materials/Medium
Materials/Thin
Accent/Blue             → "Accent" group
Accent/Red
Heading/Large Title     → "Heading" group
Heading/Title
Body/Regular            → "Body" group
Body/Emphasis
```
