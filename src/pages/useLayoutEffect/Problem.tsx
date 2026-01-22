import { useState, useEffect, useRef } from 'react';

function Problem() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef<HTMLTextAreaElement>(null);

  const cH = el?.current?.clientHeight;
  const cW = el?.current?.clientWidth;

  useEffect(() => {
    console.log('useEffect', cH, cW);
    if (el.current) {
      setWidth(el.current.clientWidth);
      setHeight(el.current.clientHeight);
    }
  }, [cH, cW]);

  console.log('render', width, height);

  return (
    <div className="use-layout-effect-example">
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
          console.log('click', width, height);
          // @ts-expect-error
          setWidth(0);
        }}
        ref={el}
      />
      <hr />
      <p>Can you observe any unpleasant behavior in the UI?</p>
      <div className="info-box warning">
        <h3>⚠️ TWO Problems in this example:</h3>
        <h4>Problem 1: Values don't update when resizing</h4>
        <ul>
          <li>Resize the textarea - notice values often DON'T update (especially when increasing the textarea)</li>
          <li>The effect only runs when something ELSE causes a re-render (like clicking)</li>
          <li>This is because <code>el.current</code> is the same object - resizing doesn't change the reference</li>
        </ul>
        <h4>Problem 2: Flickering when values DO update</h4>
        <ol>
          <li>Resize the textarea - notice px values flickering (especially when decreasing the textarea)</li>
          <li><strong>Click inside</strong> the textarea - this triggers re-render and effect</li>
          <li>Watch the width show "px" (undefined) and it remains that way</li>
        </ol>
        <p>This flickering happens because useEffect runs AFTER paint</p>
        <p><strong>Why clicking sets width to undefined:</strong> It's a trick to force a re-render so the effect runs. In the real world, you'd want the effect to run automatically when resizing!</p>
      </div>
    </div>
  );
}

export default Problem;
