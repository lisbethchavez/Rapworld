const express = require('express');
const router = express.Router();
const db = require('../db');

let categories = [];

// GET /categories
router.get('/', (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener las categorías' });
        res.json(results);
    });
});


// Crear una nueva categoría (POST)
router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "El campo 'name' es obligatorio" });
    }

    const query = 'INSERT INTO categories (name) VALUES (?)';
    db.query(query, [name], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al crear la categoría' });
        res.status(201).json({ message: "Categoría creada", category: { id: results.insertId, name } });
    });
});


// Eliminar una categoría (DELETE)
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM categories WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar la categoría' });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json({ message: "Categoría eliminada" });
    });
});


module.exports = router;
