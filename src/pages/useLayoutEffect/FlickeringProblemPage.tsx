import { useState, useEffect, useRef } from 'react';
import './FlickeringProblemPage.css';

function FlickeringProblemPage() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef<HTMLTextAreaElement>(null);

  const cH = el?.current?.clientHeight;
  const cW = el?.current?.clientWidth;

  useEffect(() => {
    if (el.current) {
      setWidth(el.current.clientWidth);
      setHeight(el.current.clientHeight);
    }
  }, [cH, cW]);

  return (
    <div className="flickering-problem-page">
      <h1>useEffect Flickering</h1>
      <h2>Resize the textarea</h2>
      <hr />
      <p>
        textarea width: <b>{width}px</b>
      </p>
      <p>
        textarea height: <b>{height}px</b>
      </p>
      <textarea
        onClick={() => {
          // @ts-expect-error
          setWidth(undefined);
        }}
        ref={el}
      />
      <hr />
      <p>Can you observe any unpleasant behavior in the UI?</p>
      <div className="info-box">
        <h3>⚠️ TWO Problems in this example:</h3>
        <h4>Problem 1: Values don't update when resizing</h4>
        <ul>
          <li>Resize the textarea - notice values often DON'T update</li>
          <li>The effect only runs when something ELSE causes a re-render (like clicking)</li>
          <li>This is because <code>el.current</code> is the same object - resizing doesn't change the reference</li>
        </ul>
        <h4>Problem 2: Flickering when values DO update</h4>
        <ol>
          <li>Resize the textarea</li>
          <li><strong>Click inside</strong> (don't type!) - this triggers re-render and effect</li>
          <li>Watch the numbers briefly show "px" (undefined) then update</li>
          <li>This flicker happens because useEffect runs AFTER paint</li>
        </ol>
        <p><strong>Why clicking sets width to undefined:</strong> It's a trick to force a re-render so the effect runs. In the real world, you'd want the effect to run automatically when resizing!</p>
      </div>
    </div>
  );
}

export default FlickeringProblemPage;
