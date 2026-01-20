## `useRef`

### `useRef` is **stable across re-renders**

- React stores the ref to remain immutable over the course of the lifetime of the component (especially if the contents (i.e. `ref.current` value) gets mutated). Thus, `useRef` value remains the same across re-renders.
- When to use it? - You need a sort of data storage which doesn't influnce re-renders and which is tied to the component, so it's not a global variable.
- [**CodeSandBox**: ref vs. state vs. local variable (JS)](https://codesandbox.io/s/ususeState-useref-vs-local-values-ogm61?file=/src/index.js) shows the difference to an object value in `useState` and local variables.

### `useRef` is **bound to a component instance**

- `useRef` is bound to a component instance (as is `useState` btw).
- Play around with this [CodeSandBox: 07 - useRef vs. external variable (JS)](https://codesandbox.io/s/07-useref-vs-external-variable-d0zsm?file=/src/index.js) to see the difference.

### `useRef` reflects "current" value irrespective of re-renders

- Using `ref` displays current value because the ref object is guaranteed to remain stable for the lifetime of the component.
- [**CodeSandBox**: async state with timeout and ref](https://codesandbox.io/s/async-state-with-timeout-and-ref-9nu5y)
- **Task**: Change the value displayed in the alert to the **ref** value.
- You should observe that the state value "closes over" the timeout. It's frozen. But the updated ref value is accessible because it got updated

- **React Native Question**: Why is React Native `Animated` value stored in ref?
- **Answer**: Because we want Animation value to change independent of rendering of component in which animated value gets defined.
- You don't have any guarantees that reading the refs value `countRef.current` would give you the same value in any particular callback (as opposed to state and props values). By definition, you can mutate it any time.

#### **[React 19.2+]** Modern Alternative: `useEffectEvent`

- The pattern of using `useRef` to keep the latest value for use in Effects (or callbacks) was so common that React 19.2 introduced the [`useEffectEvent`](./useEffectEvent/README.md) hook as a cleaner alternative.
- **When to use `useRef`**: When you need a mutable value that persists across renders (DOM references, timers, animation values, any mutable instance variable)
- **When to use `useEffectEvent`**: When you need to read the latest props/state inside Effects without causing re-runs
- See the [`useEffectEvent` section](./useEffectEvent/README.md) for a detailed comparison and migration guide from the ref pattern.

### **[Extra]** Other definition of `ref`

In a [tweet](https://twitter.com/dan_abramov/status/1099842565631819776) Dan Abramov gave an interesting definition of a ref:

> `useRef()` is basically `useState({ current: initialValue })[0]`

- **Discussion**: Why does this make sense?

- **TODO**: Add CodeSandBox with this as an example.