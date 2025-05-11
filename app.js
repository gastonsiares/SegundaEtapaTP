import express from 'express';
// const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

import usuariosRoutes from './routes/usuarios.js';
import productosRoutes from './routes/productos.js';
import ventasRoutes from './routes/ventas.js';

app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
