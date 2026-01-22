import { useState } from 'react';
import Problem from './Problem';
import Solution from './Solution';
import Complete from './Complete';
import './UseLayoutEffectPage.css';

type Tab = 'problem' | 'solution' | 'complete';

function UseLayoutEffectPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="use-layout-effect-page">
      <header>
        <h1>useLayoutEffect Demo</h1>
        <p>Fixing UI flickering caused by DOM mutations after painting.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Flickering Problem
        </button>
        <button
          className={activeTab === 'solution' ? 'active' : ''}
          onClick={() => setActiveTab('solution')}
        >
          ✅ Solution (useLayoutEffect)
        </button>
        <button
          className={activeTab === 'complete' ? 'active' : ''}
          onClick={() => setActiveTab('complete')}
        >
          🎉 Complete Solution (ResizeObserver)
        </button>
      </nav>

      <main>
        {activeTab === 'problem' && <Problem />}
        {activeTab === 'solution' && <Solution />}
        {activeTab === 'complete' && <Complete />}
      </main>
    </div>
  );
}

export default UseLayoutEffectPage;
