const { validationResult } = require('express-validator');

const validarCampos=(req,res,next)=>{ //next cuando pasa el middleware


    const error=validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json(error);
    }

   next(); //para seguir con el siguiente middleware ej el controlador
}


module.exports= {
    validarCampos
}