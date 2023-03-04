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

const postCategoria = async (req = request, res = response) => {

    const {nombre} = req.body;
    const categoriaDB = new Categoria({nombre});

    await categoriaDB.save();

    res.json({
        categoriaDB
    });
}

const putCategoria = async(req = request, res = response) => {
    
    const {id} = req.params;

    const {_id, ...resto} = req.body;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id,resto);

    res.json({
        categoriaEditada
    });
}

const deleteCategoria = async(req = request, res = response) => {
    
    const {id} = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    res.json({
        categoriaEliminada
    });
}

module.exports = {
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}