import { useState, useEffect } from "react";
import "./App.css";

const loadAllPlayers = async () => {
  // Get the response
  const response = await fetch(`https://www.balldontlie.io/api/v1/players`, {
    // This tells the API that you want your data in JSON format
    headers: { "Content-Type": "application/json" },
  });
  // Pull out your data
  const data = await response.json();
  // If there's data, return the data (where the people are)
  if (data) {
    console.log("the raw data response", data);
    return data.data;
  }
  // If there's not data, return an empty array
  return [];
};

function App() {
  const [players, setPlayers] = useState({
    data: undefined,
    isLoading: false,
    isErrored: false,
  });

  useEffect(() => {
    setPlayers({
      data: undefined,
      isLoading: true,
      isErrored: false,
    });
    loadAllPlayers()
      .then((data) =>
        setPlayers({
          data: data,
          isLoading: false,
          isErrored: false,
        })
      )
      .catch((error) =>
        setPlayers({
          data: null,
          isLoading: false,
          isErrored: true,
          errorMessage: error,
        })
      );
  }, []);

  console.log("the data stored in players", players);
  return (
    <>
      <div className="card">
        {players.isLoading && <p>Loading...</p>}
        {players.data &&
          players.data.map((player) => (
            <p
              key={player.id}
            >{`${player.first_name} ${player.last_name} | ${player.team.full_name} | ${player.position}`}</p>
          ))}
        {players.isErrored && players.errorMessage && (
          <p>{`There was an error: ${players.errorMessage}`}</p>
        )}
      </div>
    </>
  );
}

export default App;
