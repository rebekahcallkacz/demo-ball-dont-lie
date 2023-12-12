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
    console.log(data);
    return data.data;
  }
  // If there's not data, return an empty array
  return [];
};

function App() {
  useEffect(() => {
    loadAllPlayers();
  }, []);
  return (
    <>
      <div className="card">
        <p>Put your data here</p>
      </div>
    </>
  );
}

export default App;
