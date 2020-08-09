const { check } = require('express-validator')


const reglaValidarLogin = () => {
    return [
        check(['email','password'])
        .not()
        .isEmpty()
        .withMessage('est campo es obligatorio'),

        check('email')
        .isEmail()
        .withMessage('debe colocar un email valido'),
    ];
};


const reglaValidarCrearUsuario = () =>{

    return [
        check(['name','email','password'])
        .not()
        .isEmpty()
        .withMessage('est campo es obligatorio'),
        
        check('name').isLength({min:3}).withMessage('Debe ser mayor a 3 caracteres'),

        check('email')
        .isEmail()
        .withMessage('debe colocar un email valido'),

        check('password')
        .isLength({min:6})
        .withMessage('debe ser mayor a 6')
    ];

};


module.exports = {

    reglaValidarLogin,
    reglaValidarCrearUsuario
}