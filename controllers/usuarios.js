const{response, request}=require('express');
const bcryptjs=require('bcryptjs');

const Usuario=require('../models/usuario');  // en mayuscular pq asi se puede instanciar





const usuariosGet=async(req=request, res=response)=> {
    //res.send('Hello Worldddd')
   // const {q, nombre='no name',limit}=req.query;   // ej http://localhost:4000/api/usuarios?q=hola&nombre=susto
   const {limite=5, desde=0}=req.query;
   const query={estado:true};
  /*  const usuarios=await Usuario.find(query)
   .limit(Number(limite))
   .skip(Number(desde));
   const total=await Usuario.countDocuments(query); */

    const [total,usuarios]=await Promise.all([      //desestructurar un arreglo const resp
      Usuario.countDocuments(query),
      Usuario.find(query)
   .limit(Number(limite))
   .skip(Number(desde))
    ])

    res.json({
    //  resp
         total,
         usuarios
    });
  }




  const usuariosPut=async(req, res=response)=> {

    const {id}=req.params;  //nos devuelve el valor puesto de parametro en url ej: usuarios/api/1
    const{_id,password,google,correo, ...resto}=req.body;  //excluir lo que no queremos actualizar

    //VALIDAR EN BD

    if(password){
      const salt=bcryptjs.genSaltSync();   //encriptar la misma contraseña que genera un hash distinto
      resto.password=bcryptjs.hashSync(password,salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto);

    res.json(//{
        // msg:'put Api - controlador',
         usuario
  // }
   );
 }



  const usuariosPost= async (req, res=response)=> {
   
    
    const {nombre, correo, password, rol}=req.body;
    const usuario= new Usuario({nombre, correo, password, rol});
    
    //VERIFICAR EMAIL
    /*  const existeEmail=await Usuario.findOne({correo});
     if(existeEmail){
       return res.status(400).json({
         msg:'El correo ya existe'
       })
     } */

    //ENCRIPTAR CONTRASEÑA
    const salt=bcryptjs.genSaltSync();   //indicar el numero de hasheados por defecto 10
    usuario.password=bcryptjs.hashSync(password,salt);

    //GUARDAR BD
    await usuario.save();
    res.json({
               // msg:'post Api - controlador',
               usuario
    });
  }




  const usuariosDelete=async(req, res=response)=> {

    const{id}=req.params;

   // const uid=req.uid;
    //FISICAMENTE
   // const usuario=await Usuario.findByIdAndDelete(id);

    //CAMBIAR EL ESTADO
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});
  //  const usuarioAutenticado=req.usuario;

    res.json(usuario);
 }

 const usuariosPatch=(req, res=response)=> {
    res.json({
         msg:'patch Api - controlador'
   });
 }

  module.exports={
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete,
      usuariosPatch
  }