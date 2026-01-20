import { useState, useEffect, useRef } from 'react';
import './RefVsExternalVariable.css';

// This is GLOBAL and shared across ALL component instances
let countCache = 0;

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countCache = count;
    countRef.current = count;
  });

  return (
    <div className="counter-container">
      <button onClick={() => setCount((p) => p + 1)}>
        click me
      </button>
      <h3>External Variable (Global)</h3>
      <div className="count-display">{countCache}</div>
      <h3>useRef (Instance)</h3>
      <div className="count-display">{countRef.current}</div>
    </div>
  );
}

function RefVsExternalVariablePage() {
  return (
    <div className="ref-vs-external-variable-page">
      <h1>useRef vs External Variable</h1>
      <p className="info-box">
        Click the buttons in each counter independently. Notice:
      </p>
      <ul>
        <li><strong>External Variable (countCache)</strong>: Shared between ALL component instances - clicking one affects the other!</li>
        <li><strong>useRef (countRef)</strong>: Bound to each component instance - each counter has its own independent value</li>
      </ul>

      <div className="counters-wrapper">
        <Counter />
        <Counter />
      </div>

      <div className="key-takeaway-box">
        <h3>Key Takeaway:</h3>
        <p>
          <code>useRef</code> is bound to a component <strong>instance</strong> (just like <code>useState</code>).
          External variables are global and shared across all instances.
        </p>
        <p>
          See <a href="https://stackoverflow.com/questions/57444154/why-need-useref-and-not-mutable-variable" target="_blank" rel="noopener noreferrer">
            this StackOverflow discussion
          </a> for more details.
        </p>
      </div>
    </div>
  );
}

export default RefVsExternalVariablePage;
