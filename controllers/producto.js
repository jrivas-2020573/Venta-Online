const {response, request} = require('express');

const Producto = require('../models/producto');

const getProductos = async(req = request, res = response) => {
    const query = { stock: true };

    const listaProdcutos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        listaProdcutos
    });
}

const ProductosNoAviable = async(req = request, res = response) => {
    const query = { stock: false };

    const listaProdcutos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        listaProdcutos
    });
}

const postProducto = async(req = request, res = response) => {
    const { stock, ...body} = req.body;
    
    const productoEnDB = await Producto.findOne({nombre: body.nombre});

    if (productoEnDB) {
        return res.status(400).json({
            msg: `El producto ${productoEnDB.nombre} ya esta en la DB`
        });
    }

    const data = {
        ...body
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({
        producto
    });
}

const putProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, stock,...Data} = req.body;

    const producto = await Producto.findByIdAndUpdate(id, Data, {new: true});

    res.json({
        msg: 'Put producto',
        producto
    });
}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const ProductoBorrado = await Producto.findByIdAndUpdate(id, {stock: false}, {new: true});

    res.json({
        msg: 'Producto no disponible',
        ProductoBorrado
    });
}

const activarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const ProductoBorrado = await Producto.findByIdAndUpdate(id, {stock: true}, {new: true});

    res.json({
        msg: 'Producto ya disponile',
        ProductoBorrado
    });
}



module.exports = {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto,
    activarProducto,
    ProductosNoAviable
}
