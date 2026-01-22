import { useState } from 'react';
import Problem from './asyncRetrievalObject/Problem';
import Start from './asyncRetrievalObject/Start';
import Final from './asyncRetrievalObject/Final';
import './AsyncRetrievalObjectPage.css';

type Tab = 'problem' | 'start' | 'final';

function AsyncRetrievalObjectPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="async-retrieval-object-page">
      <header>
        <h1>Async Retrieval of State (Object)</h1>
        <p>Deep dive into object references and closures.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Problem
        </button>
        <button
          className={activeTab === 'start' ? 'active' : ''}
          onClick={() => setActiveTab('start')}
        >
          🎬 Start
        </button>
        <button
          className={activeTab === 'final' ? 'active' : ''}
          onClick={() => setActiveTab('final')}
        >
          ✅ Final
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'start' && <Start />}
        {activeTab === 'final' && <Final />}
      </main>
    </div>
  );
}

export default AsyncRetrievalObjectPage;
