const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    }, 
  
    precio: {
      type: Number,
      required: true
    },
    Cantidad: { 
      type: Number,
      required: true  
    },
    descripcion: {
      type: String
    }
  });
  
  module.exports = mongoose.model('Producto', productoSchema);