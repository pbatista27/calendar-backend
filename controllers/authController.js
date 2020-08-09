const {response} = require('express');
const bcrypt = require('bcryptjs'); 
const usuariosModel = require('../models/usuariosModel');
const { generalToken } = require('../helpers/jwt');
 

const crearUsuarioController = async (req,res = response) => {

    const {email, password} = req.body;

    let usuario = await usuariosModel.findOne({email});

    if(usuario){
        return res.status(400).json({
            ok: false,
            msg:'Usuario ya existe en el sistema'
        });
    }

    try {
        usuario = new usuariosModel(req.body);

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //general token
        const jwt = await generalToken(usuario.id, usuario.name);
    
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            jwt
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            error: "ocurrio un error en el sistema"
        });
    };
};


const loginUsuarioController = async(req, res= response) => {

    const {email, password} = req.body;
    const usuario = await usuariosModel.findOne({email});

    if( !usuario ){

        return res.status(400).json({
            ok: false,
            msg: 'email invalido'
        });

    }

    validarContreseña = bcrypt.compareSync(password, usuario.password)

    if( !validarContreseña ){

        return res.status(400).json({
            ok: false,
            msg: 'password incorrecto'
        });
    };

    const jwt = await generalToken(usuario.id, usuario.name);


    res.json({
        ok:true,
        msg:'login',
        uid: usuario.id,
        name: usuario.name,
        jwt
    });
}

const revalidarTokenController = async(req, res= response) => {

    const uid = req.uid;
    const name = req.name;

    //general token
    const jwt = await generalToken(uid,name);

    res.json({
        ok:true,
        jwt
    });
}


module.exports={
    crearUsuarioController,
    loginUsuarioController,
    revalidarTokenController
}