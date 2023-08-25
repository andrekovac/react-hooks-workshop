## `useImperativeHandle` hook

> `useImperativeHandle` *customizes* the instance value that is exposed to parent components when using `ref`

**Notes**:

- It's mostly used in combination with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html)
- It's a way to mimic the `ref` prop in class components (see [this reply](https://stackoverflow.com/a/61452677/3210677) for more information).

### Example

- [**CodeSandBox**: useImperativeHandle hook](https://codesandbox.io/s/useimperativehandle-9vwqj)

    - It contains a customized input field.
    - Example taken and adapted from [this StackOverFlow reply](https://stackoverflow.com/a/57006787/3210677).

### Another example

You might want to customize the `measureInWindow` property of an `input` to measure a wrapper around it instead of the input field itself.
