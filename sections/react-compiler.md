## React Compiler (React 19+)

The React Compiler is a build-time tool that automatically optimizes React applications through automatic memoization. It aims to reduce or eliminate the need for manual performance optimizations like `useMemo`, `useCallback`, and `React.memo`.

## How React Compiler Works

React Compiler analyzes your code at build time and automatically:
- Memoizes function references (similar to `useCallback`)
- Memoizes computed values (similar to `useMemo`)
- Optimizes component re-renders (similar to `React.memo`)

## Interactive Examples in This Workshop

This workshop includes two interactive examples that demonstrate what React Compiler can and cannot optimize:

### Example 1: Parent Re-renders → Child Re-renders

**File**: `src/pages/performance/page1/Problem.tsx`

**Setup**:
- `MovieBasic` component WITHOUT `React.memo`
- Parent component re-renders every second (views update)
- Child props (`title`, `year`, `showtimes`) don't change

**Question**: Does React Compiler prevent `MovieBasic` from re-rendering?

**Compare with**: `src/pages/performance/page1/Solution2Memo.tsx` (uses manual `React.memo`)

### Example 2: Function Props Breaking Memoization

**File**: `src/pages/performance/page2/Problem.tsx`

**Setup**:
- `MemoizedMovie` component WITH `React.memo`
- Handler function `handleToggleWatchlist` recreated every render
- New function reference breaks `React.memo` shallow comparison

**Question**: Does React Compiler fix this by automatically memoizing the handler?

**Compare with**: `src/pages/performance/page2/Solution2UseCallback.tsx` (uses manual `useCallback`)

## Student Task: Test React Compiler

### Step 1: Enable/Disable React Compiler

Edit `vite.config.ts` and toggle the compiler:

```typescript
const ReactCompilerConfig = {
  sources: (_filename: string) => {
    return true;  // Enable: true | Disable: false
  },
};
```

### Step 2: Test Both Examples

1. **With React Compiler DISABLED** (`return false`):
   - Run the app: `npm run dev`
   - Open browser console
   - Navigate to `/performance/1` - observe console logs
   - Navigate to `/performance/2` - observe console logs
   - Note which components re-render unnecessarily

2. **With React Compiler ENABLED** (`return true`):
   - Change config to `return true`
   - Restart dev server
   - Navigate to `/performance/1` - observe console logs
   - Navigate to `/performance/2` - observe console logs
   - Note which components still re-render

3. **Compare Results**:
   - Which page does React Compiler help with?
   - Which page still has unnecessary re-renders?
   - Why the difference?

### Step 3: Check React DevTools Profiler

Open React DevTools Profiler while testing:
- Notice components may show as "Memoized by React Compiler"
- BUT they might still re-render!
- This reveals an important limitation

## What You'll Discover

### React Compiler Successfully Optimizes:
- ✅ **Function memoization** (Example 2): Automatically memoizes `handleToggleWatchlist`, making `React.memo` work effectively
- ✅ **Value memoization**: Automatically memoizes computed values within components
- ✅ **Some component-level optimizations**: In simple, isolated cases

### React Compiler Limitations:
- ❌ **Component re-renders from parent updates** (Example 1): Cannot reliably prevent child re-renders when parent updates, even when child props haven't changed
- ❌ **Complex dependency tracking**: May fail silently with certain patterns (e.g., non-memoized objects from third-party hooks)
- ❌ **DevTools can be misleading**: Components may show as "memoized" but still re-render

## Key Insights

### Why Example 1 Still Needs Manual `React.memo`:

Even with React Compiler, `MovieBasic` re-renders because:
1. Parent component (`MoviesList`) re-renders when `views` state updates
2. React Compiler memoizes the component but the optimization fails in practice
3. Manual `React.memo` provides a reliable, explicit boundary

### Why Example 2 Works With React Compiler:

React Compiler successfully fixes this because:
1. `MemoizedMovie` already has `React.memo` wrapper
2. Compiler automatically memoizes `handleToggleWatchlist` (like `useCallback`)
3. Stable function reference → `React.memo` comparison succeeds → no re-render

### Why `showtimes` Array Doesn't Break `React.memo`:

Students often wonder: "Arrays are reference types - shouldn't they break `React.memo`?"

**Answer**: The `showtimes` array has a **stable reference** because:
```typescript
// movies.ts - Module-level constant
const movies = [
  {
    id: 1,
    showtimes: [ /* Created ONCE when module loads */ ]
  }
];
```

- Array created once at module load time
- Destructuring `({ showtimes })` extracts the **same reference** every render
- Same reference → `===` comparison succeeds → `React.memo` works

**This would break it:**
```typescript
// ❌ New array every render
<MovieBasic showtimes={[...showtimes]} />

// ❌ Movies recreated in component
const MoviesList = () => {
  const movies = [ /* New array every render */ ];
}
```

## Current Status (2026)

**React Compiler v19.1.0-rc.2** (installed in this project):
- Stable and production-ready at Meta (Meta Quest Store)
- Excellent at memoizing functions and values
- Still has limitations with component-level optimizations
- Works alongside manual optimizations (no need to remove existing `useMemo`/`useCallback`/`React.memo`)

## Conclusion

React Compiler is a powerful tool that eliminates much manual memoization, but it's **not magic**:
- Reduces boilerplate for `useCallback` and `useMemo`
- Makes `React.memo` more effective by memoizing function props
- BUT manual `React.memo` is still valuable for reliable component-level optimization
- Understanding memoization fundamentals remains crucial

## Resources

- [Official React Compiler Documentation](https://react.dev/learn/react-compiler)
- [React Compiler Introduction](https://react.dev/learn/react-compiler/introduction)
- [I tried React Compiler today](https://www.developerway.com/posts/i-tried-react-compiler) - Real-world testing and limitations
- [Meta's React Compiler 1.0 Announcement](https://www.infoq.com/news/2025/12/react-compiler-meta/)
- [React Compiler Working Group](https://github.com/reactwg/react-compiler)

## Discussion Questions

1. In what scenarios would you still use manual `React.memo` even with React Compiler enabled?
2. Why might React DevTools show a component as "memoized" but it still re-renders?
3. How does reference stability of props affect both manual `React.memo` and React Compiler optimizations?
4. Should you remove all existing `useMemo`, `useCallback`, and `React.memo` when adopting React Compiler?
