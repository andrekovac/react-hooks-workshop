import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RefVsStateVsLocalPage from './pages/useRef/RefVsStateVsLocal';
import './App.css';

import RefVsExternalVariablePage from './pages/useRef/RefVsExternalVariable';

import AsyncStateTimeoutRefPage from './pages/useRef/AsyncStateTimeoutRef';

import UseEffectEventPage from './pages/useEffectEvent/UseEffectEventPage';

import UseLayoutEffectPage from './pages/useLayoutEffect/UseLayoutEffectPage';

import FetchMoviesStarterPage from './pages/useEffect/FetchMoviesStarterPage';

import FetchMoviesSolutionPage from './pages/useEffect/FetchMoviesSolutionPage';

import RaceConditionProblemPage from './pages/useEffect/RaceConditionProblemPage';

import RaceConditionSolutionPage from './pages/useEffect/RaceConditionSolutionPage';

import AsyncSettingProblemPage from './pages/asyncSettingAndRetrieval/AsyncSettingProblemPage';

import AsyncSettingNonIdealPage from './pages/asyncSettingAndRetrieval/AsyncSettingNonIdealPage';

import AsyncSettingSolutionPage from './pages/asyncSettingAndRetrieval/AsyncSettingSolutionPage';

import AsyncRetrievalProblemPage from './pages/asyncSettingAndRetrieval/AsyncRetrievalProblemPage';

import AsyncRetrievalSolutionPrimitivePage from './pages/asyncSettingAndRetrieval/AsyncRetrievalSolutionPrimitivePage';

import AsyncRetrievalClosureDemoPage from './pages/asyncSettingAndRetrieval/AsyncRetrievalClosureDemoPage';

import AsyncRetrievalObjectProblemPage from './pages/asyncSettingAndRetrieval/AsyncRetrievalObjectProblemPage';

import AsyncRetrievalObjectSolutionPage from './pages/asyncSettingAndRetrieval/AsyncRetrievalObjectSolutionPage';

import InternalVsExternalStatePage from './pages/reactStateBasics/InternalVsExternalStatePage';

import MutableVsImmutablePage from './pages/reactStateBasics/MutableVsImmutablePage';

import OneStateChangeAllNewPage from './pages/reactStateBasics/OneStateChangeAllNewPage';

import SetterCreatesNewObjectsPage from './pages/reactStateBasics/SetterCreatesNewObjectsPage';

import UseStateBasicPage from './pages/reactStateBasics/UseStateBasicPage';

import UseCallbackPage from './pages/useCallback/UseCallbackPage';

import CustomHookPage from './pages/customHook/CustomHookPage';
import UseEffectUseStateInterplayPage from './pages/useEffectUseStateInterplay/UseEffectUseStateInterplayPage';

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
          <Route path="/uselayouteffect" element={<UseLayoutEffectPage />} />
          <Route path="/useeffect/fetch-movies-starter" element={<FetchMoviesStarterPage />} />
          <Route path="/useeffect/fetch-movies-solution" element={<FetchMoviesSolutionPage />} />
          <Route path="/useeffect/race-condition-problem" element={<RaceConditionProblemPage />} />
          <Route path="/useeffect/race-condition-solution" element={<RaceConditionSolutionPage />} />
          <Route path="/async-setting-and-retrieval/async-setting-problem" element={<AsyncSettingProblemPage />} />
          <Route path="/async-setting-and-retrieval/async-setting-non-ideal" element={<AsyncSettingNonIdealPage />} />
          <Route path="/async-setting-and-retrieval/async-setting-solution" element={<AsyncSettingSolutionPage />} />
          <Route path="/async-setting-and-retrieval/async-retrieval-problem" element={<AsyncRetrievalProblemPage />} />
          <Route path="/async-setting-and-retrieval/async-retrieval-solution-primitive" element={<AsyncRetrievalSolutionPrimitivePage />} />
          <Route path="/async-setting-and-retrieval/async-retrieval-closure-demo" element={<AsyncRetrievalClosureDemoPage />} />
          <Route path="/async-setting-and-retrieval/async-retrieval-object-problem" element={<AsyncRetrievalObjectProblemPage />} />
          <Route path="/async-setting-and-retrieval/async-retrieval-object-solution" element={<AsyncRetrievalObjectSolutionPage />} />
          <Route path="/react-state-basics/internal-vs-external-state" element={<InternalVsExternalStatePage />} />
          <Route path="/react-state-basics/mutable-vs-immutable" element={<MutableVsImmutablePage />} />
          <Route path="/react-state-basics/one-state-change-all-new" element={<OneStateChangeAllNewPage />} />
          <Route path="/react-state-basics/setter-creates-new-objects" element={<SetterCreatesNewObjectsPage />} />
          <Route path="/react-state-basics/usestate-basic" element={<UseStateBasicPage />} />
          <Route path="/usecallback" element={<UseCallbackPage />} />
          <Route path="/custom-hook" element={<CustomHookPage />} />
          <Route path="/useeffect-usestate-interplay" element={<UseEffectUseStateInterplayPage />} />
          {/* More routes will be added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
