# `useContext`

## Intro

> Context is a form of **Dependency Injection**. It is a **transport mechanism** - it doesn't "manage" anything. Any "state management" is done by you and your own code, typically via useState/useReducer.

as stated [here](https://dev.to/javmurillo/react-context-all-in-one-54ck)

## Performance considerations

- If you context contains many values, be aware that if only one of them changes, all consumers (components which use `useContext)` will re-render (many of such re-renders might be unncecessary).
- This can be avoided by 
    1. splitting your context into multiple contexts (see https://react.dev/learn/scaling-up-with-reducer-and-context)
    2. by using `useMemo` to memoize the context value
    3. `ThemeConsumer` component with `React.memo`
    4. [use-context-selector](https://www.npmjs.com/package/use-context-selector)

- *Alternative*: Replace by atomic solutions like [`Jotai`](https://jotai.org/) or [`Zustand`](https://zustand-demo.pmnd.rs/) 

**TODO**: Create example CodeSandBoxes for all scenarios

## Custom context hooks

*UNDER CONSTRUCTION*

## Context Provider Component

*UNDER CONSTRUCTION*
