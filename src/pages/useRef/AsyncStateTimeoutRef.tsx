import { useState, useRef } from 'react';
import './AsyncStateTimeoutRef.css';

const AsyncStateTimeoutRefPage = () => {
  const [count, setCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const countRef = useRef(0);

  const handleAlertClick = () => {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  };

  const handleAlertClickWithRef = () => {
    setTimeout(() => {
      alert('You clicked on (with ref): ' + countRef.current);
    }, 3000);
  };

  return (
    <div className="async-state-timeout-ref-page">
      <h2>Introducing refs</h2>
      <hr />

      <div className="info-box">
        <h3>The Stale Closure Problem</h3>
        <p>
          When you click "Show alert", a timeout starts. The <code>count</code> value
          inside that timeout is "frozen" (it closes over the value at that moment).
        </p>
        <p>
          If you increment the counter before the alert shows, the alert will still
          show the <strong>old</strong> value because of closure!
        </p>
      </div>

      <p className="count-display">
        You clicked {count} times
      </p>

      <div className="buttons-container">
        <button
          ref={buttonRef}
          onClick={() => {
            setCount((c) => c + 1);
            countRef.current = count + 1;
          }}
        >
          Increase value
        </button>

        <button className="stale-button" onClick={handleAlertClick}>
          Show alert (with stale state)
        </button>

        <button className="ref-button" onClick={handleAlertClickWithRef}>
          Show alert (with ref - latest value)
        </button>
      </div>

      <div className="try-it-box stale">
        <h3>Try this:</h3>
        <ol>
          <li>Click "Show alert (with stale state)"</li>
          <li>Quickly click "Increase value" several times (before 3 seconds)</li>
          <li>Wait for the alert - it shows the OLD value! ⚠️</li>
        </ol>
      </div>

      <div className="try-it-box ref">
        <h3>Now try with ref:</h3>
        <ol>
          <li>Click "Show alert (with ref - latest value)"</li>
          <li>Quickly click "Increase value" several times</li>
          <li>Wait for the alert - it shows the LATEST value! ✅</li>
        </ol>
      </div>

      <div className="key-insight-box">
        <h3>Key Insight:</h3>
        <p>
          <strong>State closes over:</strong> The <code>count</code> value is frozen at the time
          the timeout is created (closure behavior).
        </p>
        <p>
          <strong>Ref always current:</strong> The <code>countRef.current</code> value is always
          the latest because ref is a mutable object that persists across renders.
        </p>
        <p>
          <strong>Note for React 19.2+:</strong> In Effects, you can now use <code>useEffectEvent</code>
          instead of the ref pattern for cleaner code. See the <a href="../README.md">useRef README</a> for details.
        </p>
      </div>
    </div>
  );
};

export default AsyncStateTimeoutRefPage;
