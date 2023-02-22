const {response, request} = require('express');

const Producto = require('../models/producto');

const getProductos = async(req = request, res = response) => {

    const listaProdcutos = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
    ]);

    res.json({
        listaProdcutos
    });
}

const postProducto = async(req = request, res = response) => {
    const {nombre, stock} = req.body;
    const productoDB = new Producto({nombre, stock});

    await productoDB.save();

    res.status(201).json({
        productoDB
    });
}

const putProducto = async (req = request, res = response) => {
    const {id} = req.params;

    const {_id, ...resto} = req.body;

    const productoEditado = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        productoEditado
    });
}

const deleteProducto = async (req = request, res = response) => {
    const {id} = req.params;

    const productoEliminado = await Producto.findByIdAndDelete(id);

    res.json({
        productoEliminado
    });
}

module.exports = {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}
