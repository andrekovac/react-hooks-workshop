## Error "`setState` on unmounted component" occurs occasionally

- **Established workaround**: [**CodeSandBox**: Observe useEffect with empty dependency array (JS)](https://codesandbox.io/s/18-check-for-unmount-fjryg)

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