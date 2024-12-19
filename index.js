const express = require('express');
const bodyParser = require('body-parser');
const artistsRoutes = require('./routes/artists');
const locationsRouter = require('./routes/locations');
const categoriesRoutes = require('./rutas/categories');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3009;  
import './index.css';

// Middleware
app.use(cors()); // Para permitir solicitudes CORS desde el frontend
app.use(express.json()); // Para manejar solicitudes JSON

// Rutas
app.use('/artists', artistsRoutes); // Usamos las rutas de artistas

// Puerto de escucha

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



