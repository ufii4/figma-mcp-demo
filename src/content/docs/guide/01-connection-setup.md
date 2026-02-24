---
title: "Connection & Setup"
order: 1
section: "guide"
---

### Joining a Channel

Every session begins by connecting to the Figma plugin via a WebSocket channel:

```
join_channel(channel: "your-channel-id")
```

The channel ID is provided by the user or shown in the Figma plugin UI. If the connection times out or drops, re-join the same channel.

### First Command — Orient Yourself

Always start by understanding what you're working with:

```
get_current_page()  →  Safe entry point. Returns page ID, name, child count, and top-level children.
```

**Never** start with `get_document_info` on an unfamiliar file — community files or files with many pages may have unloaded pages. `get_current_page` is always safe.
