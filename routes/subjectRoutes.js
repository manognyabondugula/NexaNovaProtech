const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: Add a new subject
router.post('/subject', (req, res) => {
    const { subject_name } = req.body;
    if (!subject_name) {
        return res.status(400).json({ error: 'subject_name is required' });
    }
    const query = 'INSERT INTO subject (subject_name) VALUES (?)';
    db.query(query, [subject_name], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Subject added successfully', id: result.insertId });
    });
});

// GET: List all subjects
router.get('/subject', (req, res) => {
    db.query('SELECT * FROM subject', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// GET: Subject by ID with trainers teaching it
router.get('/subject/:id', (req, res) => {
    const subjectId = req.params.id;

    const query = `
        SELECT s.subject_id, s.subject_name, t.trainer_id, t.name, t.email, t.phone, t.specialization
        FROM subject s
        LEFT JOIN trainer t ON s.subject_name = t.specialization
        WHERE s.subject_id = ?
    `;

    db.query(query, [subjectId], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No subject found with this ID' });
        }
        res.json(results);
    });
});

module.exports = router;
