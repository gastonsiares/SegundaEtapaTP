const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dataPath = path.join(__dirname, '../data/usuarios.json');
const ventasPath = path.join(__dirname, '../data/ventas.json');

function readJSON(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function writeJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// GET todos los usuarios
router.get('/', (req, res) => {
    const data = readJSON(dataPath);
    res.json(data);
});

// GET usuario por ID
router.get('/:id', (req, res) => {
    const data = readJSON(dataPath);
    const user = data.find(u => u.id === parseInt(req.params.id));
    if (user) res.json(user);
    else res.status(404).send('Usuario no encontrado');
});

// POST nuevo usuario
router.post('/', (req, res) => {
    const data = readJSON(dataPath);
    const newUser = { id: Date.now(), ...req.body };
    console.log("Nuevo usuario:", newUser); // 👈 log
    data.push(newUser);
    writeJSON(dataPath, data);
    console.log("Usuarios actualizados:", data); // 👈 log
    res.status(201).json(newUser);
});

// PUT actualizar usuario
router.put('/:id', (req, res) => {
    const data = readJSON(dataPath);
    const index = data.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        data[index] = { ...data[index], ...req.body };
        writeJSON(dataPath, data);
        res.json(data[index]);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// DELETE eliminar usuario si no tiene ventas
router.delete('/:id', (req, res) => {
    const usuarios = readJSON(dataPath);
    const ventas = readJSON(ventasPath);
    const id = parseInt(req.params.id);

    const tieneVentas = ventas.some(v => v.id_usuario === id);
    if (tieneVentas) {
        return res.status(400).send('No se puede eliminar el usuario porque tiene ventas asociadas');
    }

    const nuevosUsuarios = usuarios.filter(u => u.id !== id);
    if (nuevosUsuarios.length === usuarios.length) {
        return res.status(404).send('Usuario no encontrado');
    }

    writeJSON(dataPath, nuevosUsuarios);
    res.send('Usuario eliminado correctamente');
});

module.exports = router;
