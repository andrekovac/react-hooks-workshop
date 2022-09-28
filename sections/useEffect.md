## `useEffect`

- Run side-effects after mount/update of a component (runs asynchronously).
- **Data fetching**

- **Task**: Start [**CodeSandBox**: fetch movies (starter code)](https://codesandbox.io/s/fetch-movies-starter-code-7ufkh) to fetch movies from [https://reactnative.dev/movies.json]() on mount and display `title` and `releaseYear` of the *first* movie in the list.

- **Result**: [**CodeSandBox**: fetch movies](hhttps://codesandbox.io/s/fetch-movies-solution-sti1p)

### Dependency array

**Dependency array** (and `react-hooks/exhaustive-deps` rule and `useCallback` hook)

- **Mental model**: Don't think of dependencies as values which trigger lifecycle events (i.e. when the effect should re-run). An effect bundles functionality given dependencies.
- empty dependency array (`[]`) might be an exception.

- Add `getMovies` function as dependency in `useEffect` to discuss dependency array.

- Use result from last exercise (i.e. [**CodeSandBox**: fetch movies](hhttps://codesandbox.io/s/fetch-movies-solution-sti1p))
- Fix issues with help of `react-hooks/exhaustive-deps` rule.
- 1) Move into `useEffect` hook
- 2) Wrap in `useCallback` hook


### `useEffect` hook race conditions when fetching data

When implementing data fetching with a useEffect hook, you have to precent **race conditions**

- **Problem**: [**CodeSandBox** (JS) with race condition](https://codesandbox.io/s/beating-async-race-conditions-in-react-forked-qj6ex9)

- **Solution**: [**CodeSandBox** (JS) solution code](https://codesandbox.io/s/beating-async-race-conditions-in-react-cleanupfn-forked-dr7kwx)

    **Explanation**:

    1. Every new effect opens up a new **closure** which closes over the `active` value and the `fetchData` callback function.
    2. The cleanup function of the effect belongs to the closure and so settings `active = false` changes the value of the `active` variable in the closure.
    3. The cleanup function is run for every effect **but the last one**. Hence, the `active` value is only `true` for fetch which was initiated last.

- **Recommendation**: Use an external fetching library or create a `useData` hook (as illustrated [here](https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data))

### React 18: `useEffect` hooks and `StrictMode`

React 18 `StrictMode` helps you spot bugs related with a forgotten `useEffect` cleanup function (if needed) by remounting every component once immediately after its initial mount in development.

[Step 3 in this article of the new React docs](https://beta.reactjs.org/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) explains it nicely.

#### Notes

- See also the discussion in the [new React docs section "You Might Not Need an Effect"](https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data)
- Example copied and adapted from [this blog post of Max Rosen](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect).