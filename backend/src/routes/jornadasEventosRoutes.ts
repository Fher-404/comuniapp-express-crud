import { Router } from 'express';
import {
createJornada,
getAllJornadas,
getJornadaById,
updateJornada,
deleteSoftJornada,
getJornadasByEstatus
} from '../controllers/jornadasEventosController';

const router = Router();

router.get('/getall',             getAllJornadas);
router.get('/estatus/:estatus',   getJornadasByEstatus);
router.post('/',                  createJornada);
router.get('/:id',                getJornadaById);
router.put('/:id',                updateJornada);
router.delete('/:id',             deleteSoftJornada);

export default router;