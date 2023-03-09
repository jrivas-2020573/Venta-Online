const {Router} = require('express');
const {check} = require('express-validator');
const { getProductos, postProducto, putProducto, deleteProducto, activarProducto, ProductosNoAviable, getProductoPorId, getProductoPorNombre, getProductosPorCategoria } = require('../controllers/producto');

const {existeProductoPorId, existeProducto, esProductoValido} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getProductos);

router.get('/productoPorNombre', [
    check('nombre').custom(esProductoValido),
    validarCampos
], getProductoPorNombre);

router.get('/productosPorCategoria/:idCategoria', getProductosPorCategoria);

router.get('/mostrarAgotados',[
    validarJWT,
    esAdminRole
], ProductosNoAviable);

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre no puede ir vacio').not().isEmpty(),
    check('nombre').custom(existeProducto),
    check('precio','tienes que colocar un numero para el precio').isInt(),
    check('stock','tienes que coloar un numero para el stock').isInt(),
    check('categoria', 'La categoria no puede ir vacia').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    validarCampos
], postProducto);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria', 'La categoria no puede ir vacia').not().isEmpty(),
    check('categoria', 'No es un id valido').isMongoId(),
    check('precio','tienes que colocar un numero para el precio').isInt(),
    check('stock','tienes que colocar un numero para el stock').isInt(),
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

router.post('/activar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], activarProducto);

module.exports = router;