const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true],
        unique: true
    },
    stock: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
    
});

module.exports = model('Producto', ProductoSchema)