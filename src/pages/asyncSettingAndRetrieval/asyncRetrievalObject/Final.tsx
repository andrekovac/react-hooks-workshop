import { useState } from 'react';

let finalCountObjPersist: { count: number } | undefined;

const Final = () => {
  const [countObj, setCountObj] = useState({ count: 0 });

  const handleAlertClick = () => {
    finalCountObjPersist = countObj;
    setTimeout(() => {
      alert("You clicked on: " + countObj.count);
    }, 3000);
  };

  return (
    <div className="async-retrieval-object-example">
      <h3>Final: Understanding References</h3>
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
          if (typeof finalCountObjPersist?.count === "number") {
            finalCountObjPersist.count += 1;
          }
        }}
      >
        Increase count
      </button>
      <button onClick={handleAlertClick}>Show alert</button>

      <div className="info-box success">
        <p><strong>Key Insight:</strong> The closure captures the object REFERENCE, not a copy.</p>
        <p>When we set <code>countObjPersist = countObj</code>, both variables point to the SAME object in memory.</p>
        <p>Mutating <code>countObjPersist.count++</code> changes the same object that <code>countObj</code> references.</p>
        <p>This is exactly how <code>useRef</code> works internally - it uses an object with a <code>.current</code> property!</p>
      </div>
    </div>
  );
};

export default Final;
