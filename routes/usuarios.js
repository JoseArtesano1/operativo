
const{Router}=require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioporId } = require('../helpers/db-validators');

/* const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,tieneRol } = require('../middlewares/validar-roles'); */

const {validarCampos,validarJWT,esAdminRole,tieneRol}=require('../middlewares');


const router=Router();

router.get('/',[
  check('limite','no es numero').optional().isNumeric(),  //añadido por mi 
  check('desde','no es numero').optional().isNumeric(),
  validarCampos
],  usuariosGet);

router.put('/:id',[
  check('id','no es un id valido').isMongoId(),//controla que el id es de mongo
  check('id').custom(existeUsuarioporId),
  check('rol').custom(esRoleValido),  
  validarCampos //para que no se cuelgue
],
  usuariosPut);



  router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio y mas de seis letra').isLength({min:6}),
    check('correo').custom(emailExiste),
    //check('correo', 'el correo no es valido').isEmail(),        //los errores los muestra luego 
   // check('rol', 'el rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido), //custom valora lo recibido del body //(rol)=>esRoleValido(rol) se cambia pq recibe el mismo argumento
    validarCampos //ultimo middleware sino pasa no ejecuta el controlador       
  ]  ,usuariosPost);   //insertar                               //check es un middleware



  router.delete('/:id',[
    validarJWT,
   // esAdminRole,
   tieneRol('ADMIN_ROLE','VENTAS_ROLE', 'USER_ROLE'),
    check('id','no es un id valido').isMongoId(),//controla que el id es de mongo
    check('id').custom(existeUsuarioporId),
    validarCampos
  ],  usuariosDelete);

  router.patch('/',  usuariosPatch);





module.exports=router;