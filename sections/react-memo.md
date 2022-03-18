## `React.memo` and `useCallback` interplay

- In this [**CodeSandBox**](https://codesandbox.io/s/react-memo-and-usecallback-s9xv5?file=/src/components/Movies.tsx) the `Movie` component gets memoized because the parent `Movies` would cause it to re-render too frequently.

## `React.memo` information

- `React.memo` is a higher-order-component which shallowly compares props before rendering to prevent unnecessary re-renders. 
- The **second argument** of `React.memo`, i.e. a function of the form `(prevProps, nextProps) => true if same result should prevent re-render. false otherwise.` can be used to refine the props comparison.

## Impact of passed handler references

- **Problem**: A passed handler reference will change on every render. If passed to children it will cause them to rerender frequently even with a wrapped `React.memo`.
- **Solution**: The `useCallback` hook lets you keep the same callback reference between re-renders
