---
title: "Workflow Recipes"
order: 12
section: "reference"
---

### Recipe: New Design System from Scratch

```
1. Create pages:
   create_page("Foundations")
   create_page("Components")
   create_page("Examples")

2. Set up tokens on Foundations:
   set_current_page(pageName: "Foundations")
   get_available_fonts(query: "Inter")                ← verify fonts first
   create_variable_collection("Appearance")           → rename default mode to "Light", add "Dark"
   create_variable_collection("Sizes")                → set up spacing/radius tokens
   Create color variables + set_variable_value per mode
   Create paint styles for brand colors
   Create text styles for type scale
   Create effect styles for shadows

3. Build components on Components page:
   set_current_page(pageName: "Components")
   For each component group:
     - Create section as container
     - Create auto-layout frame inside section for content
     - Build variant components with create_component
     - combine_as_variants to create the set
     - add_component_property for text/boolean overrides
     - set_variable_binding to connect tokens to component fills/spacing
     - set_export_settings for dev handoff presets
     - Verify with export_node_as_image

4. Compose examples on Examples page:
   set_current_page(pageName: "Examples")
   Create auto-layout frames for layouts
   Drop in instances with create_instance_from_local
   set_multiple_text_contents to batch-update labels
   Verify with export_node_as_image
```

### Recipe: Adding a New Component

```
1. Explore existing patterns:
   get_local_components(setsOnly: true, limit: 5)
   get_component_by_id(componentId: "existing-component")   ← study the pattern

2. Navigate to Components page:
   set_current_page(pageName: "Components")

3. Create variants following existing naming convention:
   create_component(name: "Property=Value, Property=Value", ...)
   # Add children (text, icons, etc.)

4. Combine into component set:
   combine_as_variants(componentIds: [...], name: "Component Name")

5. Verify:
   export_node_as_image(nodeId: "component-set-id", format: "PNG", scale: 2)
```

### Recipe: Exploring an Unknown File

```
1. Connect and orient:
   join_channel("channel-id")
   get_current_page()

2. Scan file structure:
   get_pages()
   # Note page names and child counts

3. Explore design tokens:
   get_styles()                              ← paint, text, effect styles
   get_local_variable_collections()          ← variable collections

4. Explore components:
   get_local_components(setsOnly: true, limit: 20)
   # For interesting components:
   get_component_by_id(componentId: "...")

5. Navigate to key pages:
   set_current_page(pageName: "interesting-page")
   get_current_page()                        ← see top-level children
   get_node_info(nodeId: "child-id", depth: 0)   ← drill in

6. Visual overview:
   export_node_as_image(nodeId: "page-or-frame-id", format: "PNG", scale: 0.5)
```

### Recipe: Quick Batch Property Updates

Use `set_node_properties` for efficient multi-property updates:

```
# Instead of 3 separate calls:
set_opacity(nodeId: "...", opacity: 0.5)
set_corner_radius(nodeId: "...", radius: 8)
set_fill_color(nodeId: "...", r: 1, g: 0, b: 0)

# One call:
set_node_properties(nodeId: "...", properties: {
  opacity: 0.5,
  cornerRadius: 8
})
# (fill color still needs set_fill_color for the paint array)
```
