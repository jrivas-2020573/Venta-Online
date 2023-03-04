const { Router } = require('express');
const { check } = require('express-validator');
const { AgregarProductos } = require('../controllers/factura');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/asignar/:idProducto', [
    validarJWT
], AgregarProductos);

// router.get('/obtnerFacturaPorID/:id', [
//     validarJWT,
//     check('id', 'Este no es un ID valido').isMongoId(),
//     validarCampos
// ], obtenerFacturaPorID)

module.exports = router;