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

          <h3>useEffectEvent</h3>
          <ul>
            <li>
              <NavLink to="/useeffectevent">useEffectEvent Demo</NavLink>
            </li>
          </ul>

          <h3>useLayoutEffect</h3>
          <ul>
            <li>
              <NavLink to="/uselayouteffect/flickering-problem">Flickering Problem</NavLink>
            </li>
            <li>
              <NavLink to="/uselayouteffect/flickering-solution">Flickering Solution</NavLink>
            </li>
            <li>
              <NavLink to="/uselayouteffect/complete-solution">Complete Solution</NavLink>
            </li>
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
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
