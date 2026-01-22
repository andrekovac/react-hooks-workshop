import { useState } from 'react';
import Problem from './asyncSetting/Problem';
import NonIdeal from './asyncSetting/NonIdeal';
import Solution from './asyncSetting/Solution';
import './AsyncSettingPage.css';

type Tab = 'problem' | 'non-ideal' | 'solution';

function AsyncSettingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problem');

  return (
    <div className="async-setting-page">
      <header>
        <h1>Async Setting of State</h1>
        <p>Understanding closures and the updater function pattern.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Problem
        </button>
        <button
          className={activeTab === 'non-ideal' ? 'active' : ''}
          onClick={() => setActiveTab('non-ideal')}
        >
          ⚠️ Non-Ideal
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
        {activeTab === 'non-ideal' && <NonIdeal />}
        {activeTab === 'solution' && <Solution />}
      </main>
    </div>
  );
}

export default AsyncSettingPage;
