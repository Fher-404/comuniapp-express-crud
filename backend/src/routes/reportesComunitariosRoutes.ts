import { Router } from 'express';
import {
createReporte,
getAllReportes,
getReporteById,
updateReporte,
deleteSoftReporte,
getReportesByPrioridad
} from '../controllers/reportesComunitariosController';

const router = Router();

router.get('/getall',                   getAllReportes);
router.get('/prioridad/:prioridad',     getReportesByPrioridad);
router.post('/',                        createReporte);
router.get('/:id',                      getReporteById);
router.put('/:id',                      updateReporte);
router.delete('/:id',                   deleteSoftReporte);

export default router;