import { useState } from 'react';
import MutationVsCopy from './MutationVsCopy';
import StepperProblem from './StepperProblem';
import StepperSolution from './StepperSolution';
import './UseReducerPage.css';

type Tab = 'comparison' | 'problem' | 'solution';

function UseReducerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('comparison');

  return (
    <div className="use-reducer-page">
      <header>
        <h1>useReducer Demo</h1>
        <p>Managing complex state logic and state transitions.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'comparison' ? 'active' : ''}
          onClick={() => setActiveTab('comparison')}
        >
          ⚙️ Mutation vs. Copy
        </button>
        <button
          className={activeTab === 'problem' ? 'active' : ''}
          onClick={() => setActiveTab('problem')}
        >
          ❌ Stepper Problem (useState)
        </button>
        <button
          className={activeTab === 'solution' ? 'active' : ''}
          onClick={() => setActiveTab('solution')}
        >
          ✅ Stepper Solution (useReducer)
        </button>
      </nav>

      <main>
        {activeTab === 'comparison' && <MutationVsCopy />}
        {activeTab === 'problem' && <StepperProblem />}
        {activeTab === 'solution' && <StepperSolution />}
      </main>
    </div>
  );
}

export default UseReducerPage;
