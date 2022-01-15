## `useCallback`

### Removing dependencies: **functions**

- [ESLint plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) `exhaustive deps` rule will give you guidance.

### Heuristic to keep the dependency array small: To remove functions from the dependency array try the following steps (in order):

1. Function into `useEffect` hook
2. Function out of component
3. Function with `useCallback` (see [this CodeSandBox of our code (JS)](https://codesandbox.io/s/12-dependency-array-usecallback-r82lx) for an example)

- **Note**: `useState` setter functions may be ommitted from the dependency array. [React guarrantees that their identity will stay stable across re-renders for the lifetime of the component](https://reactjs.org/docs/hooks-reference.html#usestate).
