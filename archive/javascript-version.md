# React Hooks Workshop

- *Version from **November 26th 2021***
- **CodeSandBoxes** are written in *JavaScript*

---

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

## state

1. "state" without React?

	- Keep state in local (inside of component) variable or external variable (outside of component).
	- [CodeSandBox: 01 - Counter in variable](https://codesandbox.io/s/01-counter-in-variable-3gxmj?file=/src/index.js)
	- **Result**: Component won't re-render.

2. Using `useState`: Counter re-renders

	- [CodeSandBox: 02 - Counter with useState](https://codesandbox.io/s/02-counter-with-state-n7eyl?file=/src/index.js)

	- **Question**: Why does the `countOutside` value also change (with the state value) but inner `count` does not?
	- **Explanation**: The inner `count` gets initialized (and set to `0`) on **every render** which is triggered by the state value.
	
3. **[Extra]** `useState` hook uses strict equality (`===`) comparison to decide whether to return a new value

	[This CodeSandBox](https://codesandbox.io/s/react-usestate-new-vs-old-object-values-cbhyi) features broken and correct ways to update state.

	- A new state value is created if the value passed to the setter function is not strictly equal the current value (referential equality in case of complex data types)
	- Every successful state upate causes:
		1. The component function to be re-run
		2. A new state value to be returned by the `useState` hook
		
    **Note**:
    
    - [Also objects are entirely new objects, not just copied references](https://codesandbox.io/s/usestate-setter-creates-new-objects-r4vid?file=/src/App.js))
    - [One state change causes all states to be new!](https://codesandbox.io/s/one-state-change-all-states-are-new-9lubk)

	- **Questions**: Why do the broken increment functions increase the value without updating the UI?

	- **Answer**: In case of the broken click handlers the `useState` hook's strict equality check returns `true` the `count` value in the existing state variable `objectCount` does indeed change its value, but since it won't cause the component to re-render, both `useEffect` hooks won't run and the function won't return a new UI to be rendered.	
	
	- **Note**: Since the state value and the setter function are `const` values they can't be re-assigned.


	- JS code: Shallow copy vs. deep copy:
		
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

## Async: Setting and retrieval of state 

4. Async **setting** of state

	- Problem if setter of state is in asynchronous function: [CodeSandBox: 03 - Async setState](https://codesandbox.io/s/03-async-setstate-1rhmm)

	- [functional updater form](https://reactjs.org/docs/hooks-reference.html#functional-updates) (`c -> c + 1`) of React to the rescue: [CodeSandBox: 04 - Async setState with functional updater form](https://codesandbox.io/s/04-async-setstate-with-functional-updater-form-idvhh?file=/src/index.js)

5. Async **retrieval** of state

	Test and observe this [CodeSandBox: 05 - Async retrieval of state](https://codesandbox.io/s/05-async-retrieval-of-state-gs4tc).
	
	- **Problem**: `count` gets frozen and subsequent changes during async setTimeout call are ignored in alert. 
	- Can this issue be solved with the updater function? - Try it!
	- The issue is not solved by switching from a primitive data type to a complex data type
	  - state values are **new** on every **render** (primitive data types and objects alike)
	- The solution of this problem is discussed later with **CodeSandBox: 06 - Async state with timeout and ref**.

6. Async **retrieval** of state via helper variable

  - Closure in action!
  - **Task**: What is going on in here?: [06 - Async retrieval of state with helper variable (less comments)](https://codesandbox.io/s/06-async-retrieval-of-state-with-helper-variable-less-comments-o3z9q?file=/src/index.js)
  - **Explanation**: To understand what's going on look at the same file with comments: [06 - Async retrieval of state with helper variable (with comments)](https://codesandbox.io/s/06-async-retrieval-of-state-with-helper-variable-with-comments-xod8h?file=/src/index.js)

## useRef

6. **[Extra]** `useRef` in general

	- **Stable across re-renders**: React stores the ref to remain immutable over the course of the lifetime of the component (especially if the contents (i.e. `ref.current` value) gets mutated).
	- Thus, `useRef` value remains the same across re-renders. [This CodeSandBox](https://codesandbox.io/s/usestate-useref-vs-local-values-ogm61?file=/src/index.js) shows the difference to an object value in `useState` and local variables.

	- **Bound to a component instance**: `useRef` is bound to a component instance (as is `useState` btw). Play around with this [CodeSandBox: 07 - useRef vs. external variable](https://codesandbox.io/s/07-useref-vs-external-variable-d0zsm?file=/src/index.js) to see the difference.

7. `useRef` reflects "current" value irrespective of re-renders

	- Using `ref` displays current value because the ref object is guaranteed to remain stable for the lifetime of the component.
	- [CodeSandBox: 06 - Async state with timeout and ref](https://codesandbox.io/s/06-async-state-with-timeout-and-ref-klbjo)
	- **Task**: Change the state value to the **ref** value.
	- You should observe that the state value "closes over" the timeout. It's frozen. But the updated ref value is accessible because it got updated 
	
	- **Question**: Why is Animated value stored in ref?
		- **Answer**: Because we want Animation value to change independent of rendering of component in which animated value gets defined.
	- You don’t have any guarantees that reading the refs value `countRef.current` would give you the same value in any particular callback (as opposed to state and props values). By definition, you can mutate it any time.

8. **[Extra]** Other definition of `ref`

	In a [tweet](https://twitter.com/dan_abramov/status/1099842565631819776) Dan Abramov gave an interesting definition of a ref:

	> `useRef()` is basically `useState({ current: initialValue })[0]`
	
	- **Discussion**: Why does this make sense?

	- **TODO**: Add CodeSandBox with this as an example.

	
## useEffect
	
9. `useEffect` 

	- Run side-effects after mount/update of a component (runs asynchronously).
	
	**Data fetching**
		
	- **Task**: Start [with this CodeSandBox](https://codesandbox.io/s/08-fetch-movies-starter-code-tec2y) to fetch movies from [https://reactnative.dev/movies.json]() on mount and display title and release date of the first movie in the list.
		
	- **Result**: [CodeSandBox: 09 - fetch movies](https://codesandbox.io/s/09-fetch-movies-9zzu2)

### Dependency array

10. **Dependency array** (and `react-hooks/exhaustive-deps` rule and `useCallback` hook)

	- **Mental model**: Don't think of dependencies as values which trigger lifecycle events (i.e. when the effect should re-run). An effect bundles functionality given dependencies.
	- empty dependency array (`[]`) might be an exception.

	- Add `getMovies` function as dependency in `useEffect` to discuss dependency array.

		- Use result from last exercise (i.e. [CodeSandBox: 09 - fetch movies](https://codesandbox.io/s/09-fetch-movies-9zzu2))
		- Fix issues with help of `react-hooks/exhaustive-deps` rule.
		- 1) Move into `useEffect` hook
		- 2) Wrap in `useCallback` hook

### `useCallback`

11. Removing dependencies: **functions**

	- [ESLint plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) `exhaustive deps` rule will give you guidance.
	- Heuristic to keep the dependency array small: To remove functions from the dependency array try the following steps (in order):
	
		1. Function into `useEffect` hook
		2. Function out of component
		3. Function with `useCallback` (see [this CodeSandBox of our code](https://codesandbox.io/s/12-dependency-array-usecallback-r82lx) for an example)

		- **Note**: `useState` setter functions may be ommitted from the dependency array. [React guarrantees that their identity will stay stable across re-renders for the lifetime of the component](https://reactjs.org/docs/hooks-reference.html#usestate).

## Custom hook

12. Custom hook

	- Moving the functionality into a function, we get a custom hook: [CodeSandBox: 10 - custom hook](https://codesandbox.io/s/10-custom-hook-k9izu)

	Generalize `useFetch`: Add `error` and re-invoke with `setUrl` function:

	- Let's generalize the `useFetch` hook and allow new urls to be fetched with a function.
	- [This is the resulting CodeSandBox](https://codesandbox.io/s/11-custom-hook-extended-e5tll)
		- **Insight**: `setUrl` is basically a `doFetch`.
		- Why does hook not refetch 

13. Removing dependencies: **values**

	- Heuristic to handle values properly with hooks. Do the following (in order):
	
		1. Put all dependencies into the dependency array (don't cheat!)
		2. Now think: Can value be removed without changing the result?
	
	- In [this CodeSandBox](https://codesandbox.io/s/13-count-in-intervals-20kep) the `count` doesn't change with a `setInterval`... - Why?
	- How can you make it count? - Hint: Look at the squiggly line ;-)
	
	- Adding `count` as dependency gives us [this solution](https://codesandbox.io/s/14-count-in-intervals-fixed-03b1w). Remaining problem: Interval is set and cleared every second.
	
	- **Best solution**: Remove `count` dependency with `useState` functional updater form: [CodeSandBox: 15 - remove count dependency solution](https://codesandbox.io/s/15-remove-count-dependency-solution-1shtn): Now interval is not set and cleared on every render.

	- **Note**: With `count` as dependency and constant setting and clearing of `setInterval`, the `count` increases because of `count` dependency. Really equivalent with `setTimeout`!

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

	- [CodeSandBox with useReducer and useState Counters](https://codesandbox.io/s/usereducer-and-usestate-mutated-vs-copy-32dnc?file=/src/index.js)
	- **Task**: Observe the `console.log`s:
		1. Hit the `Dispatch (copy)` button 3 times
		2. Hit the `Dispatch (mutation)` button
		3. Observe the `console.log` statements. Do they make sense to you?

15. Removing dependencies: **values** with `useReducer` hook

	- Make entire fetch function into a `useReducer` function

	- **Issues**: This [CodeSandBox](https://codesandbox.io/s/16-count-with-steps-72bpz)
	- **Problem**: `step` causes too frequent set/clear interval calls! `step` unrelated to interval. How to remove it?
	- **Tricky**: Updater function optimization already present..

	- **Exercise**: Start with [this to implement reducer function](https://codesandbox.io/s/16-count-with-steps-usereducer-starter-code-dli0b?file=/src/index.js)

	- [**Solution** with `useReducer`](https://codesandbox.io/s/17-remove-step-with-usereducer-ffmcq)

	- **Note**: `useState` is [implemented with `useReducer`](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L248) using a [`basicStateReducer`](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-reconciler/src/ReactFiberHooks.new.js#L694). So all things we learned about `useState` also apply here.
	- `useReducer` uses the [Object.is comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

	
## useLayoutEffect

16. **[Extra]** `useLayoutEffect`:

	- **Heuristic** when to use it: If your component is flickering when state is updated.

	- **Issue 1**: Observe flickering because of `useEffect` in [this CodeSandBox](https://codesandbox.io/s/20-useeffect-flickering-no-deps-array-15lb1?file=/src/index.js)
	- **Issue 2**: `react-hooks/exhaustive-deps` issue: missing deps and then "extract it to a separate variable so it can be statically checked" - i.e. make the code simple enough so that eslint can statically analyze it (i.e. without running the code).
	- **Solution** with `useLayoutEffect`: [This CodeSandBox](https://codesandbox.io/s/21-uselayouteffect-with-deps-array-y1yx8)
	
		- **Bonus question** reply: Set it to the initial width of the rectangle (e.g. `177` in my case). Setting it to `177` again won't cause a re-render.

	- `useLayoutEffect` has same signature as `useEffect`
	- Runs synchronously after render but before DOM manipulation and paint to screen.
	- [This article](https://daveceddia.com/useeffect-vs-uselayouteffect/) summarizes its use nicely.

	> If your component is **flickering** when state is updated – as in, it renders in a partially-ready state first and then immediately re-renders in its final state – that’s a good clue that it’s time to swap in useLayoutEffect.
	

## class component vs. function component
	
17. **[Extra]** `class` vs. `component` difference on closure: 

	- [This CodeSandBox](https://codesandbox.io/s/19-class-function-comparison-ztzvc?file=/src/index.js) compares how function components and classes "close over" values. Play with it.

		- **Solution**: Click "Follow", then quickly change profile and observe name in alert.
		- **Explanation**: `this.props` is mutable in class components and immutable (`const`) in function components.

## Other `useState` phenomena

18. **[Extra]** Error "`setState` on unmounted component" occurs occasionally

	- **Established workaround**: [CodeSandBox: Observe useEffect with empty dependency array](https://codesandbox.io/s/18-check-for-unmount-fjryg)
	
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
	- [the corresponding CodeSandBox](https://codesandbox.io/s/react-usestate-setter-in-timeout-1ls9y?file=/src/App.js)

## [useMemo](https://github.com/facebook/react/blob/48d475c9ed20ab4344b3f1969716b76d8a476171/packages/react-dom/src/server/ReactPartialRendererHooks.js#L338)

20. **[Extra]** `useMemo` Example

	- `useMemo` memoizes expensive computations so they don't re-run on each render.
	- [Test useMemo in this CodeSandBox](https://codesandbox.io/s/21-usememo-u8pxt?file=/src/App.js)


21. **[Extra]** `React.memo` and `useCallback` interplay

	- `React.memo` is a higher-order-component which shallowly compares props before rendering to prevent unnecessary re-renders. 
	- The second argument of `React.memo`, i.e. a function of the form `(prevProps, nextProps) => true if same result should prevent re-render. false otherwise.` can be used to refine the props comparison.

	- In this [CodeSandBox](https://codesandbox.io/s/react-memo-and-usecallback-s9xv5?file=/src/components/Movies.tsx) the `Movie` component gets memoized because the parent `Movies` would cause it to re-render too frequently.

	- **Problem**: A passed handler reference will change on every render. If passed to children it will cause them to rerender frequently even with a wrapped `React.memo`.
	- **Solution**: The `useCallback` hook lets you keep the same callback reference between re-renders

	- 

---

## Further Comments

- The provided links to the React library are from its `server` implementation. They however exemplify their functionality better then the hook definitions in other parts of the React codebase because they are more abstract there.
