import { useState } from 'react';

let nonIdealCountValue = 0;

const NonIdeal = () => {
  const [count, setCount] = useState(0);
  console.log("[Non-Ideal] component rendered");

  return (
    <div className="async-setting-example">
      <h3>Non-Ideal Solution: External Variable</h3>
      <p>
        Hit the "Increase count" button a lot. Does the value increase as often
        as you clicked?
      </p>
      <hr />

      <p>
        You clicked <b>{count}</b> times
      </p>
      <button
        onClick={() => {
          nonIdealCountValue++;
          setTimeout(() => {
            setCount(nonIdealCountValue);
            console.log(count);
          }, 1000);
        }}
      >
        Increase count
      </button>

      <div className="info-box warning">
        <p><strong>Non-Ideal:</strong> Using an external variable works but has issues:</p>
        <ul>
          <li>The variable persists across component remounts</li>
          <li>Multiple instances would share the same variable</li>
          <li>It's not the "React way" of handling state</li>
        </ul>
      </div>
    </div>
  );
};

export default NonIdeal;
