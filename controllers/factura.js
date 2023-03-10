const { response, request } = require('express');

const Factura = require('../models/facturaModel');
const Usuario = require('../models/usuarioModel');



const getFacturasUsuario = async (req = request, res = response) => {
    
    const usuarioId = req.usuario._id
    
    const mostrarFacturas = await Factura.find({usuario: usuarioId})
    .populate("usuario", "-_id  nombre").
    populate("producto", "-_id nombre precio")

    res.json({
        msg: 'Get Api de categoria',
        mostrarFacturas
    })
}

const generarFactura = async (req = request, res = response) => {
    const usuarioId = req.usuario._id
    const data = req.body
    const usuario = await Usuario.findOne({_id: usuarioId})
    const params = {
        usuario: usuarioId,
        producto: usuario.carrito,
        total: usuario.total,
        fecha: Date.now()
    }
   
   
    const factura = new Factura(params)
    const nuevaFactura = await factura.save()

    const miFactura = await Factura.findById({_id: nuevaFactura._id})

    const total = 0, cartVacio = []
    await Usuario.findByIdAndUpdate({_id:usuarioId},{total :total, carrito: cartVacio }, {new: true}) 


    res.json({
        msg: 'Gracias por su compra >:D',
        miFactura
    })

}

module.exports  = {
    generarFactura,
    getFacturasUsuario
}