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
