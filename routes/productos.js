import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const dataPath = path.join(__dirname, '../data/productos.json');

function readJSON(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function writeJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// GET todos los productos
router.get('/', (req, res) => {
    const data = readJSON(dataPath);
    res.json(data);
});

// POST nuevo producto
router.post('/', (req, res) => {
    const data = readJSON(dataPath);
    const newProduct = { id: Date.now(), ...req.body };
    data.push(newProduct);
    writeJSON(dataPath, data);
    res.status(201).json(newProduct);
});

export default router;
