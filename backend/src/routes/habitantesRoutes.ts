import { Router } from 'express';
import {
createHabitante,
getallHabitante,
getHabitanteById,
updateHabitante,
deletesoftHabitante
} from '../controllers/habitantesControllers';

const router = Router();

router.post('/',        createHabitante);
router.get('/getall',         getallHabitante);
// router.get('/sector/:sector',     buscarPorSector); //! En contruccion!
router.get('/getone/:id',      getHabitanteById);
router.put('/:id',      updateHabitante);
router.delete('/:id',   deletesoftHabitante);
export default router;