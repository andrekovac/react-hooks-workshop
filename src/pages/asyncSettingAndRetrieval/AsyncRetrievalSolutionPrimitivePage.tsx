import { useState } from "react";
import "./AsyncRetrievalSolutionPrimitivePage.css";

// new helper variable
let countPersist = 0;

/**
 * Solution
 */
const AsyncRetrievalSolutionPrimitivePage = () => {
  const [count, setCount] = useState(0);

  const handleAlertClick = () => {
    // What's happening here?
    countPersist = count;
    setTimeout(() => {
      // Why is `countPersist` used here?
      alert("You clicked on: " + countPersist);
    }, 3000);
  };

  return (
    <div className="async-retrieval-solution-primitive-page">
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
          // What does this line do?
          countPersist += 1;
        }}
      >
        Increment clicks count
      </button>
      <div className="spacer" />
      <button onClick={handleAlertClick}>Display clicks</button>
    </div>
  );
};

export default AsyncRetrievalSolutionPrimitivePage;
