
const{Schema,model, models}=require('mongoose');

const usuarioSchema=Schema({  //objeto literal
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio']
    },

    correo:{
        type:String,
        required:[true,'el nombre es obligatorio'],
        unique:true  //evitar duplicados
    },

    password:{
        type:String,
        required:[true,'la contraseña es obligatorio']
    },

    img:{
        type:String
       
    },

    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROLE']
    },

    estado:{
        type:Boolean,
        default:true
    },

    google:{
        type:Boolean,
        default:false
    }


});

 usuarioSchema.methods.toJSON=function(){//sobreescribimos el metodo, usamos funcion en vez => para el this

    const {__v, password, _id, ...usuario}=this.toObject(); //sacamos solo v y password y dejamos el resto del usuario
    usuario.uid=_id; //cambiamos el _id por el uid
    return usuario;
 }
module.exports=model('Usuario', usuarioSchema);