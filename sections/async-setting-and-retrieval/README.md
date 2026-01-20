# Async Setting and Retrieval of State

Understanding closures and asynchronous behavior with React state is crucial for avoiding common bugs. This section explores how closures capture state values and how to work with async operations properly.

## Core Problem: Closures and Stale State

When you use state inside async operations (setTimeout, promises, etc.), closures can capture "stale" (old) values. This leads to two main problems:

1. **Async Setting**: Lost updates when setting state
2. **Async Retrieval**: Reading old values when retrieving state

## Live Examples

### Try the Examples Locally

Each example is a standalone Vite React app:

```bash
cd sections/async-setting-and-retrieval/[example-name]
npm install
npm run dev
```

### Available Examples

#### Part 1: Async Setting (Writing State)

**1. [async-setting-problem](./async-setting-problem/)** - The "Lost Jumps" Bug
- **The problem**: Rapidly clicking only counts as one click!
- **Why**: Each setTimeout captures the same old `count` value
- **Try**: Click "Jump" 3-4 times quickly → only increases by 1
- **Root cause**: Stale closures with `setCount(count + 1)`

**2. [async-setting-non-ideal](./async-setting-non-ideal/)** - External Variable Workaround
- **Workaround**: Using external variable to track count
- **Why it works**: External variable updates immediately, not captured in closure
- **Why it's bad**: Pollutes global scope, shared state, not React-ish
- **Lesson**: Don't do this in real code!

**3. [async-setting-solution](./async-setting-solution/)** - The Proper Solution ✅
- **The solution**: Use updater function `setCount(c => c + 1)`
- **Why it works**: React guarantees updater gets latest state
- **Try**: Click rapidly → all clicks count!
- **Best practice**: Always use updater when new state depends on old state

#### Part 2: Async Retrieval (Reading State)

**4. [async-retrieval-problem](./async-retrieval-problem/)** - Reading Stale State
- **The problem**: setTimeout reads old count value
- **Experiment**: Increment → Click "Display" → Keep incrementing → Alert shows old value!
- **Why**: Closure captured count from when setTimeout was created
- **Key insight**: React's "snapshot" behavior - each render has its own state

**5. [async-retrieval-solution-primitive](./async-retrieval-solution-primitive/)** - Helper Variable (Primitive)
- **Workaround**: External variable to track latest value
- **Why it works**: Variable updates immediately, readable in closure
- **Why it's limited**: Same issues as async-setting-non-ideal
- **Use case**: Understanding the problem, not for production code

**6. [async-retrieval-closure-demo](./async-retrieval-closure-demo/)** - Closure Deep Dive
- **Demonstrates**: How closures capture by reference vs by value
- **Shows**: Difference between primitive and object references
- **Key lesson**: Objects in closures can be mutated and reflect changes
- **Advanced**: Using objects to work around closure limitations

**7. [async-retrieval-object-problem](./async-retrieval-object-problem/)** - Objects Have Same Problem
- **Shows**: Even objects stored in state have the closure problem
- **Try**: Same experiment as #4, but with count in an object
- **Result**: Same issue - closure captures object reference but frozen count
- **Insight**: setState creates NEW objects, so closures see old objects

#### Part 3: Understanding React Behavior

**8. [ref-vs-state-vs-local](./ref-vs-state-vs-local/)** - Comparing Three Approaches
- **Compares**: useState vs useRef vs local variables
- **Shows**: What persists, what triggers re-renders, what changes references
- **Key insights**:
  - useState: New reference each render, triggers re-renders
  - useRef: Same reference across renders, doesn't trigger re-renders
  - Local: Recreated each render
- **Visual**: `Object.is()` comparisons in console

**9. [async-retrieval-object-solution](./async-retrieval-object-solution/)** - Objects and Mutation
- **Demonstrates**: How mutating objects affects closures
- **Shows**: External object updates ARE visible in closures (reference!)
- **Why**: Objects are reference types - mutations affect all references
- **Caution**: This explains behavior, not recommended pattern

### StackBlitz Links

Once the repository is public:

- [async-setting-problem](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/async-setting-and-retrieval/async-setting-problem)
- [async-setting-non-ideal](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/async-setting-and-retrieval/async-setting-non-ideal)
- [async-setting-solution](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/async-setting-and-retrieval/async-setting-solution)
- [async-retrieval-problem](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/async-setting-and-retrieval/async-retrieval-problem)
- [ref-vs-state-vs-local](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/async-setting-and-retrieval/ref-vs-state-vs-local)

## Core Concepts

### Closures in React

A **closure** is when a function "remembers" variables from its outer scope:

```tsx
function Component() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // This function "closes over" count
    setTimeout(() => {
      console.log(count)  // Captures count from when handleClick ran
    }, 1000)
  }

  return <button onClick={handleClick}>Click</button>
}
```

**Key point**: The `count` inside setTimeout is "frozen" at the value it had when `handleClick` was called.

### React's Snapshot Behavior

Each render creates a "snapshot" of props and state:

```tsx
// Render 1: count = 0
<button onClick={() => {
  setTimeout(() => alert(count), 3000)  // Will show 0
}}>Alert</button>

// Click button, count becomes 1, 2, 3...
// 3 seconds later: alert shows 0 (from snapshot!)
```

**This is intentional!** It prevents race conditions and makes React predictable.

### The Updater Function Solution

For **setting** state, use the updater function:

```tsx
// ❌ BAD: Stale closure
setTimeout(() => {
  setCount(count + 1)  // Uses old count
}, 1000)

// ✅ GOOD: Updater function
setTimeout(() => {
  setCount(c => c + 1)  // React provides latest count
}, 1000)
```

**Why it works**: React guarantees the updater function receives the most recent state, even if the closure is stale.

### Reading Latest State (Advanced)

For **reading** state in async operations, you have options:

#### Option 1: useRef (Recommended)

```tsx
const [count, setCount] = useState(0)
const countRef = useRef(count)

// Keep ref in sync
useEffect(() => {
  countRef.current = count
}, [count])

setTimeout(() => {
  alert(countRef.current)  // Always latest!
}, 3000)
```

#### Option 2: Accept the Snapshot (Preferred!)

Often, using the snapshot is actually correct:

```tsx
// User clicks "Send email" with form data
const handleSubmit = () => {
  const dataSnapshot = formData  // Capture current data
  sendEmail(dataSnapshot)  // Send THIS version, not future changes
}
```

**Philosophy**: Embrace snapshots instead of fighting them!

## Common Patterns and Solutions

### Pattern 1: Batched Async Updates

```tsx
// Problem: Multiple async updates
const handleMultipleUpdates = () => {
  fetchData1().then(() => setCount(count + 1))
  fetchData2().then(() => setCount(count + 1))
  fetchData3().then(() => setCount(count + 1))
}

// Solution: Updater function
const handleMultipleUpdates = () => {
  fetchData1().then(() => setCount(c => c + 1))
  fetchData2().then(() => setCount(c => c + 1))
  fetchData3().then(() => setCount(c => c + 1))
}
```

### Pattern 2: Reading State in Event Handlers

```tsx
// The "frozen" value is often what you want!
const handleSave = () => {
  const currentData = formData  // Snapshot

  // Even if formData changes during save,
  // we save the version user clicked "Save" on
  api.save(currentData)
}
```

### Pattern 3: Interval with Latest State

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    // ✅ Updater function gets latest
    setCount(c => c + 1)
  }, 1000)

  return () => clearInterval(interval)
}, [])  // Empty deps - safe because of updater
```

### Pattern 4: Async Operation with Latest Props

```tsx
// Problem: Props change during async operation
useEffect(() => {
  fetchData(userId).then(data => {
    setData(data)  // Might be stale userId!
  })
}, [userId])

// Solution: Cleanup to ignore stale data
useEffect(() => {
  let active = true

  fetchData(userId).then(data => {
    if (active) {  // Only update if still relevant
      setData(data)
    }
  })

  return () => {
    active = false
  }
}, [userId])
```

## Mental Model

Think of each render as a **photograph**:

1. **Photo 1** (count = 0): All functions and callbacks in this render "see" count = 0
2. User clicks button
3. **Photo 2** (count = 1): New functions and callbacks "see" count = 1
4. Old callbacks from Photo 1 still "see" count = 0

**Closures are time travelers** - they remember values from their moment in time!

## Best Practices

### ✅ Do

- Use updater function when new state depends on old state
- Embrace snapshots - they prevent race conditions
- Use `useRef` when you truly need latest value
- Add cleanup functions for async operations
- Trust React's behavior - it's designed this way for good reasons

### ❌ Don't

- Use external variables to work around closures (not React-ish)
- Fight against snapshots unnecessarily
- Forget that closures capture values
- Ignore the dependency array (eslint-plugin-react-hooks helps!)

## Further Reading

- [React useState Documentation](https://react.dev/reference/react/useState)
- [A Complete Guide to useEffect - Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
- [JavaScript Closures - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Why React Re-Renders](https://ui.dev/why-react-renders)

---

**Note:** This example is part of the [React Hooks Workshop](../../README.md). Understanding closures is fundamental to mastering React hooks!
