# [useReducer](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L261)

## `useReducer` in general

- [**CodeSandBox**: `useReducer` and `useState` counters comparison](https://codesandbox.io/s/usereducer-and-usestate-mutated-vs-copy-g8v4x)
- **Task**: Observe the `console.log`s:
    1. Hit the `Dispatch (copy)` button 3 times
    2. Hit the `Dispatch (mutation)` button
    3. Observe the `console.log` statements
    
    Do the log statements make sense to you?

## Removing dependencies: **values** with `useReducer` hook

- Make entire fetch function into a `useReducer` function

- **Issues**: This [CodeSandBox](https://codesandbox.io/s/count-with-steps-s4sh9)
- **Problem**: `step` causes too frequent set/clear interval calls! `step` unrelated to interval. How to remove it?
- **Tricky**: Updater function optimization already present..

- **Exercise**: Start with [**CodeSandBox**: this to implement reducer function](https://codesandbox.io/s/count-with-steps-usereducer-starter-code-8x3pt)

- [**CodeSandBox**: **Solution** with `useReducer`](https://codesandbox.io/s/remove-step-with-usereducer-solution-ye9l2)

- **Note**: `useState` is [implemented with `useReducer`](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L248) using a [`basicStateReducer`](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-reconciler/src/ReactFiberHooks.new.js#L694). So all things we learned about `useState` also apply here.
- `useReducer` uses the [Object.is comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
