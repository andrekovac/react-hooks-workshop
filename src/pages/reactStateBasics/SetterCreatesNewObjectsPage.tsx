import { useState, useEffect } from 'react';
import './SetterCreatesNewObjectsPage.css';

let store: { value: boolean } | undefined = undefined;

function SetterCreatesNewObjectsPage() {
  const [obj, setObj] = useState({ value: true });

  useEffect(() => {
    console.log('setObj creates new object. Same?:', Object.is(store, obj));
    store = obj;
    console.log('objects are the same now. Same?:', Object.is(store, obj));
  }, [obj]);

  return (
    <div className="setter-creates-new-objects-page">
      <h1>setState Creates New Objects</h1>

      <div className="control-section">
        <h2>
          Value: <b>{obj.value.toString()}</b>
        </h2>

        <button onClick={() => setObj({ value: !obj.value })}>
          Flip obj
        </button>
      </div>

      <div className="explanation-box solution">
        <h3>What's happening? (Check console)</h3>
        <ol>
          <li>
            <strong>First log:</strong> Compares previous object (in store) with current object
            <br />
            Result: <code>false</code> - They're different references!
          </li>
          <li>
            <strong>Assignment:</strong> <code>store = obj</code> makes them point to same object
          </li>
          <li>
            <strong>Second log:</strong> Now they're the same reference
            <br />
            Result: <code>true</code>
          </li>
          <li>
            <strong>On next click:</strong> <code>setObj({"{ value: !obj.value }"})</code> creates NEW object
            <br />
            First log shows <code>false</code> again!
          </li>
        </ol>
      </div>

      <div className="explanation-box warning">
        <h3>⚠️ Important Points</h3>
        <ul>
          <li>
            <code>setObj({"{ value: !obj.value }"})</code> creates a NEW object every time
          </li>
          <li>
            Even if the value is the same, the object reference is different
          </li>
          <li>
            This is why React can detect state changes - it compares references!
          </li>
          <li>
            <code>Object.is(a, b)</code> is similar to <code>a === b</code> for objects
          </li>
        </ul>
      </div>

      <div className="explanation-box">
        <h3>Visual representation:</h3>
        <pre>
{`// Click 1
setObj({ value: false })  // Creates object at memory address 0x001
store = obj               // store now points to 0x001
Object.is(store, obj)     // true (same address)

// Click 2
setObj({ value: true })   // Creates NEW object at 0x002
Object.is(store, obj)     // false (0x001 !== 0x002)
store = obj               // store now points to 0x002
Object.is(store, obj)     // true again`}
        </pre>
      </div>
    </div>
  );
}

export default SetterCreatesNewObjectsPage;
