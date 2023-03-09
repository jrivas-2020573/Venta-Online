const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
    
});

module.exports = model('Producto', ProductoSchema)