/*
Rutas de usuario / Auth
hots + /api/auth

*/
const { Router } = require('express');
const { reglaValidarLogin, reglaValidarCrearUsuario } = require('../helpers/authValidacion');
const { validarCampos } =require('../middlewares/authMiddleware');
const {
    crearUsuarioController,
    loginUsuarioController,
    revalidarTokenController
} = require('../controllers/authController');

const { jwtHelper } = require('../middlewares/jwtMiddleware');


const router = Router();

router.post('/',[reglaValidarLogin(), validarCampos],loginUsuarioController);

router.post('/new',[reglaValidarCrearUsuario(),validarCampos],crearUsuarioController);

router.get('/renameToken',jwtHelper , revalidarTokenController);

module.exports = router;