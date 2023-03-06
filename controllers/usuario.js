//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
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

    const { nombre, correo, password, rol, facturas } = req.body;
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
    const {rol} = req.usuario
    const {nombre} = req.body;
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} es un admin, no puedes editar sus datos siendo cliente`
        });
    }else{
        const { id } = req.params;
    
        //Ignoramos el _id al momento de editar y mandar la petición en el req.body
        const { _id, ...resto } = req.body;
    
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

}


const deleteUsuario = async (req = request, res = response) => {

    const {rol, nombre} = req.usuario
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} es un cliente, no puede eliminar los datos de un admin`
        });
    }else{
        const { id } = req.params;
    
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    
        res.json({
            msg: 'DELETE API de usuario',
            usuarioEliminado
        });
    }


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