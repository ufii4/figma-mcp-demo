---
title: "Common Pitfalls & Solutions"
order: 11
section: "reference"
---

### Pitfall 1: Absolute Coordinates for Children

**Problem**: Using page-absolute coordinates when positioning children inside frames.

**Solution**: Always compute relative coordinates or use auto-layout (preferred).

```
# If you must use manual positioning:
child_x = desired_absolute_x - parent_absolute_x
child_y = desired_absolute_y - parent_absolute_y
move_node(nodeId: child, x: child_x, y: child_y)
```

### Pitfall 2: Orphaned Nodes

**Problem**: Children placed outside their parent's visible bounds.

**Solution**: Use auto-layout containers. Children automatically flow into position.

### Pitfall 3: Sections Don't Auto-Layout

**Problem**: Expecting sections to auto-layout their children.

**Solution**: Sections are canvas organizers only. Nest an auto-layout frame inside the section:

```
create_section(name: "Buttons", x: 0, y: 0, width: 800, height: 400)
create_frame(
  name: "Buttons Content", parentId: "section-id",
  x: 16, y: 16, width: 768, height: 368,
  layoutMode: "VERTICAL", itemSpacing: 24,
  layoutSizingHorizontal: "FILL", layoutSizingVertical: "HUG"
)
```

### Pitfall 4: Text Overflow

**Problem**: Text content wider than its parent frame.

**Solution**: Set text to fill parent width in auto-layout:

```
set_layout_sizing(nodeId: "text-node-id", layoutSizingHorizontal: "FILL")
```

### Pitfall 5: Font Loading

**Problem**: Setting text content fails because the font isn't loaded, or `create_text_style` fails because the font family/style doesn't exist.

**Solution**: Always verify fonts before using them:

```
get_available_fonts(query: "Inter")   ← filtered search, small response
```

**Never call `get_available_fonts()` without a `query` parameter** — it returns every installed font (450K+ chars) and will destroy your context window. The plugin handles font loading at runtime, but the font family + style combination must actually exist on the system.

### Pitfall 6: Colors are 0-1, Not 0-255

**Problem**: Passing RGB values as 0-255.

**Solution**: Figma uses normalized 0-1 values:

```
# Red in Figma:
{ r: 1, g: 0, b: 0 }

# Not:
{ r: 255, g: 0, b: 0 }   ← WRONG

# Converting from hex #007AFF (Apple Blue):
{ r: 0/255, g: 122/255, b: 255/255 } = { r: 0, g: 0.478, b: 1 }
```

### Pitfall 7: create_instance_from_library vs create_instance_from_local

**Problem**: `create_instance_from_library(componentKey)` fails for local components.

**Solution**: `create_instance_from_library` only works for published library components. Always use `create_instance_from_local(componentId)` for components in the same file.

### Pitfall 8: insert_child Doesn't Reposition

**Problem**: After `insert_child`, the node appears at the wrong position in the new parent.

**Solution**: The node keeps its old coordinates. Either:
- Use an auto-layout parent (best — positioning is automatic)
- Follow with `move_node` using parent-relative coordinates

### Pitfall 9: create_component_from_node Changes the Node ID

**Problem**: After promoting a frame to a component with `create_component_from_node`, the old node ID is invalid.

**Solution**: Always capture and use the returned ID:

```
create_component_from_node(nodeId: "4:22")  → { id: "4:24", key: "...", name: "Badge" }
# "4:22" is now INVALID — use "4:24" for all subsequent operations
```

### Pitfall 10: Component Set Naming Mismatch

**Problem**: `combine_as_variants` fails or creates wrong properties.

**Solution**: Ensure ALL variant component names share the exact same property names:

```
# GOOD — consistent properties
"Size=Small, State=Idle"
"Size=Large, State=Idle"
"Size=Small, State=Disabled"
"Size=Large, State=Disabled"

# BAD — mismatched property names
"Size=Small, State=Idle"
"Style=Large, Active=True"     ← different property names
```
