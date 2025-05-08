const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dataPath = path.join(__dirname, '../data/ventas.json');

function readJSON(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function writeJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// GET todas las ventas
router.get('/', (req, res) => {
    const data = readJSON(dataPath);
    res.json(data);
});

// POST nueva venta
router.post('/', (req, res) => {
    const data = readJSON(dataPath);
    const newSale = { id: Date.now(), ...req.body };
    data.push(newSale);
    writeJSON(dataPath, data);
    res.status(201).json(newSale);
});

module.exports = router;
