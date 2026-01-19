# `useLayoutEffect` Hook

The `useLayoutEffect` hook has the same signature as `useEffect`, but it fires synchronously **after all DOM mutations but before the browser paints to the screen**. This makes it perfect for DOM measurements and preventing visual flickering.

## When to Use `useLayoutEffect`

> If your component is **flickering** when state is updated – as in, it renders in a partially-ready state first and then immediately re-renders in its final state – that's a good clue that it's time to swap in `useLayoutEffect`.

**Use `useLayoutEffect` when you need to:**
- Read layout from the DOM and synchronously re-render
- Measure DOM elements (width, height, position)
- Synchronize animations
- Prevent visual inconsistencies or flickering

**Otherwise, prefer `useEffect`** because `useLayoutEffect` blocks the browser from painting, which can hurt performance.

## Live Examples

### Try the Examples Locally

Each example is a standalone Vite React app. To run any example:

```bash
cd sections/useLayoutEffect/[example-name]
npm install
npm run dev
```

### Available Examples

#### 1. Flickering Problem

**[flickering-problem](./flickering-problem/)** - Demonstrates visual flickering with `useEffect`
- **The issue**: Using `useEffect` to update DOM measurements causes visible flicker
- **What to observe**:
  1. Resize the textarea by dragging the corner
  2. **Click inside the textarea** (don't type!) to trigger a re-render
  3. Watch the width/height numbers - they may flicker/flash briefly
  4. The flicker is subtle and doesn't happen every time - try multiple times
- **Important**: Don't type in the textarea - just click to trigger re-renders
- **Why it happens**: `useEffect` runs AFTER paint, so you see incorrect dimensions momentarily
- **Educational value**: Shows why timing matters for DOM updates

#### 2. Flickering Solution

**[flickering-solution](./flickering-solution/)** - Fixes flickering using `useLayoutEffect`
- **The solution**: `useLayoutEffect` runs before paint, preventing flicker
- **What to observe**:
  1. Resize the textarea by dragging the corner
  2. **Click inside the textarea** (don't type!) to trigger a re-render
  3. Watch the width/height numbers update smoothly with no flicker!
  4. Open both examples side-by-side to compare the difference
- **Why it works**: `useLayoutEffect` runs BEFORE paint, so dimensions are correct before you see anything
- **Key concepts**: Effect timing, dependency array with refs, DOM measurements
- **Limitation**: Still requires clicking to trigger updates

#### 3. Complete Solution (Production-Ready) 🎉

**[complete-solution](./complete-solution/)** - The full solution using ResizeObserver
- **The complete fix**: Combines `ResizeObserver` API + `useLayoutEffect`
- **What to observe**:
  1. Just resize the textarea by dragging the corner
  2. Watch the width/height numbers update **automatically**!
  3. No clicking needed, no flickering, perfect updates!
- **How it works**:
  - `ResizeObserver` detects when the element resizes (no click needed!)
  - `useLayoutEffect` ensures updates happen before paint (no flicker!)
- **Key concepts**: ResizeObserver API, automatic resize detection, proper cleanup
- **This is the production-ready approach** for measuring and tracking element dimensions

### StackBlitz Links

Once the repository is public, you can open these examples directly in StackBlitz:

- [flickering-problem](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useLayoutEffect/flickering-problem)
- [flickering-solution](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useLayoutEffect/flickering-solution)
- [complete-solution](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useLayoutEffect/complete-solution)

## Effect Timing Comparison

Understanding the difference between `useEffect` and `useLayoutEffect`:

### `useEffect` (Default Choice)
```
1. React renders your component
2. Browser paints screen (user sees content)
3. useEffect runs
4. If effect updates state → re-render → paint again
```

**Result**: User may see intermediate state (flickering)

### `useLayoutEffect` (For DOM Measurements)
```
1. React renders your component
2. useLayoutEffect runs (synchronously, blocks painting)
3. If effect updates state → re-render immediately
4. Browser paints screen (user sees final state)
```

**Result**: User only sees final state (no flickering)

## Basic Usage

```tsx
import { useLayoutEffect, useRef, useState } from 'react'

function Component() {
  const [width, setWidth] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // This runs BEFORE the browser paints
    if (elementRef.current) {
      setWidth(elementRef.current.clientWidth)
    }
  }, [])

  return <div ref={elementRef}>Width: {width}px</div>
}
```

## Common Use Cases

### 1. Measuring DOM Elements

```tsx
useLayoutEffect(() => {
  const box = ref.current
  if (box) {
    const { width, height } = box.getBoundingClientRect()
    setDimensions({ width, height })
  }
}, [])
```

### 2. Synchronizing Scroll Position

```tsx
useLayoutEffect(() => {
  const element = ref.current
  if (element) {
    element.scrollTop = scrollPosition
  }
}, [scrollPosition])
```

### 3. Preventing Animation Flash

```tsx
useLayoutEffect(() => {
  const element = ref.current
  if (element) {
    // Set initial animation state before paint
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
  }
}, [])
```

## Dependency Array with Refs

A common pattern when using `useLayoutEffect` with refs:

```tsx
function Component() {
  const ref = useRef<HTMLDivElement>(null)

  // ❌ Don't do this - ref.current in deps is problematic
  useLayoutEffect(() => {
    // ...
  }, [ref.current?.clientWidth])

  // ✅ Do this - extract to variables for proper tracking
  const width = ref.current?.clientWidth
  useLayoutEffect(() => {
    // ...
  }, [width])
}
```

**Why?** Ref mutations don't trigger re-renders, so ESLint can't properly track dependencies when you use `ref.current` directly in the dependency array.

## ResizeObserver API (Complete Solution)

The third example demonstrates the **production-ready approach** using the ResizeObserver API:

```tsx
useLayoutEffect(() => {
  const element = ref.current
  if (!element) return

  // Set initial dimensions
  setWidth(element.clientWidth)
  setHeight(element.clientHeight)

  // Create observer to watch for resize events
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect
      setWidth(Math.round(width))
      setHeight(Math.round(height))
    }
  })

  // Start observing
  resizeObserver.observe(element)

  // Cleanup
  return () => resizeObserver.disconnect()
}, [])
```

### Why ResizeObserver?

- **Automatic**: Fires whenever the observed element changes size
- **Efficient**: Only runs when actual resize happens (no polling needed)
- **Accurate**: Provides exact dimensions via `contentRect`
- **Native**: Built into modern browsers (no library needed)
- **Better than alternatives**:
  - `window.resize` only detects window resizes, not individual elements
  - `MutationObserver` watches DOM structure, not dimensions
  - Polling with `setInterval` is inefficient and can miss changes

### Browser Support

ResizeObserver is supported in all modern browsers:
- Chrome 64+
- Firefox 69+
- Safari 13.1+
- Edge 79+

For older browsers, polyfills are available.

<h2>Key Concepts Demonstrated</h2>

<h3>1. Effect Timing</h3>

The examples show the critical difference in when effects run:
- `useEffect`: After paint (asynchronous)
- `useLayoutEffect`: Before paint (synchronous)

<h3>2. A-typical `useState` Usage</h3>

In the examples, clicking the textarea sets width to `undefined`:
```tsx
onClick={() => setWidth(undefined)}
```

**Bonus question**: What value could you pass to `setWidth()` to prevent re-rendering?

**Answer**: Pass the current width value (e.g., `177`). React's `useState` has built-in optimization - setting state to the same value won't trigger a re-render.

<h3>3. Dependency Array with Refs</h3>

The examples demonstrate:
- Why `ref.current` in deps causes ESLint warnings
- How to extract ref values for proper static analysis
- That setter functions (like `setWidth`) are stable and safe in deps

<h2>React Hooks Lifecycle</h2>

Understanding when hooks run in relation to rendering and painting:

![React Hook Flow Diagram](https://github.com/donavon/hook-flow/blob/master/hook-flow.png?raw=true)

**Notes:**
- "Render" is a **React** render, not a DOM update or paint to screen
- `useLayoutEffect` runs after DOM mutations but before paint
- `useEffect` runs after paint (asynchronous)
- Lazy initializers: Using a function as initial state in `useState` instead of a value

<h2>Best Practices</h2>

<h3>✅ Do</h3>

- Use `useLayoutEffect` when you need DOM measurements
- Use it to prevent visual flickering
- Extract ref values to variables for dependency tracking
- Keep effects focused and minimal (they block painting!)

<h3>❌ Don't</h3>

- Use `useLayoutEffect` by default (prefer `useEffect`)
- Put slow computations in `useLayoutEffect` (blocks painting)
- Use `ref.current` directly in dependency arrays
- Forget that it blocks the browser (can cause performance issues)

<h2>Performance Considerations</h2>

`useLayoutEffect` runs **synchronously** and **blocks painting**. This means:

**Good for:**
- Quick DOM measurements
- Preventing layout shifts
- Synchronizing animations

**Bad for:**
- Heavy computations
- API calls
- Complex state calculations

**Rule of thumb**: If your effect doesn't need to run before paint, use `useEffect` instead.

<h2>React Native Considerations</h2>

In React Native, `useLayoutEffect` can be essential for:
- Measuring components on mount
- Setting up animations before first render
- Any measurement that needs to happen before the user sees the component

Note that `useEffect` in React Native would run too late for these use cases.

<h2>Further Reading</h2>

- [React useLayoutEffect Documentation](https://react.dev/reference/react/useLayoutEffect)
- [useEffect vs useLayoutEffect by Dave Ceddia](https://daveceddia.com/useeffect-vs-uselayouteffect/)
- [Kent C. Dodds: useState Lazy Initialization](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)
- [React Hook Flow Diagram](https://github.com/donavon/hook-flow)

---

**Note:** This example is part of the [React Hooks Workshop](../../README.md). All examples follow the same pattern (self-contained Vite apps) for consistency and ease of use.