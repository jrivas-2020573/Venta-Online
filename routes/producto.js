const {Router} = require('express');
const {check} = require('express-validator');
const { getProductos, postProducto, putProducto, deleteProducto, getProductosMasVendidos } = require('../controllers/producto');

const {existeProductoPorId, existeCategoriaPorId} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getProductos);

// router.get('/masVendidos', getProductosMasVendidos);

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
    check('categoria').custom( existeCategoriaPorId),
    validarCampos
], postProducto);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
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