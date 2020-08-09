const {check} = require('express-validator');
const { isDate } = require('./isDateHelper');


const validarCrearEvento = () => {

    return [

        check(['title','star','end']).not().isEmpty().withMessage('es requerido'),
    
        check('title').isLength({min:5}).withMessage('debe conterner almenos 5 caracteres'),
    
        check(['star','end'],'fecha invalida').custom(isDate)
    ];

};

module.exports = {
    validarCrearEvento
}