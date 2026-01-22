import { useState } from 'react';
import Problem from './asyncRetrieval/Problem';
import SolutionPrimitive from './asyncRetrieval/SolutionPrimitive';
import ClosureDemo from './asyncRetrieval/ClosureDemo';
import './AsyncRetrievalPage.css';

type Tab = 'problem' | 'solution-primitive' | 'closure-demo';

function AsyncRetrievalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="async-retrieval-page">
      <header>
        <h1>Async Retrieval of State (Primitive)</h1>
        <p>Understanding how closures capture values vs references.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Problem
        </button>
        <button
          className={activeTab === 'solution-primitive' ? 'active' : ''}
          onClick={() => setActiveTab('solution-primitive')}
        >
          ⚠️ Solution (Primitive)
        </button>
        <button
          className={activeTab === 'closure-demo' ? 'active' : ''}
          onClick={() => setActiveTab('closure-demo')}
        >
          ✅ Closure Demo
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution-primitive' && <SolutionPrimitive />}
        {activeTab === 'closure-demo' && <ClosureDemo />}
      </main>
    </div>
  );
}

export default AsyncRetrievalPage;
