import { useState } from 'react';

let countPersist = 0;

const SolutionPrimitive = () => {
  const [count, setCount] = useState(0);

  // Reset on mount
  countPersist = count;

  const handleAlertClick = () => {
    countPersist = count;
    setTimeout(() => {
      alert("You clicked on: " + countPersist);
    }, 3000);
  };

  return (
    <div className="async-retrieval-example">
      <h3>Solution: External Variable (Primitive)</h3>
      <p>
        Increment the clicks count, click on "Display clicks" and continue to
        increase the count. Which value do you expect to see in the alert?
      </p>
      <hr />

      <h2>Counter</h2>
      <p>
        Clicked <b>{count}</b> times
      </p>
      <button
        onClick={() => {
          setCount(count + 1);
          countPersist += 1;
        }}
      >
        Increment clicks count
      </button>
      <div className="spacer" />
      <button onClick={handleAlertClick}>Display clicks</button>

      <div className="info-box warning">
        <p><strong>Approach:</strong> Store the value in an external variable that persists outside the component.</p>
        <p>The alert reads from <code>countPersist</code> which holds the latest value.</p>
        <p><strong>Note:</strong> This works but has the same issues as the non-ideal solution for async setting.</p>
      </div>
    </div>
  );
};

export default SolutionPrimitive;
