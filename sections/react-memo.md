## `React.memo` and `useCallback` interplay

- **Starter Code**: [**CodeSandBox**](https://codesandbox.io/s/react-memo-and-usecallback-start-mc6jnc)

  Discussion points:

  - The `Movies` component causes `Movie` to re-render although its props don't change.
    - What is the difference between the "React render phase" and the "graphical rendering" of DOM nodes to pixels on the screen?
    - Fix the unnecessary re-renders.
  - **TODO**: Add `onClick={handleMovieClick}` as prop to `Movie` component -> Problem resurfaces. Why? How can you fix it?
  - Is there a simpler fix to the problem?

- **Solution Code**: [**CodeSandBox**](https://codesandbox.io/s/react-memo-and-usecallback-s9xv5?file=/src/components/Movies.tsx) 
  - The `Movie` component gets memoized via `React.memo`

## `React.memo` information

- `React.memo` is a higher-order-component which shallowly compares props before rendering to prevent unnecessary re-renders. 
- The **second argument** of `React.memo`, i.e. a function of the form `(prevProps, nextProps) => true if same result should prevent re-render. false otherwise.` can be used to refine the props comparison.
- **Tipp**: Set the `displayName` property of your component to make debugging easier (i.e. with React DevTools):

  ```tsx
  import React from 'react';

  const MyComponent = React.memo(() => {
    // ...
  })
  
  MyComponent.displayName = 'MyComponent';
  ```

## Impact of passed handler references

- **Problem**: A passed handler reference will change on every render. If passed to children it will cause them to rerender frequently even with a wrapped `React.memo`.
- **Solution**: The `useCallback` hook lets you keep the same callback reference between re-renders
