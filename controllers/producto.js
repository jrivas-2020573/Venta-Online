const {response, request} = require('express');

const Producto = require('../models/producto');

const getProductos = async(req = request, res = response) => {
    const query = { estado: true };

    const listaProdcutos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        listaProdcutos
    });
}

const getProductoPorNombre = async(req = request, res = response) =>{
    const {nombre} = req.body;

    const producto = await Producto.findOne({nombre}).populate('categoria', 'nombre')

    res.json({
        producto
    })
}

const getProductosPorCategoria = async(req = request, res = response) => {
    const {idCategoria} = req.params; 
    const query = { categoria: idCategoria }
    
    const listaProdcutos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        listaProdcutos
    })
}

const ProductosNoAviable = async(req = request, res = response) => {
    const query = { estado: false };

    const listaProdcutos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        listaProdcutos
    });
}

const postProducto = async(req = request, res = response) => {
    const { estado, ...body} = req.body;
    
    const productoEnDB = await Producto.findOne({nombre: body.nombre});

    if (productoEnDB) {
        return res.status(400).json({
            msg: `El producto ${productoEnDB.nombre} ya esta en la DB`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({
        producto
    });
}

const putProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, estado,...Data} = req.body;

    if (Data.nombre) {
        Data.nombre = Data.nombre.toUpperCase();
    }

    const productoEdited = await Producto.findByIdAndUpdate(id, Data, {new: true});

    res.json({
        productoEdited
    });
}

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const ProductoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        msg: 'Producto no disponible',
        ProductoBorrado
    });
}

const activarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const ProductoBorrado = await Producto.findByIdAndUpdate(id, {estado: true}, {new: true});

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
    ProductosNoAviable,
    getProductoPorNombre,
    getProductosPorCategoria
}
