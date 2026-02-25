import { type Request, type Response } from 'express';
import Habitantes from '../models/habitantes';


// ── CREATE ──────────────────────────────────────────
export const createHabitante = async (req: Request, res: Response): Promise<void> => {
try {
    const habitante = new Habitantes(req.body);
    const saved = await habitante.save(); // En el save esta el _id asignado por MongoDB
    res.status(201).json({ mensaje: 'Habitante creado', data: saved });

} catch (error) {
    res.status(400).json({ mensaje: 'Error al crear', error });
}
};

// ── READ (todos) ─────────────────────────────────────
//A pesar de que en el read no usamos el req lo tipamos pero silenciado con barra baja _
export const getallHabitante = async (_req: Request, res: Response): Promise<void> => {
try {
    const allHabitantes = await Habitantes.find({ activo: true });
    res.status(200).json(allHabitantes);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};


// ── READ (por ID) ────────────────────────────────────
//Accedemos al parametro de la request que traera la ID del habitante y lo devolvemos
export const getHabitanteById = async (req: Request, res: Response): Promise<void> => {
try {
    const getHabitante = await Habitantes.findById(req.params.id);
    if (!getHabitante) {
    res.status(404).json({ mensaje: 'Habitante no encontrado' });
    return;
    }
    res.status(200).json(getHabitante);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};


// ── UPDATE ───────────────────────────────────────────
//Con new: true devolvemos el documento ya actualizado
export const updateHabitante = async (req: Request, res: Response): Promise<void> => {
try {
    const updated = await Habitantes.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    if (!updated) {
    res.status(404).json({ mensaje: 'Habitante no encontrado' });
    return;
    }
    res.status(200).json({ mensaje: 'Habitante actualizado', data: updated });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar', error });
}
};


// ── DELETE (soft) ────────────────────────────────────

//Esta operacion Delete no borra permanente el habitante de la bbdd
//Simplemente cambia su estatus de activo a False para ya no mostrarlo en consultas
//! PENDIENTE 1 Hacer un delete Hard que si que si elimine de la bbdd
export const deletesoftHabitante = async (req: Request, res: Response): Promise<void> => {
try {
    const softDelete = await Habitantes.findByIdAndUpdate(
    req.params.id,
    { activo: false },
    { new: true }
    );
    if (!softDelete) {
    res.status(404).json({ mensaje: 'Habitante no encontrado' });
    return;
    }
    res.status(200).json({ mensaje: 'Habitante eliminado correctamente' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error });
}
};



//! ── CONSULTA ESPECIAL: buscar por sector ─────────────
//?EN CONTRUCCION CONSULTA ESPECIAL POR SECTORES 
//Devolvemos el largo de la lista para que el usuario no tenga que contarlo.
// export const buscarPorSector = async (req: Request, res: Response): Promise<void> => {
// try {
//     const { sector } = req.params;
//     const resultado = await habitantes.find({
//     'direccion.sector': sector,
//     activo: true
//     });
//     res.status(200).json({ total: resultado.length, data: resultado });
// } catch (error) {
//     res.status(500).json({ mensaje: 'Error en consulta', error });
// }
// };




