import { useState } from "react";
import "./App.css";

/**
 * Solution!
 */
const App = () => {
  const [count, setCount] = useState<number>(0);
  console.log("component rendered");

  return (
    <div>
      <h3>Lost values</h3>
      <p>
        Hit the "Increase count" button a lot. Does the value increase as often
        as you clicked?
      </p>
      <hr />

      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setTimeout(() => {
            // updater function form of setState
            // ensures that the latest state is used
            setCount((c) => c + 1);
          }, 1000);
        }}
      >
        Increase count
      </button>
    </div>
  );
};

export default App;
