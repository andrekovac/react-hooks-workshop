## `useImperativeHandle` hook

> `useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`
- It's mostly used in combination with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html)

- [**CodeSandBox**: useImperativeHandle hook](https://codesandbox.io/s/useimperativehandle-9vwqj)

    - It contains a customized input field.
    - Example taken and adapted from [this StackOverFlow reply](https://stackoverflow.com/a/57006787/3210677).

- Another example: You might want to customize the `measureInWindow` property of an `input` to measure a wrapper around it instead of the input field itself.
