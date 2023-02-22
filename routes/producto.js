const {Router} = require('express');
const {check} = require('express-validator');
const { getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/producto');

const {existeUsuarioPorId, existeProductoPorId} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getProductos);

router.post('/agregar', [
    check('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
    check('nombre', 'El nombre no acepta numeros').isString(),
    check('stock', 'El stock no puede ir vacio').not().isEmpty(),
    check('stock', 'El campo solo acepta numeros').isInt(),
    validarCampos
], postProducto);

router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('stock', 'El tock solo acepta numeros').isInt(),
    validarCampos
], putProducto);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], deleteProducto);

module.exports = router;