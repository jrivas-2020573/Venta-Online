const {request, response} = require('express');

const Categoria = require('../models/categoria');

const getCategorias = async (req = request, res = response) => {
    
    const listaCategorias = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ]);

    res.status(302).json({
        listaCategorias
    });
}

const getCategoriaId = async ( req = request, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id)

    res.json({
        categoria
    })
}

const postCategoria = async (req = request, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre});
    if (categoriaDB) {
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre}, ya existe en la db`
        })
    }

    const data = {
        nombre
    }

    const categoriaAdd = new Categoria(data);

    await categoriaAdd.save();

    res.json({
        categoriaAdd
    });
}

const putCategoria = async(req = request, res = response) => {
    
    const {id} = req.params;

    const {_id, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase()

    const categoriaEditada = await Categoria.findByIdAndUpdate(id,resto, {new: true});

    res.json({
        categoriaEditada
    });
}

const deleteCategoria = async(req = request, res = response) => {
    
    const {id} = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id, {new: true});

    res.json({
        categoriaEliminada
    });
}

module.exports = {
    getCategorias,
    getCategoriaId,
    postCategoria,
    putCategoria,
    deleteCategoria
}