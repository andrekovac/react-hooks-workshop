# React Hooks Workshop

A workshop which dives deep into all React built-in hooks

## Structure of this document

- The heart of this document are the "**CodeSandBox**" links. Most of them are written in TypeScript, some in JavaScript (marked by "**(JS)**")
- One part of the document is a journey which gradually introduces hooks via `<Counter />` scenarios.
- Besides there are other examples which cover other hooks or interesting points concerning hooks.

## Topics

1. [React hook Definition](./sections/definition.md)
2. [React state basics](./sections/react-state-basics/README.md)
3. [Async setting and retrieval](./sections/async-setting-and-retrieval/README.md)
4. [`useRef` hook](./sections/useRef/README.md)
5. [`useEffect` hook](./sections/useEffect/README.md)

   - dependency array
   - how to prevent race conditions when fetching data

6. [`useCallback` hook](./sections/useCallback.md)

   - Covering "Removing dependencies: **functions**" heuristics

7. [custom hooks](./sections/custom-hook.md)
8. [`useEffect` and `useState` interplay](./sections/use-effect-use-state-interplay.md)

   - Covering "Removing dependencies: **values**" heuristics

9. [`useReducer`](./sections/useReducer.md)
10. [`useLayoutEffect`](./sections/useLayoutEffect/README.md)

    Topics covered:

    - `useLayoutEffect` vs. `useEffect`
    - a-typical use of `useState` setter function
    - `useEffect`/`useLayoutEffect` dependency array with **refs**
    - React hooks **lifecycle**

11. [class vs. function components](./sections/class-vs-function-component.md)
12. [`React.memo` HOC performance improvement](./sections/react-memo.md)

    Topics covered:

    - how to avoid unnecessary React re-renderings
    - Interplay with `useCallback` hook
    - How change in props triggers re-renderings
    - Discussion of code organization

13. [`useMemo` hook](./sections/useMemo.md)
14. [`useImperativeHandle` hook](./sections/useImperativeHandle.md)
15. [`useSyncExternalStore` hook (React 18)](./sections/useSyncExternalStore.md)
16. [`useEffectEvent` hook (React 19.2+)](./sections/useEffectEvent/README.md)

    Topics covered:

    - Reading latest props/state in Effects without re-runs
    - Analytics and logging patterns
    - Effect Event rules and ESLint enforcement
    - Comparison with `useCallback`

17. [Context + `useContext` hook](./sections/useContext.md)
18. [Debugging (incl. `useDebugValue` hook)](./sections/debugging.md)
19. [Concurrent Mode](./sections/concurrentMode/index.md)

    Topics covered:

    - `Suspense` component
    - `ErrorBoundary` component
    - `useTransition` hook
    - `useDeferredValue` hook
    - `useTransition` and `useDeferredValue` interplay
    - `useTransition` and `useDeferredValue` with `useEffect`

## Extra

- [`usePrevious` hook](./sections/extra-usePrevious-hook.md)
- [`useState` error: `setState` on unmounted component](./sections/setState-on-unmounted-component.md)
- [batched `useState` calls](./sections/batched-useState-calls.md)
- [React Strictmode](./sections/StrictMode.md)
- [Composition](./sections/composition.md)

---

## Further Comments

- The provided links to the React library are from its `server` implementation. They however exemplify their functionality better then the hook definitions in other parts of the React codebase because they are more abstract there.
- Working through all of the examples as part of a workshop will take at least one day, more realistically 1.5 days.
- This is a living document and far from perfect. I'll gradually improve it here and there and add new notes and examples.

## Thanks

This course is a collection of code examples which were inspired by other blog articles and code snippets written by wonderful developers. Sometimes I just adapted them from others. I learned a lot from them while working through their articles and examples. Thanks so much! The sections sometimes contain links to other helpful articles.

I have to point out one article in particular here: Many examples in this course are based on [Dan Abramov](https://github.com/gaearon)'s blog article [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/). Thanks for this very enlightning read!

And a huge thanks to all my students with whom I worked through the examples. Your questions and comments are continuously improving this course. Thanks!

## Great resources

- [React eli5](https://github.com/reactwg/react-18/discussions/46)
  Eli5 (explained like a 5 years old) are great articles for every topic. It's great that there's one for React, too.
