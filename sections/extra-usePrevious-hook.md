## Extra: `usePrevious`: Custom hook example using `useRef`

Since `useRef` can store the value across a re-render you can use it to store a value from a previous render, i.e. as a custom  hook:

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