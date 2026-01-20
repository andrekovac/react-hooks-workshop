import { useState } from "react";
import "./AsyncSettingNonIdealPage.css";

let countValue = 0;

/**
 * This is a non-ideal solution
 */
const AsyncSettingNonIdealPage = () => {
  const [count, setCount] = useState(0);
  console.log("component rendered");

  return (
    <div className="async-setting-non-ideal-page">
      <h3>Lost values</h3>
      <p>
        Hit the "Increase count" button a lot. Does the value increase as often
        as you clicked?
      </p>
      <hr />

      <p>
        You clicked <b>{count}</b> times
      </p>
      <button
        onClick={() => {
          countValue++;
          setTimeout(() => {
            setCount(countValue);
            console.log(count);
          }, 1000);
        }}
      >
        Increase count
      </button>
    </div>
  );
};

export default AsyncSettingNonIdealPage;
