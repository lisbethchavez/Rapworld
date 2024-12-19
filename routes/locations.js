const express = require('express');
const router = express.Router();
const db = require('../db'); 

// GET /locations 
router.get('/', (req, res) => {
    const query = 'SELECT * FROM locations';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error retrieving locations' });
        res.json(results);
    });
});

// POST /locations - Crear locations
router.post('/', (req, res) => {
    const { name, address } = req.body; 

    if (!name || !address) {
        return res.status(400).json({ error: "Fields 'name' and 'address' are required" });
    }

    const query = 'INSERT INTO locations (name, address) VALUES (?, ?)';
    db.query(query, [name, address], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error creating location' });
        res.status(201).json({ message: "Location created", location: { id: results.insertId, name, address } });
    });
});

// DELETE /locations/:id - Eliminar locations por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM locations WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error deleting location' });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json({ message: "Location deleted" });
    });
});

module.exports = router;

