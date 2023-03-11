const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, putUsuario, deleteUsuario, putShopCar, getShopCar, putProductShopCar, EmptyShopCar, borrarCliente, PutCliente, PostCliente } = require('../controllers/usuario');
const { emailExiste, esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getUsuarios);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
] , postUsuario);


router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarCampos
], putUsuario);


router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);

router.put('/shopCar', [
    validarJWT
], putShopCar);

router.get('/mostrarShopCar/:id', [
    validarJWT
], getShopCar);

router.put('/shopCarDelete/:id', [
    validarJWT
], putProductShopCar);

router.put('/vaciarShopCar', [
    validarJWT
], EmptyShopCar);

// router.delete('/deleteCuenta/:id', [
//     validarJWT,
//     check('id', "id de mongo no existe").isMongoId(),
//     validarCampos
// ], borrarCliente);

// router.put('/editarCliente/:id', [validarCampos], PutCliente);

// router.post('/agregarCliente', [
//     check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
//     check('password', 'el password es obligatorio').not().isEmpty(),
//     check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
//     check('correo', 'El correo no es correcto').isEmail(),
//     check('correo').custom(emailExiste),
//     validarCampos
// ], PostCliente);



module.exports = router;