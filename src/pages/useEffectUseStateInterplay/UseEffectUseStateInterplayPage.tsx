import { useState } from 'react';
import Problem from './Problem';
import IntermediateSolution from './IntermediateSolution';
import BestSolution from './BestSolution';
import './UseEffectUseStateInterplayPage.css';

type Tab = 'problem' | 'intermediate' | 'best';

function UseEffectUseStateInterplayPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="use-effect-interplay-page">
      <header>
        <h1>useEffect and useState Interplay</h1>
        <p>Understanding dependencies when using intervals and state.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Problem
        </button>
        <button
          className={activeTab === 'intermediate' ? 'active' : ''}
          onClick={() => setActiveTab('intermediate')}
        >
          🤔 Intermediate Solution
        </button>
        <button
          className={activeTab === 'best' ? 'active' : ''}
          onClick={() => setActiveTab('best')}
        >
          ✅ Best Solution
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'intermediate' && <IntermediateSolution />}
        {activeTab === 'best' && <BestSolution />}
      </main>
    </div>
  );
}

export default UseEffectUseStateInterplayPage;
