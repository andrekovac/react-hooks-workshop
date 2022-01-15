## Batched / Unbatched React `useState` updates

React only batches synchronous state changes, async changes run one after the other.

- See [my StackOverFlow question](https://stackoverflow.com/a/69855770/3210677)
- [**CodeSandBox**: Batched `useState` calls (JS)](https://codesandbox.io/s/react-usestate-setter-in-timeout-1ls9y?file=/src/App.js)

In React v18 the behavior will change.