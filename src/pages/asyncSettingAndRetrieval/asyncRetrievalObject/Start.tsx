import { useState } from 'react';

let startCountObjPersist: { count: number } | undefined;

const Start = () => {
  const [countObj, setCountObj] = useState({ count: 0 });

  const handleAlertClick = () => {
    startCountObjPersist = countObj;
    setTimeout(() => {
      alert("You clicked on: " + countObj.count);
    }, 3000);
  };

  return (
    <div className="async-retrieval-object-example">
      <h3>Start: Understanding the Setup</h3>
      <p>
        Increase the count, click on "show alert" and continue to increase the
        count. Which value do you expect to see in the alert?
      </p>
      <hr />

      <h2>Counter</h2>
      <p>
        Clicked <b>{countObj.count}</b> times
      </p>
      <button
        onClick={() => {
          setCountObj({ count: countObj.count + 1 });
          if (typeof startCountObjPersist?.count === "number") {
            startCountObjPersist.count += 1;
          }
        }}
      >
        Increase count
      </button>
      <button onClick={handleAlertClick}>Show alert</button>

      <div className="info-box warning">
        <p><strong>Question:</strong> What happens when we store a reference to the object?</p>
        <p>We assign <code>countObjPersist = countObj</code> in the click handler.</p>
        <p>Then we mutate <code>countObjPersist.count</code> on each increment.</p>
        <p>Does the alert now show the updated value? Why or why not?</p>
      </div>
    </div>
  );
};

export default Start;
