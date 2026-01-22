import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
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
              <NavLink to="/async-setting-and-retrieval/async-setting-problem">Async Setting Problem</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-setting-non-ideal">Async Setting Non-Ideal</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-setting-solution">Async Setting Solution</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval-problem">Async Retrieval Problem</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval-solution-primitive">Async Retrieval Solution (Primitive)</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval-closure-demo">Async Retrieval Closure Demo</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval-object-problem">Async Retrieval Object Problem</NavLink>
            </li>
            <li>
              <NavLink to="/async-setting-and-retrieval/async-retrieval-object-solution">Async Retrieval Object Solution</NavLink>
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
              <NavLink to="/useeffect/fetch-movies-starter">Fetch Movies Starter</NavLink>
            </li>
            <li>
              <NavLink to="/useeffect/fetch-movies-solution">Fetch Movies Solution</NavLink>
            </li>
            <li>
              <NavLink to="/useeffect/race-condition-problem">Race Condition Problem</NavLink>
            </li>
            <li>
              <NavLink to="/useeffect/race-condition-solution">Race Condition Solution</NavLink>
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
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
