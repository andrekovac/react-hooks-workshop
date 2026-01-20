## Async: Setting and retrieval of state 

**Scenarios**: Every click counts (e.g. in a game or a real-time trading app). Even if the server lags, I want every interaction to be counted.

We look at two cases in which time lags of asynchronous actions (mostly API calls) can cause issues.

### [Case 1] Async **setting** of state

**Problem**: [**CodeSandBox**: Async setting of state (problem)](https://codesandbox.io/s/async-setting-of-state-9xu4s) - observe the issue

- Closure in action: `count` is frozen at the value of the first render.
- Setter of state is in an asynchronous function (`setTimeout`).

**Non-ideal solution**: [**CodeSandBox**: Async setting of state (non-ideal solution)](https://codesandbox.io/s/async-setting-of-state-non-ideal-solution-p93pw)

**Solution**: [**CodeSandBox**: Async setting of state with functional updater form](https://codesandbox.io/s/async-setting-of-state-with-functional-updater-form-myvws)

- [functional updater form](https://reactjs.org/docs/hooks-reference.html#functional-updates) (`c -> c + 1`) of useState hook.

### [Case 2] Async **retrieval** of state

Let's look at this similar case:

#### Problem: `count` freezes

- **Problem (number)**: [**CodeSandBox**: async retrieval of state](https://codesandbox.io/s/async-retrieval-of-state-ztiii) - observe the issue

Problem description:

- **Issue**: `count` gets frozen and subsequent changes during the async `setTimeout` call are ignored in alert. 
- Can this issue be solved with the **updater function**? - Try it!

#### Solution: use helper variable

**Task**: What is going on in here?

These CodeSandBoxes contain the solution without explanations:

- `count: number`: [**CodeSandBox**: async retrieval of state (number)](https://codesandbox.io/s/async-retrieval-of-state-primitive-start-solution-xhcvg)


**Solution**: Closure in action!

These CodeSandBoxes contain explanations:

- `count: number`: [**CodeSandBox**: async retrieval of state with helper variable (number)](https://codesandbox.io/s/async-retrieval-of-state-via-helper-object-primitive-qc1c4)

### **Note**: The issue is not solved by switching from a primitive data type to a complex data type

- Why?: State values are **new** on every **render** (primitive data types and objects alike are `const` values)
- The [**CodeSandBox**: Problem also exists for `count` stored in an object](https://codesandbox.io/s/async-retrieval-of-state-count-in-object-vocfr).
- Learn more about the `useRef` hook in the [`useRef` hook section](./useRef.md) and via this [**CodeSandBox**: ref vs. state vs. local variable (JS)](https://codesandbox.io/s/ususeState-useref-vs-local-values-ogm61?file=/src/index.js)

- **Task** with `{ count: number }` object: [**CodeSandBox**: async retrieval of state (object)](https://codesandbox.io/s/async-retrieval-of-state-object-solution-start-4bbn6)
- **Solution** with `{ count: number }` object: [**CodeSandBox**: async retrieval of state with helper variable (object)](https://codesandbox.io/s/async-retrieval-of-state-with-helper-variable-object-l8esr)