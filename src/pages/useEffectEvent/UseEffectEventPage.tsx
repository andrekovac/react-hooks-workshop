import { useState } from 'react';
import Problem from './examples/Problem';
import Solution from './examples/Solution';
import Advanced from './examples/Advanced';
import './UseEffectEventPage.css';

type Tab = 'problem' | 'solution' | 'advanced';

function UseEffectEventPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="app">
      <header>
        <h1>useEffectEvent Hook Demo</h1>
        <p>React 19.2+ - Stable API</p>
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
        <button
          className={activeTab === 'advanced' ? 'active' : ''}
          onClick={() => setActiveTab('advanced')}
        >
          🚀 Advanced
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution' && <Solution />}
        {activeTab === 'advanced' && <Advanced />}
      </main>

      <footer>
        <p>Open the browser console to see the effect logs</p>
      </footer>
    </div>
  );
}

export default UseEffectEventPage;
