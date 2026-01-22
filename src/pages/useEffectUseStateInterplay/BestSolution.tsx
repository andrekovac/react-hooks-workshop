import { useState, useEffect } from "react";

const BestSolution = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // Use the updater function form of setState
      setCount((currentCount) => currentCount + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // <-- Dependency array can now be empty!

  return (
    <div className="interplay-example">
      <h1>{count}</h1>
      <div className="info-box success">
        <h3>Best Solution: Updater Function</h3>
        <p>By using the updater function {`setCount(c => c + 1)`}, we tell React "take the current state and apply this transformation".</p>
        <p>This means our effect no longer needs to *know* the current `count` value, so we can safely remove `count` from the dependency array.</p>
        <p>The effect now runs only once, creating a single interval that is cleaned up only when the component unmounts. This is the most efficient and correct solution.</p>
        <code>
          {`useEffect(() => {
  const id = setInterval(() => {
    setCount((currentCount) => currentCount + 1);
  }, 1000);
  return () => clearInterval(id);
}, []); // <-- No dependency needed!`}
        </code>
      </div>
    </div>
  );
};

export default BestSolution;
