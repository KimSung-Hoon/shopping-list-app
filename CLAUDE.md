# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

Open `index.html` directly in a browser — no build step or server needed.

```
# Windows
start index.html

# macOS
open index.html
```

## Architecture

Pure vanilla HTML/CSS/JS — no framework, no bundler, no dependencies.

| File | Role |
|------|------|
| `index.html` | Shell: DOM structure only, no inline scripts or styles |
| `style.css` | All styling, including animation (`slide-in`) and checked-state visuals |
| `app.js` | All logic: state array `items`, `render()`, `save()`/`load()` via localStorage |

### State model

`items` is the single source of truth — an in-memory array of `{ text: string, checked: boolean }` objects.
Every mutation (add / toggle / delete) calls `save()` then `render()`. `render()` does a full redraw of `#item-list` each time.

### Persistence

`localStorage` key `"shopping-list"`. Written on every mutation, read once at startup.
