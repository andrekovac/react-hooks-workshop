# `useEffect` Hook

The `useEffect` hook lets you perform side effects in functional components. It runs asynchronously after the component renders and can be configured to run on mount, on updates, or when specific dependencies change.

## Live Examples

### Try the Examples Locally

Each example is a standalone Vite React app. To run any example:

```bash
cd sections/useEffect/[example-name]
npm install
npm run dev
```

### Available Examples

#### 1. Basic Data Fetching

**[fetch-movies-starter](./fetch-movies-starter/)** - Starter code for data fetching exercise
- **Task**: Fetch movies from an API on component mount
- **Learning goals**: Basic useEffect usage, dependency array, async data fetching

**[fetch-movies-solution](./fetch-movies-solution/)** - Complete solution with explanations
- **Demonstrates**: useState for loading/data, useEffect with empty dependency array
- **Key concepts**: Running effects on mount, handling loading states, async/await in effects

#### 2. Race Conditions

**[race-condition-problem](./race-condition-problem/)** - Demonstrates the race condition bug
- **The problem**: Multiple rapid requests can complete in wrong order
- **Try it**: Click "Fetch data!" rapidly and watch for mismatched IDs (red text)
- **Shows**: Why cleanup functions are essential for async operations

**[race-condition-solution](./race-condition-solution/)** - Solution using cleanup function
- **The solution**: Cleanup function with `active` flag prevents stale updates
- **Key concept**: Effect closures and cleanup lifecycle
- **Demonstrates**: Proper handling of async race conditions

### StackBlitz Links

Once the repository is public, you can open these examples directly in StackBlitz:

- [fetch-movies-starter](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useEffect/fetch-movies-starter)
- [fetch-movies-solution](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useEffect/fetch-movies-solution)
- [race-condition-problem](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useEffect/race-condition-problem)
- [race-condition-solution](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/useEffect/race-condition-solution)

## Key Concepts

### Basic Usage

`useEffect` runs side effects after render:

```tsx
useEffect(() => {
  // Side effect code here
  console.log('Component rendered!')
})
```

### Dependency Array

The dependency array controls when the effect runs:

```tsx
// Runs on every render
useEffect(() => {
  console.log('Every render')
})

// Runs once on mount (empty array)
useEffect(() => {
  console.log('Only on mount')
}, [])

// Runs when 'count' changes
useEffect(() => {
  console.log('Count changed:', count)
}, [count])
```

**Mental model**: Don't think of dependencies as values which trigger lifecycle events. An effect bundles functionality given its dependencies. The empty dependency array `[]` might be an exception to this mental model.

### Cleanup Function

Return a cleanup function to run when the component unmounts or before the effect re-runs:

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)

  // Cleanup: Clear the interval
  return () => {
    clearInterval(timer)
  }
}, [])
```

### Race Conditions in Data Fetching

When implementing data fetching with useEffect, you must prevent **race conditions**.

**The Problem:**
When a component re-renders with new props before a previous fetch completes, you can display stale data:

```tsx
useEffect(() => {
  fetch(`/api/data/${id}`)
    .then(res => res.json())
    .then(data => setData(data))
}, [id])

// BUG: If id changes quickly, old fetches can overwrite newer data!
```

**The Solution:**
Use a cleanup function with an `active` flag:

```tsx
useEffect(() => {
  let active = true

  fetch(`/api/data/${id}`)
    .then(res => res.json())
    .then(data => {
      if (active) {  // Only update if still active
        setData(data)
      }
    })

  return () => {
    active = false  // Mark as inactive on cleanup
  }
}, [id])
```

**How it works:**
1. Each effect creates a new closure with `active = true`
2. The cleanup function from the PREVIOUS effect runs, setting its `active` to false
3. When old requests complete, they check `active` and skip updating state
4. Only the latest request has `active = true` and updates state

**See it in action:** Check out the [race-condition-problem](./race-condition-problem/) and [race-condition-solution](./race-condition-solution/) examples!

### React 19 & StrictMode

React's StrictMode helps you spot bugs related to forgotten cleanup functions by **remounting every component once immediately after its initial mount** in development.

This means your effects will run twice on mount during development:
1. Mount → Effect runs → Cleanup runs
2. Mount again → Effect runs

This is intentional! It helps catch issues like:
- Missing cleanup functions
- Race conditions
- Side effects that aren't idempotent

**In production**, effects only run once as expected.

## Common Use Cases

### 1. Data Fetching

```tsx
useEffect(() => {
  let active = true

  async function fetchData() {
    const response = await fetch('/api/data')
    const data = await response.json()
    if (active) {
      setData(data)
    }
  }

  fetchData()

  return () => {
    active = false
  }
}, [])
```

### 2. Subscriptions

```tsx
useEffect(() => {
  const subscription = api.subscribe(userId, data => {
    setData(data)
  })

  return () => {
    subscription.unsubscribe()
  }
}, [userId])
```

### 3. Timers

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setShowMessage(true)
  }, 3000)

  return () => clearTimeout(timer)
}, [])
```

### 4. Event Listeners

```tsx
useEffect(() => {
  function handleResize() {
    setWindowWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

<h2>Best Practices</h2>

<h3>✅ Do</h3>

- Always include all dependencies in the dependency array (use `eslint-plugin-react-hooks`)
- Use cleanup functions for subscriptions, timers, and async operations
- Handle race conditions for async operations
- Keep effects focused on a single concern

<h3>❌ Don't</h3>

- Perform mutations in effects without cleanup
- Ignore the dependency array (disabling `exhaustive-deps` rule)
- Fetch data without handling race conditions
- Put too much logic in a single effect

<h2>You Might Not Need an Effect</h2>

Many common use cases don't actually need `useEffect`:

<h3>Transforming Data for Rendering</h3>

**❌ Don't do this:**
```tsx
const [fullName, setFullName] = useState('')

useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])
```

**✅ Do this:**
```tsx
const fullName = `${firstName} ${lastName}`
```

<h3>Handling User Events</h3>

**❌ Don't do this:**
```tsx
useEffect(() => {
  if (clicked) {
    // Handle click
  }
}, [clicked])
```

**✅ Do this:**
```tsx
function handleClick() {
  // Handle click directly in event handler
}
```

<h3>Recommendations for Data Fetching</h3>

While our examples show basic data fetching with `useEffect`, for production apps consider:

1. **Use a data fetching library**: React Query, SWR, or Apollo Client
2. **Create a custom hook**: Encapsulate fetching logic in a reusable `useData` hook
3. **Use React Server Components**: In Next.js 13+, fetch on the server instead

See the [React docs on "You Might Not Need an Effect"](https://react.dev/learn/you-might-not-need-an-effect#fetching-data) for more details.

<h2>Further Reading</h2>

- [React useEffect Documentation](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)
- [Race Conditions Blog Post by Max Rozen](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)

---

**Note:** This example is part of the [React Hooks Workshop](../../README.md). All examples follow the same pattern (self-contained Vite apps) for consistency and ease of use.