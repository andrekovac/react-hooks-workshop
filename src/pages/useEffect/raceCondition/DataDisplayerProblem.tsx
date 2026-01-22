import { useEffect, useState } from 'react';

type StarWarsCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

type Props = {
  id: number;
};

function DataDisplayerProblem({ id }: Props) {
  const [data, setData] = useState<StarWarsCharacter | null>(null);
  const [fetchedId, setFetchedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
          const newData = await response.json();
          setFetchedId(id);
          setData(newData);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }, Math.round(Math.random() * 12000));
    };

    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="data-displayer loading">
        <p>Loading... (may take up to 12 seconds)</p>
      </div>
    );
  }

  const isCorrectData = fetchedId === id;
  const textColor = isCorrectData ? 'green' : 'red';

  return (
    <div className="data-displayer">
      <p style={{ color: textColor, fontSize: '1.2rem', fontWeight: 'bold' }}>
        Displaying Data for: {fetchedId}
        {!isCorrectData && ' ⚠️ RACE CONDITION!'}
      </p>
      <div className="character-info">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Height:</strong> {data.height}</p>
        <p><strong>Mass:</strong> {data.mass}</p>
        <p><strong>Birth Year:</strong> {data.birth_year}</p>
      </div>
    </div>
  );
}

export default DataDisplayerProblem;
