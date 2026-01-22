import { useState } from 'react';
import Starter from './fetchMovies/Starter';
import Solution from './fetchMovies/Solution';
import './FetchMoviesPage.css';

type Tab = 'starter' | 'solution';

function FetchMoviesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('starter');

  return (
    <div className="fetch-movies-page">
      <header>
        <h1>Fetch Movies with useEffect</h1>
        <p>Learn how to fetch data when a component mounts.</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'starter' ? 'active' : ''}
          onClick={() => setActiveTab('starter')}
        >
          🎬 Starter
        </button>
        <button
          className={activeTab === 'solution' ? 'active' : ''}
          onClick={() => setActiveTab('solution')}
        >
          ✅ Solution
        </button>
      </nav>

      <main>
        {activeTab === 'starter' && <Starter />}
        {activeTab === 'solution' && <Solution />}
      </main>
    </div>
  );
}

export default FetchMoviesPage;
