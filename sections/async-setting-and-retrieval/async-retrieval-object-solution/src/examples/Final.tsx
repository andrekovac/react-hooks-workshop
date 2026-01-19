import { useState } from "react";

// new helper variable
let countObjPersist: { count: number } | undefined;

/**
 * count in complex data type (object)
 */
const Final = () => {
  const [countObj, setCountObj] = useState({ count: 0 });

  const handleAlertClick = () => {
    // store reference to frozen countObj at time of click
    // countObj now has a second pointer to the same number in memory.
    countObjPersist = countObj;
    setTimeout(() => {
      // countObj here is the frozen countObj.
      // But since its a complex data type, countObjPersist points
      // to the same 'count' value in memory and hence `countObj.count` got updated.
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
          if (typeof countObjPersist?.count === "number") {
            // Incrementing countObjPersist will simultaneously
            // increase the frozen countObj (because 'countObjPersist'
            // is only a copy by reference)
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

export default Final;
