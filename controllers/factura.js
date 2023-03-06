const { response, request } = require('express');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');



const AgregarProductos = async (req = request, res = response) =>{
    const {idProducto} = req.params;
    const usuario = req.usuario._id;
    const productos = req.usuario.facturas;

    const existeProducto = await Producto.findOne({_id: idProducto});
    if (!existeProducto) {
        return res.status(404).json({
            msg: 'Producto no encontrado'
        })
    }

    for(let producto of productos){
        if (existeProducto._id != producto) continue
        var existe = producto
    }
    if (existe) return res.status(400).json({ msg: 'Ya tienes este producto'})
    const updatedUser = await Usuario.findOneAndUpdate(
        {_id: usuario},
        {$push: {'facturas': idProducto}},
        {new: true}
    );
    const updatedFactura = await Producto.findOneAndUpdate(
        {_id: idProducto},
        {$push: {'productos': productos}},
        {new: true}
    )
    res.status(200).json({
        msg: 'Producto Asignado',
        updatedUser,
        updatedFactura
    })
}


module.exports = {
    AgregarProductos
}