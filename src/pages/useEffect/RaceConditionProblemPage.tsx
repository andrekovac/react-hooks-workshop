import { useState } from 'react';
import DataDisplayer from './components/DataDisplayer';
import './RaceConditionProblemPage.css';

function RaceConditionProblemPage() {
  const [currentId, setCurrentId] = useState(1);

  const handleClick = () => {
    const idToFetch = Math.round(Math.random() * 80);
    setCurrentId(idToFetch);
  };

  return (
    <div className="race-condition-problem-page">
      <h1>Race Condition Problem</h1>

      <div className="info-box error">
        <p><strong>⚠️ This example has a bug!</strong></p>
        <p>Click the button rapidly multiple times and watch the IDs.</p>
        <p>Sometimes the displayed data won't match the requested ID.</p>
      </div>

      <div className="info-box">
        <p><strong>Requesting ID:</strong> {currentId}</p>
        <button type="button" onClick={handleClick}>
          Fetch data!
        </button>
      </div>

      <hr />

      <DataDisplayer id={currentId} />
    </div>
  );
}

export default RaceConditionProblemPage;
