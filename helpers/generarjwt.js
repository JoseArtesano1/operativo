const { request } = require('express');
const jwt=require('jsonwebtoken');

const generaJWT=(uid='')=>{

    return new Promise((resolve, reject)=>{

        const payload={uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
           // expiresIn:'8h'
        }, (err, token)=>{   // aqui el callback

            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })

}


module.exports={
    generaJWT
}