import { useState, useRef, useEffect } from 'react';

const SolutionUseRef = () => {
  const [count, setCount] = useState<number>(0);
  const countRef = useRef<number>(0);

  // Keep ref in sync with state
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const handleAlertClick = () => {
    setTimeout(() => {
      // Solution: Retrieve from ref, which always has the latest value
      alert("You clicked " + countRef.current + " times!");
    }, 3000);
  };

  return (
    <div className="async-retrieval-example">
      <h3>Solution: useRef (Idiomatic)</h3>
      <p>
        Increment the clicks count, click on "Display clicks" and continue to
        increase the count. Now it shows the current value using <code>useRef</code>!
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

      <div className="info-box success">
        <p><strong>Approach:</strong> Use <code>useRef</code> to store a mutable reference to the latest value.</p>
        <p>When retrieving the value in the async callback, read from <code>countRef.current</code> which always contains the latest count value.</p>
        <p>The ref persists across renders and can be updated without causing re-renders.</p>
        <p><strong>This is the React-recommended way to solve stale closure problems when retrieving values!</strong></p>
      </div>
    </div>
  );
};

export default SolutionUseRef;
