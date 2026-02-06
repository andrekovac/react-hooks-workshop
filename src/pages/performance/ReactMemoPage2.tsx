import { useState } from 'react';
import Problem from './page2/Problem';
import Solution1Refactor from './page2/Solution1Refactor';
import Solution2UseCallback from './page2/Solution2UseCallback';
import Solution3CustomCompare from './page2/Solution3CustomCompare';
import './ReactMemoPage.css';

type Tab = 'problem' | 'solution1' | 'solution2' | 'solution3';

function ReactMemoPage2() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="react-memo-page">
      <header>
        <h1>Memoization with Handlers</h1>
        <p>Why function props break memoization and how to fix it.</p>
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
          Solution 2: useCallback
        </button>
        <button
          className={activeTab === 'solution3' ? 'active' : ''}
          onClick={() => setActiveTab('solution3')}
        >
          Solution 3: Custom Compare
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution1' && <Solution1Refactor />}
        {activeTab === 'solution2' && <Solution2UseCallback />}
        {activeTab === 'solution3' && <Solution3CustomCompare />}
      </main>
    </div>
  );
}

export default ReactMemoPage2;
