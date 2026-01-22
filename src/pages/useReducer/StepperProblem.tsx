import { useState, useEffect } from "react";

const StepperProblem = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  return (
    <div className="reducer-example">
      <h1>{count}</h1>
      <div className="stepper-controls">
        <span>Stepsize: </span>
        <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} />
      </div>
      <div className="info-box warning">
        <h3>Problem: Multiple Related States</h3>
        <p>Here, we have two pieces of state, `count` and `step`, that are related. The interval's logic depends on both.</p>
        <p>Because `step` is a dependency of the `useEffect`, the interval is cleared and re-created every time you change the step size. This is inefficient.</p>
        <p>This is a good use case for `useReducer`, which lets us consolidate related state logic into one place.</p>
      </div>
    </div>
  );
};

export default StepperProblem;
