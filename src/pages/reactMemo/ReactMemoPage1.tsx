import { useState } from 'react';
import Problem from './page1/Problem';
import Solution1Refactor from './page1/Solution1Refactor';
import Solution2Memo from './page1/Solution2Memo';
import Solution3UseMemo from './page1/Solution3UseMemo';
import './ReactMemoPage.css';

type Tab = 'problem' | 'solution1' | 'solution2' | 'solution3';

function ReactMemoPage1() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="react-memo-page">
      <header>
        <h1>React.memo Basics</h1>
        <p>Preventing unnecessary re-renders when parent state changes.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          Problem
        </button>
        <button
          className={activeTab === 'solution1' ? 'active' : ''}
          onClick={() => setActiveTab('solution1')}
        >
          Solution 1: Refactor
        </button>
        <button
          className={activeTab === 'solution2' ? 'active' : ''}
          onClick={() => setActiveTab('solution2')}
        >
          Solution 2: React.memo
        </button>
        <button
          className={activeTab === 'solution3' ? 'active' : ''}
          onClick={() => setActiveTab('solution3')}
        >
          Solution 3: useMemo
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution1' && <Solution1Refactor />}
        {activeTab === 'solution2' && <Solution2Memo />}
        {activeTab === 'solution3' && <Solution3UseMemo />}
      </main>
    </div>
  );
}

export default ReactMemoPage1;
