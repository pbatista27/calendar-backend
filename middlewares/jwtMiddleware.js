const {response, request} = require('express');
const jwt = require('jsonwebtoken');


const jwtHelper = (req= request, res= response, next) => {

    const token = req.header('x-token');

    if(!token ){
        return res.status(401).json({
            ok: false,
            msg: 'token no enviado'
        });
    }

    try {

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRECT_JWT_SEED
        );

        req.uid = uid,
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'token no valido'
        });
    }
    
    next();
    
};

module.exports = {
    jwtHelper
};