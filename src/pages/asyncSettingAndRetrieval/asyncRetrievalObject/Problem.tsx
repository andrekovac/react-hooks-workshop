import { useState } from 'react';

const Problem = () => {
  const [countObj, setCountObj] = useState<{ count: number }>({ count: 0 });

  const handleAlertClickObj = () => {
    setTimeout(() => {
      alert("You clicked on: " + countObj.count + " times!");
    }, 3000);
  };

  return (
    <div className="async-retrieval-object-example">
      <h3>Problem: Object State with Stale Closure</h3>
      <p>
        Increase the count, click on "show alert" and continue to increase the
        count. Which value do you expect to see in the alert?
      </p>
      <hr />

      <h2>Counter</h2>
      <p>
        <b>{countObj.count}</b> clicks
      </p>
      <button onClick={() => setCountObj({ count: countObj.count + 1 })}>
        Increase count
      </button>
      <button onClick={handleAlertClickObj}>Show alert</button>

      <div className="info-box warning">
        <p><strong>Problem:</strong> Even though we're using an object, the closure still captures the old reference.</p>
        <p>Each <code>setCountObj(&#123; count: ... &#125;)</code> creates a NEW object, so the closure holds the old one.</p>
      </div>
    </div>
  );
};

export default Problem;
