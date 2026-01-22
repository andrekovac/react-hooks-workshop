import { useState } from 'react';

const myCount = { count: 0 };

const ClosureDemo = () => {
  const [count, setCount] = useState(0);

  const handleAlertClick = () => {
    setTimeout(() => {
      // myCount is an object outside of the component, so it's not part of the closure
      // and its value is read at the time of the alert.
      alert("You clicked on: " + myCount.count);
    }, 3000);
  };

  return (
    <div className="async-retrieval-example">
      <h3>Closure Demo: Object Reference</h3>
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
          myCount.count += 1;
        }}
      >
        Increment clicks count
      </button>
      <div className="spacer" />
      <button onClick={handleAlertClick}>Display clicks</button>

      <div className="info-box success">
        <p><strong>Key Insight:</strong> Objects are stored by reference!</p>
        <p>The closure captures the reference to <code>myCount</code>, not the value.</p>
        <p>When the timeout runs, it reads the current property from the same object reference.</p>
        <p>This is the foundation for understanding <code>useRef</code>.</p>
      </div>
    </div>
  );
};

export default ClosureDemo;
