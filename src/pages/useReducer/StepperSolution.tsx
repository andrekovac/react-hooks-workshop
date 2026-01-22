import { useEffect, useReducer } from "react";

type StateT = {
  count: number;
  step: number;
};
type ActionT = { type: "tick" } | { type: "step"; step: number };

const initalState: StateT = {
  count: 0,
  step: 1
};

const reducer = (state: StateT, action: ActionT): StateT => {
  const { count, step } = state;
  switch (action.type) {
    case "tick":
      return { ...state, count: count + step };
    case "step":
      return { ...state, step: action.step };
    default:
      throw new Error();
  }
};

const StepperSolution = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, []); // Dispatch is stable and doesn't need to be a dependency

  return (
    <div className="reducer-example">
      <h1>{count}</h1>
      <div className="stepper-controls">
        <span>Stepsize: </span>
        <input
          type="number"
          value={step}
          onChange={(e) =>
            dispatch({ type: "step", step: Number(e.target.value) })
          }
        />
      </div>
      <div className="info-box success">
        <h3>Solution: Consolidating with `useReducer`</h3>
        <p>By moving the state logic into a `reducer` function, we can manage both `count` and `step` together.</p>
        <p>The `dispatch` function from `useReducer` is stable and doesn't change between renders. This means our `useEffect` no longer depends on any changing values (`step` is now inside the reducer's state).</p>
        <p>The interval is created only once and is never cleared and re-created, making this much more efficient.</p>
        <pre>
{`const reducer = (state, action) => {
  switch (action.type) {
    case "tick":
      return { ...state, count: state.count + state.step };
    case "step":
      return { ...state, step: action.step };
    default:
      throw new Error();
  }
};

// ...
useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: "tick" });
  }, 1000);
  return () => clearInterval(id);
}, []); // <-- No dependencies needed!`}
        </pre>
      </div>
    </div>
  );
};

export default StepperSolution;
