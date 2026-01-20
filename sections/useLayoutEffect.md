# `useLayoutEffect`

This code example wants to do two thing:

1. Show you when to use the `useLayoutEffect` hook.
2. Understand the `useState` hook better by analyzing an a-typical use of it.
3. Understand the (`useEffect`/`useLayoutEffect` hook) dependency array better with this tricky example

## `useLayoutEffect`

- **Issue 1**: Observe flickering because of `useEffect` in [this **CodeSandBox**](https://codesandbox.io/s/20-useeffect-flickering-no-deps-array-15lb1)
- **Solution** with `useLayoutEffect`: [This **CodeSandBox**](https://codesandbox.io/s/21-uselayouteffect-with-deps-array-y1yx8)

- `useLayoutEffect` in React Native Example: Trigger `LayoutEffect` on mount of component won't work with `useEffect` because it'd happen too late.

## Dependency array

- **Issue 2**: `react-hooks/exhaustive-deps` issue: missing deps and then "extract it to a separate variable so it can be statically checked" - i.e. make the code simple enough so that eslint can statically analyze it (i.e. without running the code).

## Tricky usage of `useState` hook

- **Bonus question**: Passing which value to `setWidth();` could stop this re-rendering invocation?
- **Reply**: Set it to the initial width of the rectangle (e.g. `177` in my case). Setting it to `177` again won't cause a re-render.

## Facts about `useLayoutEffect`

- `useLayoutEffect` has same signature as `useEffect`
- Runs synchronously after render but before DOM manipulation and paint to screen.
- [This article](https://daveceddia.com/useeffect-vs-uselayouteffect/) summarizes its use nicely.

## When to use it?

> If your component is **flickering** when state is updated – as in, it renders in a partially-ready state first and then immediately re-renders in its final state – that’s a good clue that it’s time to swap in useLayoutEffect.

- **Heuristic** when to use it: If your component is flickering when state is updated.

## React hooks lifecycle

### Notes

- `render` is a **React** render. It doesn't refer to DOM updates or to paints to the screen.
- lazy initializers is e.g. a function as initial state in a `useState` hook instead of a value. Read [this article](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates) for more information about it.

![React Hook Flow Diagram](https://github.com/donavon/hook-flow/blob/master/hook-flow.png?raw=true)