import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RefVsStateVsLocalPage from './pages/useRef/RefVsStateVsLocal';
import './App.css';

import RefVsExternalVariablePage from './pages/useRef/RefVsExternalVariable';

import AsyncStateTimeoutRefPage from './pages/useRef/AsyncStateTimeoutRef';

import UseEffectEventPage from './pages/useEffectEvent/UseEffectEventPage';

import FlickeringProblemPage from './pages/useLayoutEffect/FlickeringProblemPage';

import FlickeringSolutionPage from './pages/useLayoutEffect/FlickeringSolutionPage';

import CompleteSolutionPage from './pages/useLayoutEffect/CompleteSolutionPage';

import FetchMoviesStarterPage from './pages/useEffect/FetchMoviesStarterPage';

import FetchMoviesSolutionPage from './pages/useEffect/FetchMoviesSolutionPage';

import RaceConditionProblemPage from './pages/useEffect/RaceConditionProblemPage';

import RaceConditionSolutionPage from './pages/useEffect/RaceConditionSolutionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/useref/ref-vs-state-vs-local" element={<RefVsStateVsLocalPage />} />
          <Route path="/useref/ref-vs-external-variable" element={<RefVsExternalVariablePage />} />
          <Route path="/useref/async-state-timeout-ref" element={<AsyncStateTimeoutRefPage />} />
          <Route path="/useeffectevent" element={<UseEffectEventPage />} />
          <Route path="/uselayouteffect/flickering-problem" element={<FlickeringProblemPage />} />
          <Route path="/uselayouteffect/flickering-solution" element={<FlickeringSolutionPage />} />
          <Route path="/uselayouteffect/complete-solution" element={<CompleteSolutionPage />} />
          <Route path="/useeffect/fetch-movies-starter" element={<FetchMoviesStarterPage />} />
          <Route path="/useeffect/fetch-movies-solution" element={<FetchMoviesSolutionPage />} />
          <Route path="/useeffect/race-condition-problem" element={<RaceConditionProblemPage />} />
          <Route path="/useeffect/race-condition-solution" element={<RaceConditionSolutionPage />} />
          {/* More routes will be added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
