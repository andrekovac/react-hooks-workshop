import { Link } from 'react-router-dom';
import './ReactMemoPage.css';

function ReactMemoPage() {
  return (
    <div className="react-memo-page">
      <header>
        <h1>React Performance</h1>
        <p>Understanding and preventing unnecessary re-renders.</p>
      </header>

      <main>
        <div className="react-memo-example">
          <div className="info-box">
            <h3>Part 1: Preventing Re-renders</h3>
            <p>Learn why components re-render when their parent re-renders, and how to prevent it.</p>
            <ul>
              <li>Problem: Movie component re-renders when only views change</li>
              <li>Solution 1: Refactor - move state into the component that needs it</li>
              <li>Solution 2: Use <code>React.memo</code> to skip re-renders</li>
              <li>Solution 3: Use <code>useMemo</code> to memoize JSX elements</li>
            </ul>
            <p><Link to="/react-memo/basics" className="page-link">Go to Part 1</Link></p>
          </div>

          <div className="info-box" style={{ marginTop: '1rem' }}>
            <h3>Part 2: Memoization with Handlers</h3>
            <p>Learn how function props break memoization and how to fix it.</p>
            <ul>
              <li>Problem: Passing watchlist toggle handler breaks React.memo</li>
              <li>Solution 1: Refactor - move handler inside the component</li>
              <li>Solution 2: Use <code>useCallback</code> to stabilize function references</li>
              <li>Solution 3: Use custom compare function in React.memo</li>
            </ul>
            <p><Link to="/react-memo/handlers" className="page-link">Go to Part 2</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReactMemoPage;
