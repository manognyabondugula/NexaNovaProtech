const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ POST: Add a new trainer
router.post('/trainers', (req, res) => {
    const { name, email, phone, specialization } = req.body;
    console.log('POST /trainers called with:', req.body); // ✅ Optional debug
    const query = 'INSERT INTO trainer (name, email, phone, specialization) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, specialization], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Trainer added', id: result.insertId });
    });
});

// ✅ GET: All trainers
router.get('/trainers', (req, res) => {
    db.query('SELECT * FROM trainer', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// ✅ DELETE: A trainer by ID
router.delete('/trainers/:id', (req, res) => {
    db.query('DELETE FROM trainer WHERE trainer_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Trainer deleted' });
    });
});

// ✅ GET: Trainer by ID
router.get('/trainer/:id', (req, res) => {
    db.query('SELECT * FROM trainer WHERE trainer_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results[0]);
    });
});

// ✅ GET: Trainers by subject
router.get('/trainer/:subject/topic', (req, res) => {
    db.query('SELECT * FROM trainer WHERE specialization = ?', [req.params.subject], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
