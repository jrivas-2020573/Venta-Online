const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatoria']
    },
    proveedor: {
        type: String
    }
});

module.exports = model('Categoria', CategoriaSchema)