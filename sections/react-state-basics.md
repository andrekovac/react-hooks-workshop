# React State

## "state" without React?

[**CodeSandBox**: Counter in variables](https://codesandbox.io/s/internal-external-state-variable-m7xil)

**Comments**:

- Keep state in *local* variable (inside of component) or *external* variable (outside of component).
- **Result**: Component won't re-render.

### Using `useState`: Counter re-renders

[**CodeSandBox**: useState hook](https://codesandbox.io/s/usestate-basic-f6qj7)

**Question**: Why does the `countOutside` value also change (with the state value) but inner `countInside` does not?

<details>
<summary>Show Answer</summary>

**Answer**: The inner `count` gets initialized (and set to `0`) on **every render** which is triggered by the state value.

</details>

## `useState` hook uses strict equality (`===`) comparison to decide whether to return a new value

[**CodeSandBox**: useState with mutable vs. immutable state](https://codesandbox.io/s/usestate-with-mutable-and-immutable-objects-l6ux8) features broken and correct ways to update state.

- A new state value is created if the value passed to the setter function is not strictly equal the current value (referential equality in case of complex data types)
- Every successful state upate causes:
	1. The component function to be re-run
	2. A new state value to be returned by the `useState` hook
	
**Note**:

- [**CodeSandBox**: Also objects are entirely new objects, not just copied references (JS)](https://codesandbox.io/s/usestate-setter-creates-new-objects-r4vid))
- [**CodeSandBox**: One state change causes all states to be new! (JS)](https://codesandbox.io/s/one-state-change-all-states-are-new-9lubk)

- **Questions**: Why do the broken increment functions increase the value without updating the UI?
- **Answer**: In case of the broken click handlers the `useState` hook's strict equality check returns `true` the `count` value in the existing state variable `objectCount` does indeed change its value, but since it won't cause the component to re-render, both `useEffect` hooks won't run and the function won't return a new UI to be rendered. See the appendix at the bottom for a code example concerning equality checks in JS.

- **Note**: Since the state value and the setter function are `const` values they can't be re-assigned.

## Appendix: Shallow copy vs. deep copy:
	
```js
// current state
const obj1 = { val: 1 };

// Mutation: Change val: 1 to val: 2
obj1.val = 2
const obj2 = obj1
console.log(obj1 === obj2) // true

// New Object: Change val: 1 to val: 2
const obj3 = { val: 2 }
console.log(obj2 === obj3) // false
```