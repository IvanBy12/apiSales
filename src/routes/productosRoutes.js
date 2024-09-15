const express = require('express');
const router = express.Router();
const productoSchema = require('../models/productos');

// Endpoint para crear un nuevo domicilio
router.post('/producto',(req, res) => {
  console.log(req.body)
  const nuevoProducto = new productoSchema(req.body);
nuevoProducto.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Consultar todos los domicilios
router.get('/producto', (req, res) => {
  productoSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Consultar un domicilio por su ID
router.get('/producto/:id', (req, res) => {
  const { id } = req.params;
  productoSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un domicilio por su ID
router.put('/producto/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  productoSchema.updateOne(
    { _id: id },
    {
      $set: { nombre, precio,Cantidad, descripcion }
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un domicilio por su ID
router.delete('/producto/:id', (req, res) => {
  const { id } = req.params;
  productoSchema.findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
