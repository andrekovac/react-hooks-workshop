import { useState, useEffect, useReducer } from "react";

type StateT = {
  foo: number;
};

let previousValue = { foo: -1 };
let previousValue2 = { foo: -1 };

const MutationVsCopy = () => {
  // useReducer with mutation
  const [value, dispatchValue] = useReducer(
    (state: StateT, action: number) => {
      state.foo += action;
      return state; // Returns the same state object
    },
    { foo: 0 }
  );

  // useReducer with new object
  const [value2, dispatchValue2] = useReducer(
    (state: StateT, action: number) => {
      return { ...state, foo: state.foo + action }; // Returns a new state object
    },
    { foo: 0 }
  );

  // useState with new object
  const [value3, setValue3] = useState({ foo: 0 });
  
  // useState with mutation (will not work)
  const [value4, setValue4] = useState({ foo: 0 });

  useEffect(() => {
    console.log(`[useReducer mutation]: ${value.foo}, same object? - ${Object.is(previousValue, value) ? "YES" : "NO"}`);
    previousValue = value;
  }, [value]);

  useEffect(() => {
    console.log(`[useReducer new value]: ${value2.foo}, same object? - ${Object.is(previousValue2, value2) ? "YES" : "NO"}`);
    previousValue2 = value2;
  }, [value2]);

  return (
    <div className="reducer-example">
      <div className="info-box">
        <h3>`useReducer` vs `useState`: Mutation vs. New Object</h3>
        <p>This example demonstrates how `useReducer` and `useState` behave when you mutate state vs. when you return a new object. Open the console to see the logs.</p>
        <p><strong>Key takeaway:</strong> React decides whether to re-render by comparing the object reference. If you return the same object (even if you mutated its contents), a re-render might be skipped.</p>
        <p><strong>Rule of thumb:</strong> Always return a new object/array from your reducers and state setters.</p>
      </div>
      <div className="comparison-grid">
        <div className="reducer-column">
          <h4>useReducer (mutation)</h4>
          <h3>{value.foo}</h3>
          <button onClick={() => dispatchValue(1)}>Dispatch (mutation)</button>
          <p className="note">UI updates, but it's a bad practice. React may bail out of updates in the future if the reference doesn't change.</p>
        </div>
        <div className="reducer-column">
          <h4>useReducer (copy)</h4>
          <h3>{value2.foo}</h3>
          <button onClick={() => dispatchValue2(1)}>Dispatch (copy)</button>
          <p className="note">Correct. The UI updates because a new object is returned.</p>
        </div>
        <div className="reducer-column">
          <h4>useState (mutation)</h4>
          <h3>{value4.foo}</h3>
          <button
            onClick={() =>
              setValue4((s) => {
                s.foo += 1;
                return s; // Will NOT re-render
              })
            }
          >
            setState (mutation)
          </button>
          <p className="note">Will not work. `useState` does a strict `===` check, sees the same object, and bails out of the re-render.</p>
        </div>
        <div className="reducer-column">
          <h4>useState (copy)</h4>
          <h3>{value3.foo}</h3>
          <button onClick={() => setValue3({ foo: value3.foo + 1 })}>
            setState (copy)
          </button>
          <p className="note">Correct. A new object is created, forcing a re-render.</p>
        </div>
      </div>
    </div>
  );
};

export default MutationVsCopy;
