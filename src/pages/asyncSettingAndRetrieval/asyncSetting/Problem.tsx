import { useState } from 'react';

const Problem = () => {
  const [count, setCount] = useState(0);
  console.log("[Problem] component rendered", { count });

  return (
    <div className="async-setting-example">
      <h3>[Action game] Lost jumps</h3>
      <p>
        Hit the "Jump" button a lot. Does the value increase as often as you
        clicked? In other words: Does every jump count?
      </p>
      <hr />

      <p>
        You jumped <b>{count}</b> times
      </p>
      <button
        onClick={() => {
          setTimeout(() => {
            // "count" is frozen at the value of the first render
            setCount(count + 1);
            console.log(count);
          }, 2000);
        }}
      >
        Jump
      </button>

      <div className="info-box warning">
        <p><strong>Problem:</strong> The <code>count</code> variable is captured in the closure when the timeout is set.</p>
        <p>Each click captures the current value, so rapid clicks all see the same "frozen" value.</p>
      </div>
    </div>
  );
};

export default Problem;
