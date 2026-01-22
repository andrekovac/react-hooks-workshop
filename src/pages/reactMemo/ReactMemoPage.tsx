import { useState } from 'react';
import Problem from './Problem';
import Solution1 from './Solution1';
import Solution2 from './Solution2';
import './ReactMemoPage.css';

type Tab = 'problem' | 'solution1' | 'solution2';

function ReactMemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="react-memo-page">
      <header>
        <h1>React.memo and useCallback</h1>
        <p>Preventing unnecessary re-renders of components.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Problem
        </button>
        <button
          className={activeTab === 'solution1' ? 'active' : ''}
          onClick={() => setActiveTab('solution1')}
        >
          ✅ Solution 1
        </button>
        <button
          className={activeTab === 'solution2' ? 'active' : ''}
          onClick={() => setActiveTab('solution2')}
        >
          ✅ Solution 2
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution1' && <Solution1 />}
        {activeTab === 'solution2' && <Solution2 />}
      </main>
    </div>
  );
}

export default ReactMemoPage;
