# Class Component vs. Function Component

`class` vs. `component` difference on closure: 

- [**CodeSandBox**: class vs. function component](https://codesandbox.io/s/class-function-comparison-v2xv4?file=/src/index.tsx) compares how function components and classes "close over" values. Play with it.

    - **Solution**: Click "Follow", then quickly change profile and observe name in alert.
    - **Explanation**: `this.props` is mutable in class components and immutable (`const`) in function components.