const { response, request } = require('express');
const jws=require('jsonwebtoken');
const Usuario = require("../models/usuario");


const validarJWT=async(req=request,res=response, next)=>{

    const token=req.header('x-token');
  
    if(!token){
      return  res.status(401).json({
          msg: 'no hay token en la petición'
      });
    }

   try {

     const {uid}=  jws.verify(token,process.env.SECRETORPRIVATEKEY);
     
     //leer usuario con el uid
    const usuario= await Usuario.findById(uid);

     if(!usuario){
       return res.status(401).json({
         msg:'Token no valido - usuario no existe bd'
       });
     }
    
    // req.uid=uid; //creamos una propiedad nueva   y se pasara en usuarios routes por todos los pasos
     
    //comprobar que uid tiene estado true
    if(!usuario.estado){
      return res.status(401).json({
        msg:'Token no valido -usuario estado:false'
      });
    }

     req.usuario=usuario;

    next();
       
   } catch (error) {
       console.log(token);
       console.log(error);
       res.status(401).json({
        msg: 'Token no valido'
      });
   }


    
}

module.exports={
    validarJWT
}