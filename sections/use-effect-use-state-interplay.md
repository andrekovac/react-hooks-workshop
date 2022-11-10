## `useEffect` and `useState` interplay

### Removing dependencies: **values**

- Heuristic to handle values properly with hooks. Do the following (in order):

    1. Put all dependencies into the dependency array (don't cheat!)
    2. Now think: Can value be removed without changing the result?

- In [**CodeSandBox**: count in intervals](https://codesandbox.io/s/count-in-intervals-38qlr7) the `count` doesn't change with a `setInterval`... - Why?
- How can you make it count? - *Hint*: Look at the squiggly line ;-)

**Intermediate result**:

- Adding `count` as dependency gives us [**CodeSandBox** solution](https://codesandbox.io/s/count-in-intervals-fixed-5wicj). Remaining problem: Interval is set and cleared every second.

- **Note**: With `count` as dependency and constant setting and clearing of `setInterval`, the `count` increases because of `count` dependency. Really equivalent with `setTimeout`, i.e. rougly equivalent to `setTimeout(() => setCount(count + 1), 1000);`

**Best solution**

- Remove `count` dependency via `useState` functional updater form: [CodeSandBox: 15 - remove count dependency solution](https://codesandbox.io/s/remove-count-dependency-better-solution-4c9co): Now interval is not set and cleared on every render.
