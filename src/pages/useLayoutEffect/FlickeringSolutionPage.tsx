import { useState, useLayoutEffect, useRef } from 'react';
import './FlickeringSolutionPage.css';

function FlickeringSolutionPage() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef<HTMLTextAreaElement>(null);

  const cH = el?.current?.clientHeight;
  const cW = el?.current?.clientWidth;

  useLayoutEffect(() => {
    if (el.current) {
      setWidth(el.current.clientWidth);
      setHeight(el.current.clientHeight);
    }
  }, [cH, cW]);

  return (
    <div className="flickering-solution-page">
      <h1>useLayoutEffect Solution</h1>
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
      <div className="info-box">
        <h3>✅ No more flickering!</h3>
        <ol>
          <li>Resize the textarea by dragging the corner</li>
          <li><strong>Click inside the textarea</strong> (but don't type anything!)</li>
          <li>Watch the width/height numbers - they update smoothly with no flicker!</li>
          <li>Compare this to the problem example - the difference is subtle but important</li>
        </ol>
        <p><strong>Why it's smooth:</strong> useLayoutEffect runs BEFORE the browser paints, so the dimensions are updated before you see anything.</p>
        <p><strong>Tip:</strong> Open both examples side-by-side to compare the behavior!</p>
      </div>

      <div className="info-box secondary">
        <h3>What we fixed (partially):</h3>
        <ol>
          <li><strong>Timing fix:</strong> useEffect → useLayoutEffect (fixes flickering!)</li>
          <li><strong>ESLint fix:</strong> Extracted <code>cH</code> and <code>cW</code> variables</li>
        </ol>
        <p>
          <strong>Still not perfect:</strong> You still need to click to trigger updates. For automatic updates on resize, you'd need a <code>ResizeObserver</code> API (advanced topic beyond this example).
        </p>
        <p>
          <strong>The main lesson:</strong> useLayoutEffect prevents flickering by running before paint, which is crucial for DOM measurements!
        </p>
      </div>
    </div>
  );
}

export default FlickeringSolutionPage;
