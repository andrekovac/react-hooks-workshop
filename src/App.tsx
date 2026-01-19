import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // This will be our global App.css

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;