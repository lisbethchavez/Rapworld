import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ArtistProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usamos useEffect para hacer la solicitud cuando el componente se monta
  useEffect(() => {
    axios.get('http://localhost:3009/artists')
      .then(response => {
        setData(response.data); // Guardamos los datos de los artistas
        setLoading(false); // Cambiamos el estado de "cargando" a falso
      })
      .catch(err => {
        console.error(err);
        setError("Error al obtener los datos.");
        setLoading(false); // Cambiamos el estado de "cargando" a falso
      });
  }, []);

  // Mostrar mientras los datos están cargando
  if (loading) {
    return <div>Loading...</div>;
  }

  // Mostrar error si hay algún problema
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="artist-profile-container">
      {data.map((artist, index) => (
        <div key={index} className="artist-card">
          <h2>{artist.name}</h2>
          <p><strong>Summary:</strong> {artist.bio_summary}</p>
          <p><strong>Born:</strong> {artist.bio_birthdate}</p>
          <p><strong>Location:</strong> {artist.location_city}</p>
          <a href={artist.bio_url} target="_blank" rel="noopener noreferrer">
            Learn more on Wikipedia
          </a>
          
          {/* Video Embed */}
          <div>
            <h4>Watch a clip:</h4>
            <iframe
              width="560"
              height="315"
              src={artist.youtube_clipexampleurl}
              title="Artist Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistProfile;


