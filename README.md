# React Hooks Workshop

A workshop which dives deep into all React built-in hooks

## Structure of this document

- Moving from point to point is a journey (aka deep dive) into the world of React Hooks in a `<Counter />` scenario.
- Points starting with an "**[Extra]**" are some extra CodeSandBoxes which are not part of the journey but hope to introduce a certain hook or give you some even deeper insight into them.
- Working through all of the examples as part of a workshop will take at least one day, more realistically 1.5 days.

## Definition of React Hooks

> Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs.

> You “use” React features at the top of your component similar to how you “import” modules at the top of your file.

Hooks can only be at the top-level of your component.

*Taken from [the new React docs](https://beta.reactjs.org/learn/state-a-components-memory)*.

## State

### "state" without React?

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

### **[Extra]** `useState` hook uses strict equality (`===`) comparison to decide whether to return a new value

[**CodeSandBox**: useState with mutable vs. immutable state](https://codesandbox.io/s/usestate-with-mutable-and-immutable-objects-l6ux8) features broken and correct ways to update state.

- A new state value is created if the value passed to the setter function is not strictly equal the current value (referential equality in case of complex data types)
- Every successful state upate causes:
	1. The component function to be re-run
	2. A new state value to be returned by the `useState` hook
	
**Note**:

- [Also objects are entirely new objects, not just copied references](https://codesandbox.io/s/usestate-setter-creates-new-objects-r4vid)) (example in JS)
- [One state change causes all states to be new!](https://codesandbox.io/s/one-state-change-all-states-are-new-9lubk) (example in JS)

- **Questions**: Why do the broken increment functions increase the value without updating the UI?

- **Answer**: In case of the broken click handlers the `useState` hook's strict equality check returns `true` the `count` value in the existing state variable `objectCount` does indeed change its value, but since it won't cause the component to re-render, both `useEffect` hooks won't run and the function won't return a new UI to be rendered. See the appendix at the bottom for a code example concerning equality checks in JS.

- **Note**: Since the state value and the setter function are `const` values they can't be re-assigned.

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

## `useRef`

### **[Extra]** `useRef` in general

- **Stable across re-renders**: React stores the ref to remain immutable over the course of the lifetime of the component (especially if the contents (i.e. `ref.current` value) gets mutated).
- Thus, `useRef` value remains the same across re-renders.
- [**CodeSandBox**: ref vs. state vs. local variable (JS)](https://codesandbox.io/s/usestate-useref-vs-local-values-ogm61?file=/src/index.js) shows the difference to an object value in `useState` and local variables.

- **Bound to a component instance**: `useRef` is bound to a component instance (as is `useState` btw). Play around with this [CodeSandBox: 07 - useRef vs. external variable (JS)](https://codesandbox.io/s/07-useref-vs-external-variable-d0zsm?file=/src/index.js) to see the difference.

### `useRef` reflects "current" value irrespective of re-renders

- Using `ref` displays current value because the ref object is guaranteed to remain stable for the lifetime of the component.
- [**CodeSandBox**: async state with timeout and ref](https://codesandbox.io/s/async-state-with-timeout-and-ref-9nu5y)
- **Task**: Change the value displayed in the alert to the **ref** value.
- You should observe that the state value "closes over" the timeout. It's frozen. But the updated ref value is accessible because it got updated 

- **React Native Question**: Why is React Native `Animated` value stored in ref?
- **Answer**: Because we want Animation value to change independent of rendering of component in which animated value gets defined.
- You don’t have any guarantees that reading the refs value `countRef.current` would give you the same value in any particular callback (as opposed to state and props values). By definition, you can mutate it any time.

### **[Extra]** Other definition of `ref`

In a [tweet](https://twitter.com/dan_abramov/status/1099842565631819776) Dan Abramov gave an interesting definition of a ref:

> `useRef()` is basically `useState({ current: initialValue })[0]`

- **Discussion**: Why does this make sense?

- **TODO**: Add CodeSandBox with this as an example.
	
## `useEffect`

- Run side-effects after mount/update of a component (runs asynchronously).
- **Data fetching**

- **Task**: Start [**CodeSandBox**: fetch movies (starter code)](https://codesandbox.io/s/fetch-movies-starter-code-7ufkh) to fetch movies from [https://reactnative.dev/movies.json]() on mount and display `title` and `releaseYear` of the *first* movie in the list.

- **Result**: [**CodeSandBox**: fetch movies](hhttps://codesandbox.io/s/fetch-movies-solution-sti1p)

### Dependency array

10. **Dependency array** (and `react-hooks/exhaustive-deps` rule and `useCallback` hook)

	- **Mental model**: Don't think of dependencies as values which trigger lifecycle events (i.e. when the effect should re-run). An effect bundles functionality given dependencies.
	- empty dependency array (`[]`) might be an exception.

	- Add `getMovies` function as dependency in `useEffect` to discuss dependency array.

		- Use result from last exercise (i.e. [**CodeSandBox**: fetch movies](hhttps://codesandbox.io/s/fetch-movies-solution-sti1p))
		- Fix issues with help of `react-hooks/exhaustive-deps` rule.
		- 1) Move into `useEffect` hook
		- 2) Wrap in `useCallback` hook

### `useCallback`

11. Removing dependencies: **functions**

	- [ESLint plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) `exhaustive deps` rule will give you guidance.
	- Heuristic to keep the dependency array small: To remove functions from the dependency array try the following steps (in order):
	
		1. Function into `useEffect` hook
		2. Function out of component
		3. Function with `useCallback` (see [this CodeSandBox of our code (JS)](https://codesandbox.io/s/12-dependency-array-usecallback-r82lx) for an example)

		- **Note**: `useState` setter functions may be ommitted from the dependency array. [React guarrantees that their identity will stay stable across re-renders for the lifetime of the component](https://reactjs.org/docs/hooks-reference.html#usestate).

## Custom hook

12. Custom hook

	- Moving the functionality into a function, we get a custom hook: [CodeSandBox: 10 - custom hook](https://codesandbox.io/s/fetch-movies-custom-hook-q5n98)

	Generalize `useFetch`: Add `error` and re-invoke with `setUrl` function:

	- Let's generalize the `useFetch` hook and allow new urls to be fetched with a function.
	- [This is the resulting **CodeSandBox**](https://codesandbox.io/s/fetch-data-generalized-custom-hook-jffu6)
		- **Insight**: `setUrl` is basically a `doFetch`.
		- Why does hook not refetch 

13. Removing dependencies: **values**

	- Heuristic to handle values properly with hooks. Do the following (in order):
	
		1. Put all dependencies into the dependency array (don't cheat!)
		2. Now think: Can value be removed without changing the result?
	
	- In [**CodeSandBox**: count in intervals](https://codesandbox.io/s/count-in-intervals-y5qp4) the `count` doesn't change with a `setInterval`... - Why?
	- How can you make it count? - Hint: Look at the squiggly line ;-)

	**Intermediate result**:

	- Adding `count` as dependency gives us [**CodeSandBox** solution](https://codesandbox.io/s/count-in-intervals-fixed-5wicj). Remaining problem: Interval is set and cleared every second.

    - **Note**: With `count` as dependency and constant setting and clearing of `setInterval`, the `count` increases because of `count` dependency. Really equivalent with `setTimeout`, i.e. rougly equivalent to `setTimeout(() => setCount(count + 1), 1000);`

  	**Best solution**
	
	- Remove `count` dependency via `useState` functional updater form: [CodeSandBox: 15 - remove count dependency solution](https://codesandbox.io/s/remove-count-dependency-better-solution-4c9co): Now interval is not set and cleared on every render.

14. **[Extra]** `usePrevious`: Custom hook example using `useRef`

	: Since `useRef` can store the value across a re-render you can use it to store a value from a previous render, i.e. as a custom  hook:

	```js
	function Counter() {
	  const [count, setCount] = useState(0);
	  const prevCount = usePrevious(count);  return <h1>Now: {count}, before: {prevCount}</h1>;
	}
	
	function usePrevious(value) {  const ref = useRef();
	  useEffect(() => {
	    ref.current = value;
	  });
	  return ref.current;
	}
	```
	
	Example taken from the section ["How to get the previous props or state?" in the React docs](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)

## [useReducer](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L261)

14. **[Extra]** `useReducer` in general

	- [CodeSandBox with useReducer and useState Counters](https://codesandbox.io/s/usereducer-and-usestate-mutated-vs-copy-g8v4x)
	- **Task**: Observe the `console.log`s:
		1. Hit the `Dispatch (copy)` button 3 times
		2. Hit the `Dispatch (mutation)` button
		3. Observe the `console.log` statements. Do they make sense to you?

15. Removing dependencies: **values** with `useReducer` hook

	- Make entire fetch function into a `useReducer` function

	- **Issues**: This [CodeSandBox](https://codesandbox.io/s/count-with-steps-s4sh9)
	- **Problem**: `step` causes too frequent set/clear interval calls! `step` unrelated to interval. How to remove it?
	- **Tricky**: Updater function optimization already present..

	- **Exercise**: Start with [**CodeSandBox**: this to implement reducer function](https://codesandbox.io/s/count-with-steps-usereducer-starter-code-8x3pt)

	- [**CodeSandBox**: **Solution** with `useReducer`](https://codesandbox.io/s/remove-step-with-usereducer-solution-ye9l2)

	- **Note**: `useState` is [implemented with `useReducer`](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L248) using a [`basicStateReducer`](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-reconciler/src/ReactFiberHooks.new.js#L694). So all things we learned about `useState` also apply here.
	- `useReducer` uses the [Object.is comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

	
## useLayoutEffect

16. **[Extra]** `useLayoutEffect`:

	- **Heuristic** when to use it: If your component is flickering when state is updated.

	- **Issue 1**: Observe flickering because of `useEffect` in [this **CodeSandBox** (JS)](https://codesandbox.io/s/20-useeffect-flickering-no-deps-array-15lb1?file=/src/index.js)
	- **Issue 2**: `react-hooks/exhaustive-deps` issue: missing deps and then "extract it to a separate variable so it can be statically checked" - i.e. make the code simple enough so that eslint can statically analyze it (i.e. without running the code).
	- **Solution** with `useLayoutEffect`: [This **CodeSandBox** (JS)](https://codesandbox.io/s/21-uselayouteffect-with-deps-array-y1yx8)
	
		- **Bonus question** reply: Set it to the initial width of the rectangle (e.g. `177` in my case). Setting it to `177` again won't cause a re-render.

	- `useLayoutEffect` has same signature as `useEffect`
	- Runs synchronously after render but before DOM manipulation and paint to screen.
	- [This article](https://daveceddia.com/useeffect-vs-uselayouteffect/) summarizes its use nicely.

	> If your component is **flickering** when state is updated – as in, it renders in a partially-ready state first and then immediately re-renders in its final state – that’s a good clue that it’s time to swap in useLayoutEffect.
	

## class component vs. function component
	
17. **[Extra]** `class` vs. `component` difference on closure: 

	- [**CodeSandBox**: class vs. function component](https://codesandbox.io/s/class-function-comparison-v2xv4?file=/src/index.tsx) compares how function components and classes "close over" values. Play with it.

		- **Solution**: Click "Follow", then quickly change profile and observe name in alert.
		- **Explanation**: `this.props` is mutable in class components and immutable (`const`) in function components.

## Other `useState` phenomena

18. **[Extra]** Error "`setState` on unmounted component" occurs occasionally

	- **Established workaround**: [CodeSandBox: Observe useEffect with empty dependency array (JS)](https://codesandbox.io/s/18-check-for-unmount-fjryg)
	
	**Scenario**:
	
	```ts
	async function handleSubmit() {
	  setPending(true)
	  await post('/someapi') // component might unmount while we're waiting
	  setPending(false)
	}
	```
	
	This is a **workaround** (see sandbox above):

	```ts
	useEffect(() => {
	  function handleChange() {
	     setState(store.getState())
	  }
	  store.subscribe(handleChange)
	  return () => store.unsubscribe(handleChange)
	}, [])
	```

	- This handles out-of-order responses with a ref (or local variable if dependency array is empty array)
	- It's discussed to remove the warning in this [GitHub issue](https://github.com/facebook/react/pull/22114).

19. **[Extra]** Batched / Unbatched React `useState` updates

	React only batches synchronous state changes, async changes run one after the other.
	- See [my SO question](https://stackoverflow.com/a/69855770/3210677)
	- [the corresponding **CodeSandBox** (JS)](https://codesandbox.io/s/react-usestate-setter-in-timeout-1ls9y?file=/src/App.js)

## [useMemo](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L338)

20. **[Extra]** `useMemo` Example

	- `useMemo` memoizes expensive computations so they don't re-run on each render.
	- [Test useMemo in this **CodeSandBox** (JS)](https://codesandbox.io/s/21-usememo-u8pxt?file=/src/App.js)


21. **[Extra]** `React.memo` and `useCallback` interplay

	- `React.memo` is a higher-order-component which shallowly compares props before rendering to prevent unnecessary re-renders. 
	- The second argument of `React.memo`, i.e. a function of the form `(prevProps, nextProps) => true if same result should prevent re-render. false otherwise.` can be used to refine the props comparison.

	- In this [**CodeSandBox** (JS)](https://codesandbox.io/s/react-memo-and-usecallback-s9xv5?file=/src/components/Movies.tsx) the `Movie` component gets memoized because the parent `Movies` would cause it to re-render too frequently.

	- **Problem**: A passed handler reference will change on every render. If passed to children it will cause them to rerender frequently even with a wrapped `React.memo`.
	- **Solution**: The `useCallback` hook lets you keep the same callback reference between re-renders

	- 

---

## Further Comments

- The provided links to the React library are from its `server` implementation. They however exemplify their functionality better then the hook definitions in other parts of the React codebase because they are more abstract there.

## Appendix

### Shallow copy vs. deep copy:
	
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