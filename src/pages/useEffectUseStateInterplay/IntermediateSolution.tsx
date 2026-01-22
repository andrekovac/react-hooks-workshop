import { useState, useEffect } from "react";

const IntermediateSolution = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [count]); // <-- Added 'count' to the dependency array

  return (
    <div className="interplay-example">
      <h1>{count}</h1>
      <div className="info-box">
        <h3>Intermediate Solution: Adding the Dependency</h3>
        <p>By adding `count` to the dependency array, we fix the stale closure. Now, whenever `count` changes, the effect re-runs.</p>
        <p>However, this introduces a new, inefficient behavior:</p>
        <ol>
          <li>`count` changes.</li>
          <li>The old effect is cleaned up (`clearInterval`).</li>
          <li>A new effect runs, creating a brand new interval (`setInterval`).</li>
        </ol>
        <p>This is like tearing down and rebuilding a clock every second just to make it tick. It works, but it's very inefficient.</p>
        <code>
          {`useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]); // <-- This dependency causes the effect to re-run constantly`}
        </code>
      </div>
    </div>
  );
};

export default IntermediateSolution;
