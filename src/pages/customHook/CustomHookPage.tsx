import { useState } from 'react';
import Problem from './Problem';
import Solution from './Solution';
import './CustomHookPage.css';

type Tab = 'problem' | 'solution';

function CustomHookPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="custom-hook-page">
      <header>
        <h1>Custom Hook Demo</h1>
        <p>Turning repetitive logic into a reusable custom hook.</p>
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

export default CustomHookPage;
