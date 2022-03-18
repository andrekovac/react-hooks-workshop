## `useMemo` hook

- `useMemo` memoizes expensive computations so they don't re-run on each render.
- Implementation: [useMemo](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L338)

### `useMemo` hook example

- [**CodeSandBox**: useMemo hook](https://codesandbox.io/s/21-usememo-u8pxt): Re-rendering won't re-compute value in `useMemo` hook unless desired (as indicated via the dependency array)
