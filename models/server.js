const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{


    constructor (){
        this.app= express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/usuarios';
        this.authPath='/api/auth';
        //CONEXION BD
         this.conectarBD();

        //MIDDLEWARES
         this.middlewares();

        //RUTAS DE MI APLICACION 
        this.routes(); //llamamos a las rutas
    }


    async conectarBD(){
        await dbConnection();
    }


    middlewares(){

        //CORS limita el acceso 
       this.app.use(cors());

       //Lectura y parseo del body
       this.app.use(express.json());

        //directorio publico  dirige a public
        this.app.use(express.static('public'));
    }

    routes(){
        //middleware
        this.app.use(this.authPath,require('../routes/auth'));
      this.app.use(this.usuariosPath,require('../routes/usuarios'));


      /* this.app.get('/api',  (req, res)=> {
        //res.send('Hello Worldddd')
        res.json({
            ok:true,
            msg:'get Api'
        });
      });
 */

    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en:',this.port);
        });
    }

}

module.exports=Server;
    
