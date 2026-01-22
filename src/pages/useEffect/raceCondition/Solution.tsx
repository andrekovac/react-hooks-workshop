import { useState } from 'react';
import DataDisplayerSolution from './DataDisplayerSolution';

function Solution() {
  const [currentId, setCurrentId] = useState<number | null>(null);

  const handleClick = () => {
    const idToFetch = Math.round(Math.random() * 80);
    setCurrentId(idToFetch);
  };

  return (
    <div className="race-condition-example">
      <h3>Solution</h3>

      <div className="info-box success">
        <p><strong>✅ This example handles race conditions correctly!</strong></p>
        <p>Click the button rapidly multiple times. The data will always match the latest request.</p>
        <p>Open the console to see effect lifecycle logs.</p>
      </div>

      <div className="info-box">
        {currentId ? <p><strong>Latest requested ID:</strong> {currentId}</p> : null}
        <button type="button" onClick={handleClick}>
          Fetch data!
        </button>
      </div>

      <hr />

      {currentId ? <DataDisplayerSolution id={currentId} /> : null}
    </div>
  );
}

export default Solution;
