import { useState } from "react";
import "./AsyncRetrievalProblemPage.css";

/**
 * Problem
 */
const AsyncRetrievalProblemPage = () => {
  const [count, setCount] = useState<number>(0);

  const handleAlertClick = () => {
    setTimeout(() => {
      alert("You clicked " + count + " times!");
    }, 3000);
  };

  return (
    <div className="async-retrieval-problem-page">
      <h3>Do the following:</h3>
      <p>
        Increment the clicks count, click on "Display clicks" and continue to
        increase the count. Which value do you expect to see in the alert?
      </p>
      <hr />

      <h2>Counter</h2>
      <p>
        <b>{count}</b> clicks
      </p>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increment clicks count
      </button>
      <div className="spacer" />
      <button onClick={handleAlertClick}>Display clicks</button>
    </div>
  );
};

export default AsyncRetrievalProblemPage;
