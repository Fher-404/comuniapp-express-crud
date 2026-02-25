import { Router } from 'express';
import {
createAyuda,
getAllAyudas,
getAyudaById,
updateAyuda,
deleteSoftAyuda,
getAyudasByTipo
} from '../controllers/ayudasController';

const router = Router();

router.get('/getall',       getAllAyudas);
router.get('/tipo/:tipo',   getAyudasByTipo);
router.post('/',            createAyuda);
router.get('/:id',          getAyudaById);
router.put('/:id',          updateAyuda);
router.delete('/:id',       deleteSoftAyuda);

export default router;