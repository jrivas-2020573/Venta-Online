const { Router } = require('express');
const { check } = require('express-validator');

const {getCategorias, postCategoria, putCategoria, deleteCategoria} = require('../controllers/categoria');
const { existeCategoriaPorId, categoriaExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCategorias);

router.post('/agregar',[
    validarJWT,
    esAdminRole,
    check('nombre').custom(categoriaExiste),
    check('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
    validarCampos
], postCategoria);

router.put('/editar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre').custom(categoriaExiste),
    validarCampos
], putCategoria);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'ID no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], deleteCategoria);

module.exports = router;