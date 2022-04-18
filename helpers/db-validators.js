
const Role=require('../models/role');
const Usuario=require('../models/usuario');

 const esRoleValido=  async(rol='')=>{       //rol string vacio por defecto

        const existeRol= await Role.findOne({rol});
        if(!existeRol){

         throw new Error(`el rol ${rol} no esta registrado en bd`);
        }
     }

const emailExiste= async(correo='')=>{

     const existeEmail=await Usuario.findOne({correo});
     if(existeEmail){
        throw new Error(`el correo ${correo} ya esta registrado en bd`);
     } 
}


const existeUsuarioporId= async(id)=>{

     const existeUsuarioId=await Usuario.findById(id);
     if(!existeUsuarioId){
        throw new Error(`el id ${id} no esta registrado en bd`);
     } 
}

    

     module.exports={
         esRoleValido,
         emailExiste,
         existeUsuarioporId
     }