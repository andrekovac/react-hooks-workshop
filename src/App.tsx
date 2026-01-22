import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RefVsStateVsLocalPage from './pages/useRef/RefVsStateVsLocal';
import './App.css';

import RefVsExternalVariablePage from './pages/useRef/RefVsExternalVariable';

import AsyncStateTimeoutRefPage from './pages/useRef/AsyncStateTimeoutRef';

import UseEffectEventPage from './pages/useEffectEvent/UseEffectEventPage';

import UseLayoutEffectPage from './pages/useLayoutEffect/UseLayoutEffectPage';

import FetchMoviesPage from './pages/useEffect/FetchMoviesPage';

import RaceConditionPage from './pages/useEffect/RaceConditionPage';

import AsyncSettingPage from './pages/asyncSettingAndRetrieval/AsyncSettingPage';

import AsyncRetrievalPage from './pages/asyncSettingAndRetrieval/AsyncRetrievalPage';

import AsyncRetrievalObjectPage from './pages/asyncSettingAndRetrieval/AsyncRetrievalObjectPage';

import InternalVsExternalStatePage from './pages/reactStateBasics/InternalVsExternalStatePage';

import MutableVsImmutablePage from './pages/reactStateBasics/MutableVsImmutablePage';

import OneStateChangeAllNewPage from './pages/reactStateBasics/OneStateChangeAllNewPage';

import SetterCreatesNewObjectsPage from './pages/reactStateBasics/SetterCreatesNewObjectsPage';

import UseStateBasicPage from './pages/reactStateBasics/UseStateBasicPage';

import UseCallbackPage from './pages/useCallback/UseCallbackPage';

import CustomHookPage from './pages/customHook/CustomHookPage';
import { RefreshProvider } from './contexts/RefreshContext';
import UseEffectUseStateInterplayPage from './pages/useEffectUseStateInterplay/UseEffectUseStateInterplayPage';
import UseReducerPage from './pages/useReducer/UseReducerPage';
import ClassVsFunctionPage from './pages/classVsFunction/ClassVsFunctionPage';
import ReactMemoPage from './pages/reactMemo/ReactMemoPage';

function App() {
  return (
    <RefreshProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/useref/ref-vs-state-vs-local" element={<RefVsStateVsLocalPage />} />
            <Route path="/useref/ref-vs-external-variable" element={<RefVsExternalVariablePage />} />
            <Route path="/useref/async-state-timeout-ref" element={<AsyncStateTimeoutRefPage />} />
            <Route path="/useeffectevent" element={<UseEffectEventPage />} />
            <Route path="/uselayouteffect" element={<UseLayoutEffectPage />} />
            <Route path="/useeffect/fetch-movies" element={<FetchMoviesPage />} />
            <Route path="/useeffect/race-condition" element={<RaceConditionPage />} />
            <Route path="/async-setting-and-retrieval/async-setting" element={<AsyncSettingPage />} />
            <Route path="/async-setting-and-retrieval/async-retrieval" element={<AsyncRetrievalPage />} />
            <Route path="/async-setting-and-retrieval/async-retrieval-object" element={<AsyncRetrievalObjectPage />} />
            <Route path="/react-state-basics/internal-vs-external-state" element={<InternalVsExternalStatePage />} />
            <Route path="/react-state-basics/mutable-vs-immutable" element={<MutableVsImmutablePage />} />
            <Route path="/react-state-basics/one-state-change-all-new" element={<OneStateChangeAllNewPage />} />
            <Route path="/react-state-basics/setter-creates-new-objects" element={<SetterCreatesNewObjectsPage />} />
            <Route path="/react-state-basics/usestate-basic" element={<UseStateBasicPage />} />
            <Route path="/usecallback" element={<UseCallbackPage />} />
            <Route path="/custom-hook" element={<CustomHookPage />} />
            <Route path="/useeffect-usestate-interplay" element={<UseEffectUseStateInterplayPage />} />
            <Route path="/usereducer" element={<UseReducerPage />} />
            <Route path="/class-vs-function" element={<ClassVsFunctionPage />} />
            <Route path="/react-memo" element={<ReactMemoPage />} />
            {/* More routes will be added here */}
          </Route>
        </Routes>
      </Router>
    </RefreshProvider>
  );
}

export default App;
