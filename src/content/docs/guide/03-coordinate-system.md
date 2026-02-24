---
title: "The Coordinate System"
order: 3
section: "guide"
---

> **This is the single most important concept for agents working with Figma.**

### Relative vs Absolute Positioning

Figma uses a **relative coordinate system** for children inside frames, components, and sections:

```
Page (absolute: 0,0)
  └── Section "Buttons" (absolute: 0, 0)  →  x=0, y=0 relative to page
        └── Component Set "Push Button" (absolute: 50, 36)
              └── position is RELATIVE to parent: x=50, y=36 inside the section
```

### The Critical Rule

**When you `move_node` a child inside a frame/section/component, the x/y values are RELATIVE to the parent, not the page.**

```
# WRONG — Using absolute page coordinates for a child inside a section
move_node(nodeId: "child", x: 1050, y: 500)  → Child appears 1050px from the LEFT of its parent

# CORRECT — Using coordinates relative to the parent
move_node(nodeId: "child", x: 40, y: 36)  → Child appears 40px from parent's left edge
```

### How to Read Coordinates from get_node_info

The `absoluteBoundingBox` in responses gives **page-level absolute** coordinates. To compute the correct relative position for a child:

```
child_relative_x = child_absoluteBoundingBox.x - parent_absoluteBoundingBox.x
child_relative_y = child_absoluteBoundingBox.y - parent_absoluteBoundingBox.y
```

### Insert vs Move

When using `insert_child` to reparent a node into a new parent, the node **retains its old relative coordinates**. You almost always need to follow `insert_child` with a `move_node` to position it correctly within the new parent:

```
insert_child(parentId: "section-1", childId: "my-component")
move_node(nodeId: "my-component", x: 40, y: 36)   ← relative to section-1
```

### Best Practice: Let Auto-Layout Handle Positioning

The coordinate system complexity is the #1 reason to use auto-layout. With auto-layout parents, children are **automatically positioned** — no manual coordinate math needed. See [Section 5](#5-auto-layout--the-foundation-of-good-structure).
