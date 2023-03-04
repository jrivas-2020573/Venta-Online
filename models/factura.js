const {Schema, model} = require('mongoose');

const FacturaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    productos: {
        type: Array
    }
});

module.exports = model('Factura', FacturaSchema);