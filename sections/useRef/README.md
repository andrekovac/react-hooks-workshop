# `useRef` Hook

The `useRef` hook provides a way to persist values across renders without causing re-renders, and to reference DOM elements directly.

## Live Examples

### Try the Examples Locally

Each example is a standalone Vite React app. To run any example:

```bash
cd sections/useRef/[example-name]
npm install
npm run dev
```

### Available Examples

1. **[ref-vs-state-vs-local](./ref-vs-state-vs-local/)** - Compare `useRef`, `useState`, and local variables
2. **[ref-vs-external-variable](./ref-vs-external-variable/)** - Understand component instance vs global scope
3. **[async-state-timeout-ref](./async-state-timeout-ref/)** - See how refs solve the stale closure problem

### StackBlitz Links

Once the repository is public, you can open these examples directly in StackBlitz:

- [ref-vs-state-vs-local](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useRef/ref-vs-state-vs-local)
- [ref-vs-external-variable](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useRef/ref-vs-external-variable)
- [async-state-timeout-ref](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useRef/async-state-timeout-ref)

## Key Concepts

### `useRef` is **stable across re-renders**

- React stores the ref to remain immutable over the course of the lifetime of the component (especially if the contents (i.e. `ref.current` value) gets mutated). Thus, `useRef` value remains the same across re-renders.
- When to use it? - You need a sort of data storage which doesn't influnce re-renders and which is tied to the component, so it's not a global variable.
- **[Live Example: ref-vs-state-vs-local](./ref-vs-state-vs-local/)** shows the difference to an object value in `useState` and local variables.

**What the example demonstrates:**
- `useState` object: Always different on each render (triggers re-render)
- `useRef` object: Same object reference across all renders (stable)
- Function: Recreated on every render (different reference)
- Local variable: Always recreated

### `useRef` is **bound to a component instance**

- `useRef` is bound to a component instance (as is `useState` btw).
- **[Live Example: ref-vs-external-variable](./ref-vs-external-variable/)** shows the difference between instance-bound refs and global variables.

**What the example demonstrates:**
- External variable (`countCache`): Shared between ALL component instances
- `useRef` (`countRef`): Each instance has its own independent value
- Try clicking buttons in both counters to see the difference!

### `useRef` reflects "current" value irrespective of re-renders

- Using `ref` displays current value because the ref object is guaranteed to remain stable for the lifetime of the component.
- **[Live Example: async-state-timeout-ref](./async-state-timeout-ref/)** demonstrates the stale closure problem and how refs solve it.

**What the example demonstrates:**
- **Stale closure**: State value "closes over" the timeout - it's frozen at the moment the timeout was created
- **Ref solution**: `countRef.current` always provides the latest value, even in async callbacks
- **Interactive task**: Click "Show alert", then quickly increment the counter several times before the alert shows

**Key observations:**
- State alert shows the OLD value (closure)
- Ref alert shows the LATEST value (mutable reference)

#### React Native Question

**Why is React Native `Animated` value stored in ref?**

**Answer**: Because we want Animation value to change independent of rendering of component in which animated value gets defined.

You don't have any guarantees that reading the refs value `countRef.current` would give you the same value in any particular callback (as opposed to state and props values). By definition, you can mutate it any time.

### **[React 19.2+]** Modern Alternative: `useEffectEvent`

- The pattern of using `useRef` to keep the latest value for use in Effects (or callbacks) was so common that React 19.2 introduced the [`useEffectEvent`](../useEffectEvent/README.md) hook as a cleaner alternative.

**When to use `useRef`**: When you need a mutable value that persists across renders (DOM references, timers, animation values, any mutable instance variable)

**When to use `useEffectEvent`**: When you need to read the latest props/state inside Effects without causing re-runs

See the [`useEffectEvent` section](../useEffectEvent/README.md) for a detailed comparison and migration guide from the ref pattern.

## Common Use Cases

### 1. DOM References

```tsx
const inputRef = useRef<HTMLInputElement>(null)

// Focus the input
const focusInput = () => {
  inputRef.current?.focus()
}

return <input ref={inputRef} />
```

### 2. Storing Mutable Values

```tsx
const intervalRef = useRef<NodeJS.Timeout>()

useEffect(() => {
  intervalRef.current = setInterval(() => {
    // Do something
  }, 1000)

  return () => clearInterval(intervalRef.current)
}, [])
```

### 3. Previous Value Tracking

```tsx
const prevValueRef = useRef<number>()

useEffect(() => {
  prevValueRef.current = value
}, [value])

// prevValueRef.current is the previous value
```

## **[Extra]** Other definition of `ref`

In a [tweet](https://twitter.com/dan_abramov/status/1099842565631819776) Dan Abramov gave an interesting definition of a ref:

> `useRef()` is basically `useState({ current: initialValue })[0]`

**Discussion**: Why does this make sense?

Think about it:
- Both create an object that persists across renders
- Both give you the same object reference on every render
- The difference: `useState` triggers re-renders when you update it, `useRef` doesn't
- `useRef` is like having state without the re-render trigger

This mental model helps understand that:
- The ref object itself never changes (same reference)
- Only `ref.current` changes (mutable property)
- No re-render happens when you mutate `ref.current`

## Comparison Table

| Feature | `useState` | `useRef` | Local Variable | External Variable |
|---------|-----------|----------|----------------|-------------------|
| Persists across renders | ✅ | ✅ | ❌ (recreated) | ✅ |
| Triggers re-render | ✅ | ❌ | ❌ | ❌ |
| Bound to instance | ✅ | ✅ | ✅ | ❌ (global) |
| Mutable | ❌ | ✅ | ✅ | ✅ |
| Use case | Reactive data | Mutable data, DOM refs | Temp calculations | Shared state |

## Further Reading

- [React useRef Documentation](https://react.dev/reference/react/useRef)
- [useEffectEvent Hook (React 19.2+)](../useEffectEvent/README.md)
- [Why need useRef and not mutable variable?](https://stackoverflow.com/questions/57444154/why-need-useref-and-not-mutable-variable)

---

**Note:** This example is part of the [React Hooks Workshop](../../README.md). All examples follow the same pattern (self-contained Vite apps) for consistency and ease of use.