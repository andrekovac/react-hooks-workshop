import { useState } from "react";

// new helper variable
let countObjPersist: { count: number } | undefined;

/**
 * count stored in complex data type (object)
 */
const Start = () => {
  const [countObj, setCountObj] = useState({ count: 0 });

  const handleAlertClick = () => {
    // What happens here?
    countObjPersist = countObj;
    setTimeout(() => {
      // Why is `countObj.count` used here?
      alert("You clicked on: " + countObj.count);
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

      <p>
        Clicked <b>{countObj.count}</b> times
      </p>
      <button
        onClick={() => {
          setCountObj({ count: countObj.count + 1 });
          // Why this check for type `number`?
          if (typeof countObjPersist?.count === "number") {
            // Why does the onClick handler now increase both count values?
            countObjPersist.count += 1;
          }
        }}
      >
        Increase count
      </button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};

export default Start;
