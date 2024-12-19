// src/App.js
import React from 'react';
import './App.css';
import './index.css';
import ArtistProfile from './ArtistProfile'; // Importamos el componente

function App() {
  return (
    <div className="App">
      <h1>Artist Profile</h1>
      <ArtistProfile /> {/* Usamos el componente */}
    </div>
  );
}

export default App;
