const mongoose=require('mongoose');


const dbConnection=async()=>{

    try { //puede haber error en la conexion

      await  mongoose.connect(process.env.MONGODB_CNN, {
          useNewUrlParser:true,   
          useUnifiedTopology:true //opciones de conexion
        //   useCreateIndex:true,   depreciado
        //  useFindAndModify:false

      });  //EL await por la promesa de este metodo, esperar con la conexion
        
       console.log('Base de datos online');


    } catch (error) {
        console.log(error);
        throw new Error('Error en conexión BD');
    }


}

module.exports={
    dbConnection
}