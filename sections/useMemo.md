## `useMemo` hook

- `useMemo` memoizes expensive computations so they don't re-run on each render.
- Implementation: [useMemo](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L338)
- `useMemo` runs on every render to compare the previous and current value of the dependency array.
- `useMemo` callback function is only called if the dependency array has changed.

### `useMemo` hook example

- [**CodeSandBox**: useMemo hook](https://codesandbox.io/s/21-usememo-u8pxt): Re-rendering won't re-compute value in `useMemo` hook unless desired (as indicated via the dependency array)

### `useMemo` vs. `useCallback`

- Main difference: callback function of `useMemo` is called once when rendering. Callback function of `useCallback` is called when the callback is invoked.
- `useCallback` memoizes the function itself, while `useMemo` memoizes the result of the function.

**Example**:

```ts
  /**
   * first argument of `useMemo` is called every time `someProp` changes
   */
  const myValue = useMemo(() => {
    console.log("my value got memoized");
    return "stored value = " + someProp;
  }, [someProp]);

  useEffect(() => {
    // calling `myValue` will not re-run the `useMemo` callback function
    setTimeout(() => {
      console.log("setTimeout", myValue);
      console.log("setTimeout", myValue);
      console.log("setTimeout", myValue);
      console.log("setTimeout", myValue);
      console.log("setTimeout", myValue);
    }, 2000);
  }, [myValue]);
```