const { Router } = require('express');
const { AgregarProductos } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/asignar/:idProducto', [
    validarJWT
], AgregarProductos);

module.exports = router;
