const{Router}=require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



const router=Router();

router.post('/login',[
  check('correo', 'el correo es obligatorio').isEmail(),
  check('password', 'la contraseña es obligatorio').not().isEmpty(),
  validarCampos
], login);  //tenemos en la ruta ya fijado en el constructor del server app/auth/


module.exports=router;