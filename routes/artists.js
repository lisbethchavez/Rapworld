const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /artists
router.get('/', (req, res) => {
  const query = 'SELECT * FROM artists';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los artistas' });
    res.json(results);
  });
});

// GET /artists/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM artists WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el artista' });
    if (results.length === 0) return res.status(404).json({ error: 'Artista no encontrado' });
    res.json(results[0]);
  });
});

// POST /artists
router.post('/', (req, res) => {
  const { name, bio_url, bio_yearsactivestart, bio_birthdate, bio_summary, bio_yearsactiveend, bio_deathdate, youtube_clipexampleurl } = req.body;
  const query = 'INSERT INTO artists (name, bio_url, bio_yearsactivestart, bio_birthdate, bio_summary, bio_yearsactiveend, bio_deathdate, youtube_clipexampleurl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, bio_url, bio_yearsactivestart, bio_birthdate, bio_summary, bio_yearsactiveend, bio_deathdate, youtube_clipexampleurl];
  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear el artista' });
    res.status(201).json({ message: 'Artista creado', id: result.insertId });
  });
});

// PUT /artists/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio_url, bio_yearsactivestart, bio_birthdate, bio_summary, bio_yearsactiveend, bio_deathdate, youtube_clipexampleurl } = req.body;
  const query = 'UPDATE artists SET name = ?, bio_url = ?, bio_yearsactivestart = ?, bio_birthdate = ?, bio_summary = ?, bio_yearsactiveend = ?, bio_deathdate = ?, youtube_clipexampleurl = ? WHERE id = ?';
  const values = [name, bio_url, bio_yearsactivestart, bio_birthdate, bio_summary, bio_yearsactiveend, bio_deathdate, youtube_clipexampleurl, id];
  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el artista' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Artista no encontrado' });
    res.json({ message: 'Artista actualizado' });
  });
});

// DELETE /artists/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM artists WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el artista' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Artista no encontrado' });
    res.json({ message: 'Artista eliminado' });
  });
});

module.exports = router;

