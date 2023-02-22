const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true]
    },
    stock: {
        type: Number,
        require: [true]
    }
});

module.exports = model('Producto', ProductoSchema)