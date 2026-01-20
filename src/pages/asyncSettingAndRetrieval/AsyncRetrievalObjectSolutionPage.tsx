import { useState } from "react";
import Start from "./async-retrieval-object-solution/examples/Start";
import Final from "./async-retrieval-object-solution/examples/Final";
import "./AsyncRetrievalObjectSolutionPage.css";

type Tab = "start" | "final";

function AsyncRetrievalObjectSolutionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("start");

  return (
    <div className="async-retrieval-object-solution-page">
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

export default AsyncRetrievalObjectSolutionPage;
