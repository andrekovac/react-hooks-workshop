import { useState } from "react";
import "./App.css";

/**
 * Problem
 */
const App = () => {
  const [countObj, setCountObj] = useState<{ count: number }>({ count: 0 });

  const handleAlertClickObj = () => {
    setTimeout(() => {
      alert("You clicked on: " + countObj.count + " times!");
    }, 3000);
  };

  return (
    <div>
      <h3>Do the following:</h3>
      <p>
        Increase the count, click on "show alert" and continue to increase the
        count. Which value do you expect to see in the alert?
      </p>
      <hr />

      <h2>Counter</h2>
      <p>
        <b>{countObj.count}</b> clicks
      </p>
      <button
        onClick={() => {
          setCountObj({ count: countObj.count + 1 });
        }}
      >
        Increase count
      </button>
      <button onClick={handleAlertClickObj}>Show alert</button>
    </div>
  );
};

export default App;
