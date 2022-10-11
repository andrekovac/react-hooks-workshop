## Definition of React Hooks

React hooks give you the ability to use stateful logic or write lifecycle-dependent code inside functional components.

It's not really easy to summarize the concept of React hooks. Let's look at some quotes:

### React Hooks definitions

> You “use” React features at the top of your component similar to how you “import” modules at the top of your file.

Simple definition.

> Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs.

Just as JSX code is a possibly conditional declaration about your UI tree, React hooks are unconditional declarations about the component’s logic.

*Both above quotes taken from [the new React docs](https://beta.reactjs.org/learn/state-a-components-memory)*.

> React hooks are the preferred way to touch React's internals.

This quote infers that inside of React hooks you have the ability to access React features in the core, whereas without them you are merely having control over variables which are detached from the React lifecycle. The only "React" feature you use is to declare the desired UI to render.

### Dependency injection?

React hooks are a form of dependency injection of state (or other hook related functionality).

### Notes

- Hooks can only be at the top-level of your component.
  - Particularly they cannot be called conditionally. That is because on each render, React requires the order of hooks to be the same.