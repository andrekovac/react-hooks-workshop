import { useState } from 'react';
import './UseStateBasicPage.css';

// External variable - still here for comparison
let countOutside = 0;

function UseStateBasicPage() {
  // Internal variable - still resets to 0
  let countInside = 0;

  console.log('Component rendered');

  // useState - the solution!
  // Returns [currentValue, setterFunction]
  const [countState, setCountState] = useState<number>(0);

  const handleClick = () => {
    countInside++;
    countOutside++;
    // Updater function: receives previous state, returns new state
    setCountState((prevState) => prevState + 1);
    console.log({ countInside, countOutside });
  };

  return (
    <div className="useState-basic-page">
      <h1>useState Basic</h1>

      <div className="count-display-section">
        <p>
          [inside] You clicked <b>{countInside}</b> times
        </p>
        <p>
          [outside] You clicked <b>{countOutside}</b> times
        </p>
        <p>
          [useState] You clicked <b className="useState-count">{countState}</b> times ✅
        </p>
      </div>

      <button onClick={handleClick} className="click-button">
        Click me
      </button>

      <div className="explanation-box success">
        <h3>✅ useState works!</h3>
        <ul>
          <li>
            <strong>countState</strong> increments correctly!
          </li>
          <li>It persists across re-renders</li>
          <li>Calling <code>setCountState</code> triggers a re-render</li>
          <li>React preserves the state between renders</li>
        </ul>
      </div>

      <div className="explanation-box info">
        <h3>How useState works:</h3>
        <ol>
          <li><code>const [value, setValue] = useState(initialValue)</code></li>
          <li><code>value</code>: Current state value</li>
          <li><code>setValue</code>: Function to update the state</li>
          <li>When you call <code>setValue</code>, React:
            <ul>
              <li>Stores the new value</li>
              <li>Triggers a re-render</li>
              <li>Returns the new value on next render</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="explanation-box">
        <h3>Updater function pattern:</h3>
        <pre>
{`// ✅ Good: Updater function
setCount(prevCount => prevCount + 1)

// ⚠️  Also works, but less safe with multiple updates:
setCount(count + 1)`}
        </pre>
        <p className="note">
          <strong>Pro tip:</strong> Use the updater function when the new state depends on the previous state. It's safer for batched updates!
        </p>
      </div>
    </div>
  );
}

export default UseStateBasicPage;
