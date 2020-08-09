const jwt = require('jsonwebtoken');


const generalToken = (uid, name) => {

    return new Promise( (resolve, reject) => {

        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRECT_JWT_SEED,{
            expiresIn: '2h'
        }, (error, token) =>{

            if(error){
                console.log(error);
                reject('no se pudo general el token')
            }

            resolve(token);

        });

    });

};

module.exports ={
    generalToken
}