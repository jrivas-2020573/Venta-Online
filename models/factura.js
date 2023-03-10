const { Schema, model } = require("mongoose")

const FacturaSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto :[{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    }],

    total:{
        type:Number,
        require: true,
    },

    fecha:{
        type: Date,
        requiere: true,
    }

})

module.exports = model('Factura', FacturaSchema)