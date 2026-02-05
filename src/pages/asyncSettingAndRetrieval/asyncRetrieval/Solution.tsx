import { useState } from 'react';

let countPersist = 0;

const Solution = () => {
  const [count, setCount] = useState<number>(0);

  // Keep external variable in sync
  countPersist = count;

  const handleAlertClick = () => {
    setTimeout(() => {
      // Solution: Retrieve from external variable, which always has the latest value
      alert("You clicked " + countPersist + " times!");
    }, 3000);
  };

  return (
    <div className="async-retrieval-example">
      <h3>Solution: External Variable</h3>
      <p>
        Increment the clicks count, click on "Display clicks" and continue to
        increase the count. Now it shows the current value!
      </p>
      <hr />

      <h2>Counter</h2>
      <p>
        <b>{count}</b> clicks
      </p>
      <button onClick={() => setCount((c) => c + 1)}>
        Increment clicks count
      </button>
      <div className="spacer" />
      <button onClick={handleAlertClick}>Display clicks</button>

      <div className="info-box warning">
        <p><strong>Approach:</strong> Store the value in an external variable that persists outside the component.</p>
        <p>When retrieving the value in the async callback, read from <code>countPersist</code> which always holds the latest value.</p>
        <p><strong>Note:</strong> This works but has limitations (module-level variable, requires manual sync, not React-idiomatic).</p>
      </div>
    </div>
  );
};

export default Solution;
