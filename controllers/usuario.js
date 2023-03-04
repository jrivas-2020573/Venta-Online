//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {

    if (req.body.rol == "") {
        req.body.rol = "CLIENT"
    }

    const { nombre, correo, password, rol,facturas } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol, facturas });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const putUsuario = async (req = request, res = response) => {
    if (req.body.rol == "") {
        req.body.rol = "CLIENT"
    }

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, estado, ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        usuarioEditado
    });
}


const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de usuario',
        usuarioEliminado
    });

}

const getMyFacturas = async (req= request, res = response) => {
    const usuario = req.usuario._id;
    const facturas = req.usuario.facturas

    res.json({
        msg: 'Tus Facturas',
        facturas
    })
}



module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
    getMyFacturas
}