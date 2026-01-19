import { useState } from "react";
import Start from "./examples/Start";
import Final from "./examples/Final";
import "./App.css";

type Tab = "start" | "final";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("start");

  return (
    <div className="app">
      <header>
        <h1>Async Retrieval of State (Object)</h1>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "start" ? "active" : ""}
          onClick={() => setActiveTab("start")}
        >
          🎬 Start
        </button>
        <button
          className={activeTab === "final" ? "active" : ""}
          onClick={() => setActiveTab("final")}
        >
          ✅ Final
        </button>
      </nav>

      <main>
        {activeTab === "start" && <Start />}
        {activeTab === "final" && <Final />}
      </main>
    </div>
  );
}

export default App;
