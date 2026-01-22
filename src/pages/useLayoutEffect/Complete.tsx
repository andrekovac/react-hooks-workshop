import { useState, useLayoutEffect, useRef } from 'react';

function Complete() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const element = el.current;
    if (!element) return;

    setWidth(element.clientWidth);
    setHeight(element.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        setWidth(Math.round(newWidth));
        setHeight(Math.round(newHeight));
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="use-layout-effect-example">
      <h2>Resize the textarea - automatic updates!</h2>
      <hr />
      <p>
        textarea width: <b>{width}px</b>
      </p>
      <p>
        textarea height: <b>{height}px</b>
      </p>
      <textarea
        ref={el}
        placeholder="Resize me - no clicking needed!"
      />
      <hr />

      <div className="info-box success">
        <h3>✅ Perfect solution!</h3>
        <ol>
          <li><strong>Just resize</strong> the textarea by dragging the corner</li>
          <li>Watch the numbers update <strong>automatically and smoothly</strong></li>
          <li>No clicking needed!</li>
          <li>No flickering!</li>
        </ol>
        <p>
          <strong>This is the proper production-ready approach!</strong>
        </p>
      </div>

      <div className="info-box">
        <h3>How this solution works:</h3>
        <ol>
          <li>
            <strong>ResizeObserver API:</strong> Browser-native way to watch for element size changes
          </li>
          <li>
            <strong>Automatic detection:</strong> Observer fires callback whenever textarea resizes
          </li>
          <li>
            <strong>useLayoutEffect:</strong> Updates happen before paint (no flicker!)
          </li>
          <li>
            <strong>Proper cleanup:</strong> Observer is disconnected on unmount
          </li>
        </ol>
      </div>

      <div className="info-box secondary">
        <h3>Why ResizeObserver?</h3>
        <ul>
          <li><strong>Efficient:</strong> Only fires when element actually resizes</li>
          <li><strong>Accurate:</strong> Reports exact new dimensions</li>
          <li><strong>Native:</strong> Built into modern browsers (no library needed)</li>
          <li><strong>Better than alternatives:</strong>
            <ul>
              <li>window.resize only fires for window, not individual elements</li>
              <li>MutationObserver watches DOM changes, not size changes</li>
              <li>Polling/setInterval is inefficient and inaccurate</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="info-box warning">
        <h3>Code pattern (simplified):</h3>
        <pre>
{`useLayoutEffect(() => {
  const element = ref.current
  if (!element) return

  const observer = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect
    setWidth(width)
    setHeight(height)
  })

  observer.observe(element)

  return () => observer.disconnect()
}, [])`}
        </pre>
      </div>
    </div>
  );
}

export default Complete;
