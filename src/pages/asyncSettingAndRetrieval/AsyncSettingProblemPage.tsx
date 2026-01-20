import { useState } from "react";
import "./AsyncSettingProblemPage.css";

/**
 * This code has an issue
 */
const AsyncSettingProblemPage = () => {
  const [count, setCount] = useState(0);
  console.log("component rendered", { count });

  return (
    <div className="async-setting-problem-page">
      <h3>[Action game] Lost jumps</h3>
      <p>
        Hit the "Jump" button a lot. Does the value increase as often as you
        clicked? In other words: Does every jump count?
      </p>
      <hr />

      <p>
        You jumped <b>{count}</b> times
      </p>
      <button
        onClick={() => {
          setTimeout(() => {
            // "count" is frozen at the value of the first render
            setCount(count + 1);
            console.log(count);
          }, 2000);
        }}
      >
        Jump
      </button>
    </div>
  );
};

export default AsyncSettingProblemPage;
