import { useState, useRef } from 'react';
import './RefVsStateVsLocal.css';

let refCache: React.MutableRefObject<number> | null = null;
let objCache: { a: number } | null = null;
let functionCache: (() => null) | null = null;

function RefVsStateVsLocalPage() {
  const [value, setValue] = useState({ a: 1 });
  const valueRef = useRef(0);

  const handler = () => null;

  console.log('object.is useState value: ' + value.a, Object.is(value, objCache));
  console.log('object.is useRef current value: ' + valueRef.current, Object.is(valueRef, refCache));
  console.log('object.is handler function', Object.is(handler, functionCache));

  return (
    <div className="ref-vs-state-vs-local-page">
      <h1>useRef: Ref vs State vs Local Variable</h1>
      <p className="info-box">
        Open the console to see Object.is() comparisons on each render
      </p>

      <div className="counter-section">
        <h2>Count value in object: {value.a}</h2>
        <h2>Count value in ref: {valueRef.current}</h2>
        <h2>
          Count value stored outside of component:{' '}
          {objCache ? objCache.a : 'null'}
        </h2>

        <button
          className="increment-button"
          onClick={() => {
            setValue((v) => {
              return { a: v.a + 1 };
            });
            valueRef.current += 1;

            refCache = valueRef;
            objCache = value;
            functionCache = handler;
          }}
        >
          Increment
        </button>
      </div>

      <div className="observations-box">
        <h3>Key Observations:</h3>
        <ul>
          <li><strong>useState object</strong>: Always different on each render (triggers re-render)</li>
          <li><strong>useRef object</strong>: Same object reference across all renders (stable)</li>
          <li><strong>Function</strong>: Recreated on every render (different reference)</li>
          <li><strong>Local variable</strong>: Always recreated</li>
        </ul>
      </div>
    </div>
  );
}

export default RefVsStateVsLocalPage;
