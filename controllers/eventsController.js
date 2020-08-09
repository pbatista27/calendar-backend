const {response} = require('express');
const eventosModel = require('../models/eventosModel');

const crearEvento = async(req, res=response) => {

    const evento = new eventosModel(req.body);
    try { 
        
        evento.user = req.uid;
        
       const eventoGuardado = await evento.save();
    
        res.status(201).json({
            ok: true,
            msg:'crear evento',
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'debe contactar con el administrador'

        });


    };
};


const obtenerEventos = async(req, res= response) => {


    try {
        
        const eventos = await eventosModel.find().populate('user','name');
        
        res.status(200).json({
            ok: true,
            eventos
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'error del servidor'
        });
    }

};


const detalleDelEvento = async(req, res= response) => {

    const id = req.params.id;

    try {
        
        const evento = await eventosModel.findById(id).populate('user','name');
        
        res.status(200).json({
            ok: true,
            evento
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'error del servidor'
        });
    }
};


const actualizarEvento = async(req,res=response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await eventosModel.findById(eventoId);

        
        if(!evento){
            return res.status(400).json({
                ok:false,
                msg:'error el evento no existe en el sistema'
            });
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: 'error no tiene privilegio para modificar el evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await eventosModel.findByIdAndUpdate(eventoId,  nuevoEvento,{new:true});
        
        return res.status(201).json({
            ok:true,
            msg:'evento actualizado con exito',
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                ok:false,
                msg:'error en el servidor contacte con el administrador'
            });
    }


}


const eliminarEvento = async(req, res= response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await eventosModel.findById(id);
    
        if( !evento ){
            return res.status(400).json({
                ok: false,
                msg:'error evento no existe en el sistema'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg:'usted no tiene permiso para eliminar este post'
            });
        }


        await eventosModel.findByIdAndDelete(id);

        res.status(201).json({
            ok:true,
        });


    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'error del servidor'
        });

    };

};


module.exports = {
    crearEvento,
    obtenerEventos,
    detalleDelEvento,
    actualizarEvento,
    eliminarEvento
}