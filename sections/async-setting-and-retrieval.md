## Async: Setting and retrieval of state 

### Async **setting** of state

**Problem**: [**CodeSandBox**: Async setting of state (problem)](https://codesandbox.io/s/async-setting-of-state-9xu4s) - observe the issue

- Setter of state is in an asynchronous function.

**Solution**: [**CodeSandBox**: Async setting of state with functional updater form](https://codesandbox.io/s/async-setting-of-state-with-functional-updater-form-myvws)

- [functional updater form](https://reactjs.org/docs/hooks-reference.html#functional-updates) (`c -> c + 1`) of useState hook.

### Async **retrieval** of state

#### Problem: `count` freezes

- **Problem (number)**: [**CodeSandBox**: async retrieval of state](https://codesandbox.io/s/async-retrieval-of-state-ztiii) - observe the issue

Problem description:

- **Issue**: `count` gets frozen and subsequent changes during async setTimeout call are ignored in alert. 
- Can this issue be solved with the updater function? - Try it!
- The issue is not solved by switching from a primitive data type to a complex data type
	- state values are **new** on every **render** (primitive data types and objects alike)
	- The [**CodeSandBox**: problem also exists for `count` stored in an object](https://codesandbox.io/s/async-retrieval-of-state-count-in-object-vocfr).
- The solution of this problem is discussed later with **CodeSandBox: 06 - Async state with timeout and ref**.

#### Solution: use helper variable

**Task**: What is going on in here?

- `count: number`: [**CodeSandBox**: async retrieval of state (number)](https://codesandbox.io/s/async-retrieval-of-state-primitive-start-solution-xhcvg)
- `{ count: number }`: [**CodeSandBox**: async retrieval of state (object)](https://codesandbox.io/s/async-retrieval-of-state-object-solution-start-4bbn6)

**Solution**: Closure in action!

- `count: number`: [**CodeSandBox**: async retrieval of state with helper variable (number)](https://codesandbox.io/s/async-retrieval-of-state-via-helper-object-primitive-qc1c4)
- `{ count: number }`: [**CodeSandBox**: async retrieval of state with helper variable (object)](https://codesandbox.io/s/async-retrieval-of-state-with-helper-variable-object-l8esr)
