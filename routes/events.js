const { Router } = require('express');
const { obtenerEventos, detalleDelEvento, actualizarEvento, eliminarEvento, crearEvento } = require('../controllers/eventsController');
const { jwtHelper } = require('../middlewares/jwtMiddleware');
const { validarCrearEvento } = require('../helpers/eventValidacion');
const { validarCamposEvento } = require('../middlewares/eventMiddleware');


const router = Router();


router.use(jwtHelper);


router.get('/', obtenerEventos);
router.get('/:id', detalleDelEvento);
router.post('/', [validarCrearEvento(),validarCamposEvento] ,crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);




module.exports= router;
