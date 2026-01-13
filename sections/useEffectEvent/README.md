# useEffectEvent Hook (React 19.2+)

## Overview

`useEffectEvent` is a stable React hook (as of React 19.2) that separates event-like logic from Effect reactivity. It allows you to read the latest props and state inside Effects without causing the Effect to re-run when those values change.

**Think of it as:** A way to extract non-reactive logic from Effects while still accessing the latest values.

## The Problem

When you need to read the latest props/state inside an Effect, you typically add them to the dependency array. But this causes the Effect to re-run every time those values change, even when you don't want it to.

**Example scenario:** A chat room that logs analytics with the current theme:

```tsx
useEffect(() => {
  connectToChatRoom(roomId);
  logAnalytics(theme); // Need latest theme
  return () => disconnectFromChatRoom(roomId);
}, [roomId, theme]); // ⚠️ Problem: changing theme disconnects chat!
```

The issue: Changing the theme triggers the Effect cleanup (disconnect) and re-run (reconnect), even though the chat room hasn't changed.

## The Solution: useEffectEvent

Extract the non-reactive logic (analytics) into an Effect Event:

```tsx
const onConnected = useEffectEvent(() => {
  logAnalytics(theme); // Reads latest theme
});

useEffect(() => {
  connectToChatRoom(roomId);
  onConnected(); // Call Effect Event
  return () => disconnectFromChatRoom(roomId);
}, [roomId]); // ✅ Only roomId triggers re-run
```

Now changing the theme doesn't disconnect the chat, but the analytics still logs the correct theme value!

## Live Examples

### Try it Yourself

**Local Development:**

```bash
cd sections/useEffectEvent
npm install
npm run dev
```

**StackBlitz (Online):**

You can open it directly in StackBlitz:

```
https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useEffectEvent
```

## What's Inside

The example demonstrates three scenarios:

### ❌ Problem Tab

Shows the issue: changing the theme causes unnecessary chat disconnection/reconnection. Watch the console logs to see the Effect running when theme changes.

### ✅ Solution Tab

Uses `useEffectEvent` to fix the problem. Theme changes no longer cause reconnection, but analytics still logs the latest theme value.

### 🚀 Advanced Tab

Demonstrates advanced patterns:

- Multiple Effect Events in one Effect
- Effect Events that return values
- Reading multiple non-reactive values

## Code Walkthrough

### Basic Usage

```tsx
import { useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, theme }) {
  // Create an Effect Event
  const onConnected = useEffectEvent(() => {
    console.log("Connected with theme:", theme);
    // theme is read here but doesn't trigger Effect re-runs
  });

  useEffect(() => {
    connectToChatRoom(roomId);
    onConnected(); // Call the Effect Event
    return () => disconnectFromChatRoom(roomId);
  }, [roomId]); // theme is NOT in dependencies
}
```

### Key Points

1. **Create Effect Events** outside Effects but inside your component
2. **Call them** only from inside Effects (enforced by ESLint)
3. **Don't add them** to dependency arrays (they're stable)
4. **Use them** to read latest non-reactive values

## Key Concepts

### Effect Events vs. Regular Functions

| Feature             | Regular Function | Effect Event    |
| ------------------- | ---------------- | --------------- |
| Triggers re-runs    | Yes (if in deps) | No              |
| Reads latest values | No (closure)     | Yes             |
| Can be called       | Anywhere         | Only in Effects |
| Stable reference    | No               | Yes             |

### When to Use useEffectEvent

Use `useEffectEvent` when:

- ✅ You need to read latest props/state in an Effect
- ✅ Those values shouldn't trigger Effect re-runs
- ✅ The logic is event-like (logging, notifications, non-reactive operations)

Don't use it to:

- ❌ Avoid adding legitimate dependencies
- ❌ Hide bugs in your Effect
- ❌ Make your code less clear

### ESLint Rules

The `eslint-plugin-react-hooks` (v6.1.1+) enforces proper usage:

- Effect Events must only be called inside Effects
- Effect Events should not be passed to other components
- Effect Events are automatically excluded from dependency arrays

## Common Pitfalls

### 1. Calling Effect Events Outside Effects

```tsx
// ❌ Wrong
const onConnected = useEffectEvent(() => { ... })
onConnected() // Called directly in component body

// ✅ Correct
useEffect(() => {
  onConnected() // Called inside Effect
}, [roomId])
```

### 2. Passing Effect Events as Props

```tsx
// ❌ Wrong
const onConnected = useEffectEvent(() => { ... })
<Child onConnect={onConnected} />

// ✅ Correct
const handleConnect = () => { ... }
<Child onConnect={handleConnect} />
```

### 3. Using It as a Dependency Shortcut

```tsx
// ❌ Wrong - hiding legitimate dependencies
const onData = useEffectEvent(() => {
  setData(processData(apiResponse));
});
useEffect(() => {
  onData(); // apiResponse should be in deps!
}, []);

// ✅ Correct - include reactive dependencies
useEffect(() => {
  setData(processData(apiResponse));
}, [apiResponse]);
```

## Comparison with useCallback

### useCallback

- Creates a memoized callback
- Needs to be in dependency arrays
- Re-created when dependencies change
- Can be called anywhere

### useEffectEvent

- Creates a stable callback
- Should NOT be in dependency arrays
- Never re-created
- Can ONLY be called in Effects

**Use `useCallback`** when you need a stable callback for props or regular use.

**Use `useEffectEvent`** when you need to read latest values in Effects without triggering re-runs.

## Historical Context: The Ref Workaround

Before `useEffectEvent` was introduced in React 19.2, developers commonly used `useRef` to solve this problem. Here's how the same chat room example would have been written:

### The Old Way (Pre-React 19.2)

```tsx
import { useEffect, useRef } from 'react'

function ChatRoom({ roomId, theme }) {
  // Store latest theme in a ref
  const themeRef = useRef(theme)

  // Keep ref updated with latest theme
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    connectToChatRoom(roomId)
    logAnalytics(themeRef.current) // Read from ref
    return () => disconnectFromChatRoom(roomId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]) // theme not in deps, ESLint complains
}
```

### The New Way (React 19.2+)

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    logAnalytics(theme) // Directly read latest theme
  })

  useEffect(() => {
    connectToChatRoom(roomId)
    onConnected()
    return () => disconnectFromChatRoom(roomId)
  }, [roomId]) // Clean, no ESLint complaints
}
```

### Why `useEffectEvent` is Better

1. **Less boilerplate** - No need for separate ref and synchronization Effect
2. **No ESLint warnings** - Properly recognized by the linter
3. **Clearer intent** - The name tells you what it's for
4. **Type-safe** - Better TypeScript inference

If you see the ref pattern in older codebases (or in the [`useRef` section](../useRef.md) of this workshop), you now know it can be modernized with `useEffectEvent`!

## Further Reading

- [React 19.2 Release Notes](https://react.dev/blog/2025/10/01/react-19-2)
- [useEffectEvent Official Documentation](https://react.dev/reference/react/useEffectEvent)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) by Dan Abramov
- [React 19.2 Feature Overview](https://blog.logrocket.com/react-19-2-is-here/)

## Related Hooks

- [`useEffect`](../useEffect.md) - The hook that useEffectEvent complements
- [`useCallback`](../useCallback.md) - For memoizing callbacks (different use case)
- [`useMemo`](../useMemo.md) - For memoizing values

---

**Note:** This example is part of the [React Hooks Workshop](../../README.md). The pattern used here (self-contained Vite app) will be applied to all other hook examples as we migrate from CodeSandbox to local/StackBlitz examples.
