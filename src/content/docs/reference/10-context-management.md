---
title: "Context Management"
order: 10
section: "reference"
---

### The Context Problem

Figma files can be enormous. A single `get_local_components` call returned 187K characters (1,391 components) on a macOS design file. Context management is critical.

### Strategies (in order of importance)

#### 1. Use Depth Control

```
# BAD — unlimited depth on a large frame
get_node_info(nodeId: "page", depth: -1)   ← could return megabytes

# GOOD — scan structure first, then drill in
get_node_info(nodeId: "page", depth: 0)       ← see child names/types
get_node_info(nodeId: "specific-child", depth: 1)  ← details on one child
```

#### 2. Use Filtering Flags

```
# BAD — all 1,391 components
get_local_components()   ← 187K chars

# GOOD — just 82 component sets
get_local_components(setsOnly: true)   ← 17x reduction
```

#### 3. Use Pagination

```
get_local_components(setsOnly: true, limit: 20, offset: 0)   ← first 20
get_local_components(setsOnly: true, limit: 20, offset: 20)  ← next 20

search_nodes(query: "Button", types: ["COMPONENT_SET"], limit: 10)
```

#### 4. Use List/Get Split

List tools return summaries (name, ID, type). Detail tools return full info:

```
# Step 1: List (low context cost)
get_styles()   ← returns IDs, names, keys

# Step 2: Get details for specific items (targeted)
get_style_by_id(styleId: "specific-style-id")
```

Same pattern: `get_local_variables` → `get_variable_by_id`, `get_local_components` → `get_component_by_id`

#### 5. Search Instead of Scanning

```
# BAD — traverse entire page tree looking for buttons
get_node_info(nodeId: "page", depth: -1)  ← scan everything

# GOOD — search directly
search_nodes(query: "Button", types: ["COMPONENT_SET"])
```
