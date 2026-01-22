import { useState } from 'react';
import Problem from './raceCondition/Problem';
import Solution from './raceCondition/Solution';
import './RaceConditionPage.css';

type Tab = 'problem' | 'solution';

function RaceConditionPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="race-condition-page">
      <header>
        <h1>Race Conditions in useEffect</h1>
        <p>Learn how to handle stale closures and race conditions when fetching data.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Problem
        </button>
        <button
          className={activeTab === 'solution' ? 'active' : ''}
          onClick={() => setActiveTab('solution')}
        >
          ✅ Solution
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution' && <Solution />}
      </main>
    </div>
  );
}

export default RaceConditionPage;
