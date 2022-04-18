const bcryptjs = require("bcryptjs");

const { response } = require("express");
const { generaJWT } = require("../helpers/generarJWT");
const Usuario = require("../models/usuario");



const login=async(req, res=response)=>{

    const {correo, password}=req.body;


    try {

         // Existe el correo
         
         const usuario=await Usuario.findOne({correo});
         if(!usuario){
             return res.status(400).json({
                msg: 'Password/Usuario no es valido -Estado:false'
             });
            
         }

         // Esta el usuario Activo

         if(!usuario.estado){
            return res.status(400).json({
               msg: 'Password/Usuario no es valido -correo'
            });
           
        }
         //Verificar la contraseña

         const valiPass= bcryptjs.compareSync(password, usuario.password); // el que recibimos con el de la bd

         if(!valiPass){

            return res.status(400).json({
                msg: 'Password/Usuario no es valido -Password'
             });
         }
         //Generar JWT

         const token=await generaJWT(usuario.id);

        res.json({       // solo un res.json pq sino da error
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            msg: 'Hable con el administrador'
        });
    }

   

    

}

module.exports={
    login
}