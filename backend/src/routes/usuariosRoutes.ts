import { Router } from 'express';
import {
createUsuario,
getAllUsuarios,
getUsuarioById,
updateUsuario,
deleteSoftUsuario,
getUsuariosByRol
} from '../controllers/usuariosController';

const router = Router();

router.get('/getall',       getAllUsuarios);
router.get('/rol/:rol',     getUsuariosByRol);
router.post('/',            createUsuario);
router.get('/:id',          getUsuarioById);
router.put('/:id',          updateUsuario);
router.delete('/:id',       deleteSoftUsuario);

export default router;