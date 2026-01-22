import { useState } from 'react';

const Solution = () => {
  const [count, setCount] = useState<number>(0);
  console.log("[Solution] component rendered");

  return (
    <div className="async-setting-example">
      <h3>Solution: Updater Function</h3>
      <p>
        Hit the "Increase count" button a lot. Does the value increase as often
        as you clicked?
      </p>
      <hr />

      <p>You clicked <b>{count}</b> times</p>
      <button
        onClick={() => {
          setTimeout(() => {
            // updater function form of setState
            // ensures that the latest state is used
            setCount((c) => c + 1);
          }, 1000);
        }}
      >
        Increase count
      </button>

      <div className="info-box success">
        <p><strong>Solution:</strong> Use the updater function form of <code>setState</code>.</p>
        <p><code>setCount(c =&gt; c + 1)</code> always operates on the latest state value.</p>
        <p>This is the correct React pattern for async state updates.</p>
      </div>
    </div>
  );
};

export default Solution;
