
const express = require('express');
const router = express.Router();
const Venta = require('../models/venta');

// Endpoint para registrar una nueva venta
router.post('/venta', (req, res) => {
  const nuevaVenta = new Venta(req.body);
  nuevaVenta
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Consultar todas las ventas
router.get('/venta', (req, res) => {
  Venta.find()
    .populate('productosVendidos.producto')  // Para obtener detalles completos del producto
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Otras operaciones CRUD para las ventas según sea necesario

module.exports = router;