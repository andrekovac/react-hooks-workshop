import { useState } from "react";
import "./AsyncRetrievalClosureDemoPage.css";

// new helper variable
const myCount = { count: 0 };

/**
 * Solution
 */
const AsyncRetrievalClosureDemoPage = () => {
  const [count, setCount] = useState(0);

  const handleAlertClick = () => {
    setTimeout(() => {
      // myCount is an object outside of the component, so it's not part of the closure
      // and its value is read at the time of the alert.
      alert("You clicked on: " + myCount.count);
    }, 3000);
  };

  return (
    <div className="async-retrieval-closure-demo-page">
      <h3>Do the following:</h3>
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
    </div>
  );
};

export default AsyncRetrievalClosureDemoPage;
