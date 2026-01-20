import { useCallback, useEffect, useState } from 'react';
import './DataDisplayer.css';

type StarWarsCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

type Props = {
  id: number;
};

function DataDisplayer({ id }: Props) {
  const [data, setData] = useState<StarWarsCharacter | null>(null);
  const [fetchedId, setFetchedId] = useState<number | null>(null);

  // Helper state to visualize race conditions
  const [numReqs, setNumReqs] = useState(0);
  const increase = useCallback(() => setNumReqs((c) => c + 1), []);
  const decrease = useCallback(() => setNumReqs((c) => c - 1), []);

  useEffect(() => {
    let active = true;

    console.log(`[(${id}) ENTERING] useEffect closure with id ${id}`);

    const fetchData = async () => {
      console.log(`[(${id}) INITIATE] data fetch`);
      increase();

      setTimeout(async () => {
        try {
          const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
          const newData = await response.json();

          console.log(`[(${id}) INCOMING] async data fetch`, { active });
          decrease();

          if (active) {
            setFetchedId(id);
            setData(newData);
          } else {
            console.log(`[(${id}) IGNORED] Stale data - effect was cleaned up`);
          }
        } catch (error) {
          decrease();
          console.error(`[(${id}) ERROR]`, error);
        }
      }, Math.round(Math.random() * 12000));
    };

    fetchData();

    return () => {
      active = false;
      console.log(`[(${id}) CLEANING up] closure with id ${id}`);
    };
  }, [id, increase, decrease]);

  console.log('>>>>>>>>>>> NEW RENDER >>>>>>>>>>');

  const isCorrectData = fetchedId === id;
  const textColor = isCorrectData ? 'green' : 'red';

  return (
    <div className="data-displayer">
      <p><strong>Number of requests in flight:</strong> {numReqs} (may take up to 12 seconds)</p>
      <hr />

      {data ? (
        <>
          <p style={{ color: textColor, fontSize: '1.2rem', fontWeight: 'bold' }}>
            Displaying Data for: {fetchedId}
            {isCorrectData && ' ✅'}
          </p>
          <div className="character-info">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Height:</strong> {data.height}</p>
            <p><strong>Mass:</strong> {data.mass}</p>
            <p><strong>Birth Year:</strong> {data.birth_year}</p>
          </div>
        </>
      ) : (
        <p>Loading initial data...</p>
      )}

      <div className="solution-info">
        <h4>How the solution works:</h4>
        <ol>
          <li>Each effect creates a closure with <code>active = true</code></li>
          <li>When id changes, cleanup runs: <code>active = false</code> (old closure)</li>
          <li>New effect runs with <code>active = true</code> (new closure)</li>
          <li>Stale requests check <code>active</code> and don't update state</li>
          <li>Only the latest request updates state ✅</li>
        </ol>
      </div>
    </div>
  );
}

export default DataDisplayer;
