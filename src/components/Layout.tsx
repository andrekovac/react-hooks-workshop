import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useRefresh } from '../contexts/RefreshContext';
import FloatingRefreshButton from './FloatingRefreshButton';
import './Layout.css';

const RefreshableOutlet = () => {
  const { refreshKey } = useRefresh();
  return <Outlet key={refreshKey} />;
};

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="layout">
      <button
        className={`sidebar-toggle ${isCollapsed ? 'collapsed' : ''}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '>' : '<'}
      </button>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <nav>
          <h2>React Hooks Workshop</h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>

          <h3>React State Basics</h3>
          <ul>
            <li>
              <NavLink to="/react-state-basics/internal-vs-external-state">Internal vs External State</NavLink>
            </li>
            <li>
              <NavLink to="/react-state-basics/mutable-vs-immutable">Mutable vs Immutable</NavLink>
            </li>
            <li>
              <NavLink to="/react-state-basics/one-state-change-all-new">One State Change All New</NavLink>
            </li>
            <li>
              <NavLink to="/react-state-basics/setter-creates-new-objects">Setter Creates New Objects</NavLink>
            </li>
            <li>
              <NavLink to="/react-state-basics/usestate-basic">useState Basic</NavLink>
            </li>
          </ul>

          <h3>Async Setting and Retrieval</h3>
          <ul>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-setting">Async Setting</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval">Async Retrieval (Primitive)</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval-object">Async Retrieval (Object)</NavLink>
            </li>
          </ul>

          <h3>useRef</h3>
          <ul>
            <li>
              <NavLink to="/useref/ref-vs-state-vs-local">Ref vs State vs Local</NavLink>
            </li>
            <li>
              <NavLink to="/useref/ref-vs-external-variable">Ref vs External Variable</NavLink>
            </li>
            <li>
              <NavLink to="/useref/async-state-timeout-ref">Async State Timeout Ref</NavLink>
            </li>
            {/* More links will be added here */}
          </ul>

          <h3>useEffect</h3>
          <ul>
            <li>
              <NavLink to="/useeffect/fetch-movies">Fetch Movies</NavLink>
            </li>
            <li>
              <NavLink to="/useeffect/race-condition">Race Condition</NavLink>
            </li>
            <li>
              <NavLink to="/useeffect-usestate-interplay">useEffect/useState Interplay</NavLink>
            </li>
          </ul>

          <h3>useReducer</h3>
          <ul>
            <li>
              <NavLink to="/usereducer">useReducer Demo</NavLink>
            </li>
          </ul>

          <h3>Class vs. Function</h3>
          <ul>
            <li>
              <NavLink to="/class-vs-function">Class vs. Function</NavLink>
            </li>
          </ul>

          <h3>Performance</h3>
          <ul>
            <li>
              <NavLink to="/performance">Overview</NavLink>
            </li>
            <li>
              <NavLink to="/performance/basics">Part 1: Basics</NavLink>
            </li>
            <li>
              <NavLink to="/performance/handlers">Part 2: Handlers</NavLink>
            </li>
          </ul>

          <h3>Custom Hook</h3>
          <ul>
            <li>
              <NavLink to="/custom-hook">Custom Hook Demo</NavLink>
            </li>
          </ul>

          <h3>useEffectEvent</h3>
          <ul>
            <li>
              <NavLink to="/useeffectevent">useEffectEvent Demo</NavLink>
            </li>
          </ul>

          <h3>useLayoutEffect</h3>
          <ul>
            <li>
              <NavLink to="/uselayouteffect">useLayoutEffect Demo</NavLink>
            </li>
          </ul>

          <h3>useCallback</h3>
          <ul>
            <li>
              <NavLink to="/usecallback">useCallback Demo</NavLink>
            </li>
          </ul>

        </nav>
      </aside>
      <main className="content">
        <RefreshableOutlet />
      </main>
      <FloatingRefreshButton />
    </div>
  );
};

export default Layout;
