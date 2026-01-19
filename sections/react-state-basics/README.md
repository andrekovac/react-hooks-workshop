# React State Basics

Understanding how state works in React is fundamental to building React applications. This section covers the core concepts of React state management using the `useState` hook.

## Live Examples

### Try the Examples Locally

Each example is a standalone Vite React app. To run any example:

```bash
cd sections/react-state-basics/[example-name]
npm install
npm run dev
```

### Available Examples

#### 1. Internal vs External State

**[internal-vs-external-state](./internal-vs-external-state/)** - Why regular variables don't work for state
- **The problem**: Shows why neither internal nor external variables work for React state
- **What to observe**:
  - Internal variables reset to 0 on every render
  - External variables don't trigger re-renders
  - Both fail to update the UI!
- **Key lesson**: This is why we need `useState`

#### 2. useState Basic

**[useState-basic](./useState-basic/)** - Introduction to useState
- **The solution**: Shows how `useState` solves both problems
- **What to observe**:
  - State persists across re-renders
  - Updating state triggers re-renders
  - The UI updates correctly!
- **Key concepts**: useState syntax, setter functions, updater pattern

#### 3. Mutable vs Immutable Updates

**[mutable-vs-immutable](./mutable-vs-immutable/)** - Object and array state updates
- **Critical concept**: React uses reference equality to detect changes
- **What to observe**:
  - Broken: Mutating objects doesn't trigger re-renders
  - Working: Creating new objects triggers re-renders
  - Spread operator for copying objects/arrays
- **Key lesson**: Always create NEW objects/arrays when updating state

#### 4. Setter Creates New Objects

**[setter-creates-new-objects](./setter-creates-new-objects/)** - Understanding object references
- **Demonstrates**: How setState creates new object references
- **What to observe** (check console):
  - Each setState call creates a new object reference
  - `Object.is()` shows objects are different after update
  - Even with same values, references differ
- **Key insight**: React compares references, not values

#### 5. One State Change → All States New

**[one-state-change-all-new](./one-state-change-all-new/)** - Re-render behavior
- **Demonstrates**: When one state updates, ALL state variables get new references
- **What to observe** (check console):
  - Updating obj1 makes BOTH obj1 and obj2 have new references
  - Values persist, but variable bindings are recreated
- **Key insight**: Every render creates fresh variable bindings for ALL state

### StackBlitz Links

Once the repository is public, you can open these examples directly in StackBlitz:

- [internal-vs-external-state](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/react-state-basics/internal-vs-external-state)
- [useState-basic](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/react-state-basics/useState-basic)
- [mutable-vs-immutable](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/react-state-basics/mutable-vs-immutable)
- [setter-creates-new-objects](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/react-state-basics/setter-creates-new-objects)
- [one-state-change-all-new](https://stackblitz.com/github/andrekovac/react-hooks-workshop/tree/main/sections/react-state-basics/one-state-change-all-new)

## Core Concepts

### Why useState?

Regular JavaScript variables don't work for React state because:

1. **Internal variables**: Reset on every render (function re-executes)
2. **External variables**: Don't trigger re-renders when changed

`useState` provides:
- ✅ Values that persist across renders
- ✅ Automatic re-renders when state changes
- ✅ React manages the state lifecycle

### useState Syntax

```tsx
const [value, setValue] = useState(initialValue)
```

- `value`: Current state value
- `setValue`: Function to update the state
- `initialValue`: Starting value (only used on first render)

### Updating State

#### Primitive Types (Simple)

```tsx
const [count, setCount] = useState(0)

// Direct value
setCount(5)

// Updater function (safer for multiple updates)
setCount(prev => prev + 1)
```

#### Objects and Arrays (Requires Immutability!)

```tsx
const [obj, setObj] = useState({ count: 0, name: 'Jeff' })

// ❌ DON'T mutate
obj.count++
setObj(obj)  // Won't re-render! Same reference

// ✅ DO create new objects
setObj({ ...obj, count: obj.count + 1 })  // New reference!

// ❌ DON'T mutate arrays
arr.push(newItem)
setArr(arr)  // Won't re-render!

// ✅ DO create new arrays
setArr([...arr, newItem])  // New reference!
setArr(arr.filter(item => item.id !== deleteId))  // filter creates new array
```

### Reference Equality

React uses `Object.is()` (similar to `===`) to detect state changes:

```tsx
const obj1 = { count: 1 }
const obj2 = { count: 1 }
const obj3 = obj1

Object.is(obj1, obj2)  // false (different objects)
Object.is(obj1, obj3)  // true (same reference)

// This is why:
setObj(obj)              // ❌ No re-render (same reference)
setObj({ ...obj })       // ✅ Re-render (new reference)
```

### Immutable Update Patterns

#### Update Single Property

```tsx
// Object
setUser({ ...user, age: user.age + 1 })

// Nested object
setPerson({
  ...person,
  address: {
    ...person.address,
    city: 'New York'
  }
})
```

#### Array Operations

```tsx
// Add item
setItems([...items, newItem])
setItems([newItem, ...items])  // Add to beginning

// Remove item
setItems(items.filter(item => item.id !== deleteId))

// Update item
setItems(items.map(item =>
  item.id === updateId
    ? { ...item, completed: true }
    : item
))

// Replace item at index
setItems([
  ...items.slice(0, index),
  newItem,
  ...items.slice(index + 1)
])
```

### Updater Function Pattern

When new state depends on previous state, use the updater function:

```tsx
// ⚠️ Can be problematic with batching
setCount(count + 1)
setCount(count + 1)  // Both use same 'count' value

// ✅ Safe - each gets latest value
setCount(prev => prev + 1)
setCount(prev => prev + 1)  // Uses updated value from previous call
```

### Re-render Behavior

Important facts about React re-renders:

1. **Entire component re-executes**: All code in your function component runs again
2. **Fresh variables**: All local variables and const/let declarations are recreated
3. **State values persist**: React preserves state values between renders
4. **New state references**: All `useState` calls return fresh references
5. **Dependency arrays**: Effects check if dependencies have changed using `Object.is()`

### Common Mistakes

#### Mistake 1: Mutating State

```tsx
// ❌ Mutates existing object
const handleClick = () => {
  user.age++  // Mutation!
  setUser(user)  // Won't re-render
}

// ✅ Creates new object
const handleClick = () => {
  setUser({ ...user, age: user.age + 1 })
}
```

#### Mistake 2: Forgetting Return in Updater

```tsx
// ❌ Returns undefined
setUser(current => {
  current.age++  // Also mutates!
  // Missing return statement
})

// ✅ Returns new object
setUser(current => ({
  ...current,
  age: current.age + 1
}))
```

#### Mistake 3: Multiple Related States

```tsx
// ⚠️ Can get out of sync
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [fullName, setFullName] = useState('')

// ✅ Derive when possible
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const fullName = `${firstName} ${lastName}`

// ✅ Or use single object
const [user, setUser] = useState({
  firstName: '',
  lastName: '',
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
})
```

## Best Practices

### ✅ Do

- Use the updater function when new state depends on old state
- Create new objects/arrays for state updates
- Keep state as simple as possible
- Derive values instead of storing them when possible
- Use TypeScript to catch type errors

### ❌ Don't

- Mutate state objects or arrays directly
- Store derived data in state
- Use external variables for component state
- Forget that state updates are asynchronous
- Rely on state immediately after setState (it's batched)

## Progressive Learning Path

The examples are ordered to build understanding:

1. **internal-vs-external-state**: See the problem (why variables don't work)
2. **useState-basic**: Learn the solution (useState basics)
3. **mutable-vs-immutable**: Understand critical immutability concept
4. **setter-creates-new-objects**: Deep dive into reference equality
5. **one-state-change-all-new**: Understand render behavior

## Further Reading

- [React useState Documentation](https://react.dev/reference/react/useState)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Queueing State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)

---

**Note:** This example is part of the [React Hooks Workshop](../../README.md). All examples follow the same pattern (self-contained Vite apps) for consistency and ease of use.