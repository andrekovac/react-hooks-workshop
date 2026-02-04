import { useState, useEffect } from "react";

const Problem = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // This will not work as expected because the `count`
      // value is "stale" inside the closure of the interval.
      // It will always be 0.
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="interplay-example">
      <h1>{count}</h1>
      <div className="info-box warning">
        <h3>Problem: Stale Closure</h3>
        <p>The `useEffect` runs only once, creating an interval. The interval's callback forms a closure, capturing the `count` state at that moment (which is `0`).</p>
        <p>Because `count` is in the dependency array, ESLint warns us. If we ignore it, `setCount(count + 1)` would always mean `setCount(0 + 1)`, so the count would never go above 1.</p>
        <p>The code is currently commented out to prevent this incorrect behavior from running.</p>
        <code>
          {`useEffect(() => {
  const id = setInterval(() => {
    // The 'count' here is always the initial value
    setCount(count + 1); 
  }, 1000);
  return () => clearInterval(id);
}, []);`}
        </code>
      </div>
    </div>
  );
};

export default Problem;
