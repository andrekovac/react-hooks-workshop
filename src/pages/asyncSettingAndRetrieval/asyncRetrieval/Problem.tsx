import { useState } from 'react';

const Problem = () => {
  const [count, setCount] = useState<number>(0);

  const handleAlertClick = () => {
    setTimeout(() => {
      alert("You clicked " + count + " times!");
    }, 3000);
  };

  return (
    <div className="async-retrieval-example">
      <h3>Problem: Stale Closure</h3>
      <p>
        Increment the clicks count, click on "Display clicks" and continue to
        increase the count. Which value do you expect to see in the alert?
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
        <p><strong>Problem:</strong> The alert shows the count value from when the button was clicked, not the current value.</p>
        <p>This is because <code>count</code> is captured in the closure at the moment the timeout was created.</p>
      </div>
    </div>
  );
};

export default Problem;
