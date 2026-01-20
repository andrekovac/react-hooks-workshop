import { useState } from 'react';
import './OneStateChangeAllNewPage.css';

let obj1Cache: { count: number } | undefined;
let obj2Cache: { count: number } | undefined;

function OneStateChangeAllNewPage() {
  const [obj1, setObj1] = useState({ count: 0 });
  const [obj2, setObj2] = useState({ count: 0 });

  return (
    <div className="one-state-change-all-new-page">
      <h1>useState Updates</h1>

      <div className="counter-section">
        <p>Count 1: <b>{obj1.count}</b></p>
        <p>Count 2: <b>{obj2.count}</b></p>

        <button
          onClick={() => {
            console.log('[1] obj1 did NOT change?', obj1Cache === obj1);
            console.log('[1] obj2 did NOT change?', obj2Cache === obj2);

            setObj1({ count: obj1.count + 1 });
            obj1Cache = obj1;
          }}
          className="increment-button"
        >
          Increment count 1
        </button>

        <button
          onClick={() => {
            console.log('[2] obj1 did NOT change?', obj1Cache === obj1);
            console.log('[2] obj2 did NOT change?', obj2Cache === obj2);

            setObj2({ count: obj2.count + 1 });
            obj2Cache = obj2;
          }}
          className="increment-button"
        >
          Increment count 2
        </button>
      </div>

      <div className="explanation-box solution">
        <h3>What's happening? (Check console)</h3>

        <h4>First click on "Increment count 1":</h4>
        <ul>
          <li>
            <code>obj1Cache === obj1</code> → <code>undefined === obj1</code> → <b>false</b>
            <br />
            (cache is empty initially)
          </li>
          <li>
            <code>obj2Cache === obj2</code> → <code>undefined === obj2</code> → <b>false</b>
            <br />
            (cache is empty initially)
          </li>
          <li>Then we update obj1 and cache its OLD reference</li>
        </ul>

        <h4 className="sub-heading">Second click on "Increment count 1":</h4>
        <ul>
          <li>
            <code>obj1Cache === obj1</code> → <b>false</b>
            <br />
            Cache has OLD obj1, current is NEW obj1 (we called setObj1!)
          </li>
          <li>
            <code>obj2Cache === obj2</code> → <b>false</b> (!!)
            <br />
            Even though we didn't call setObj2, obj2 has a NEW reference!
          </li>
        </ul>

        <h4 className="sub-heading">Click on "Increment count 2":</h4>
        <ul>
          <li>Both comparisons are <b>false</b> again</li>
          <li>ALL state variables get new references on EVERY render</li>
        </ul>
      </div>

      <div className="explanation-box warning">
        <h3>⚠️ Why This Happens</h3>
        <p>
          When React re-renders your component:
        </p>
        <ol>
          <li>The entire function runs again</li>
          <li>All <code>useState</code> calls execute again</li>
          <li>React returns the CURRENT values for each state</li>
          <li>These are assigned to NEW variables (new references)</li>
          <li>Only the VALUES persist, not the variable references</li>
        </ol>
      </div>

      <div className="explanation-box">
        <h3>Mental model:</h3>
        <pre>
{`// Render 1
const [obj1, setObj1] = useState({ count: 0 })  // obj1@0x001
const [obj2, setObj2] = useState({ count: 0 })  // obj2@0x002

// User clicks "Increment count 1"
setObj1({ count: 1 })  // Triggers re-render

// Render 2
const [obj1, setObj1] = useState(...)  // obj1@0x003 (NEW!)
const [obj2, setObj2] = useState(...)  // obj2@0x004 (NEW!)
                                       // Even though obj2 VALUE
                                       // is still { count: 0 }`}
        </pre>
        <p>
          <strong>Key point:</strong> React preserves state VALUES between renders,
          but the VARIABLES holding those values are recreated each time.
        </p>
      </div>
    </div>
  );
}

export default OneStateChangeAllNewPage;
