import { type Request, type Response } from 'express';
import JornadasEventos from '../models/jornadas_eventos';

// ── CREATE ──────────────────────────────────────────
export const createJornada = async (req: Request, res: Response): Promise<void> => {
try {
    const jornada = new JornadasEventos(req.body);
    const saved = await jornada.save();
    res.status(201).json({ mensaje: 'Jornada creada', data: saved });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al crear', error });
}
};

// ── READ (todos) ─────────────────────────────────────
export const getAllJornadas = async (_req: Request, res: Response): Promise<void> => {
try {
    const allJornadas = await JornadasEventos.find();
    res.status(200).json(allJornadas);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── READ (por ID) ────────────────────────────────────
export const getJornadaById = async (req: Request, res: Response): Promise<void> => {
try {
    const jornada = await JornadasEventos.findById(req.params.id);
    if (!jornada) {
    res.status(404).json({ mensaje: 'Jornada no encontrada' });
    return;
    }
    res.status(200).json(jornada);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── UPDATE ───────────────────────────────────────────
export const updateJornada = async (req: Request, res: Response): Promise<void> => {
try {
    const updated = await JornadasEventos.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    if (!updated) {
    res.status(404).json({ mensaje: 'Jornada no encontrada' });
    return;
    }
    res.status(200).json({ mensaje: 'Jornada actualizada', data: updated });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar', error });
}
};

// ── DELETE (soft) ────────────────────────────────────
export const deleteSoftJornada = async (req: Request, res: Response): Promise<void> => {
try {
    const softDelete = await JornadasEventos.findByIdAndUpdate(
    req.params.id,
    { estatus: 'Cancelada' },
    { new: true }
    );
    if (!softDelete) {
    res.status(404).json({ mensaje: 'Jornada no encontrada' });
    return;
    }
    res.status(200).json({ mensaje: 'Jornada cancelada correctamente' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error });
}
};

// ── CONSULTA ESPECIAL: buscar por estatus ────────────
export const getJornadasByEstatus = async (req: Request, res: Response): Promise<void> => {
try {
    const { estatus } = req.params;
    const resultado = await JornadasEventos.find({ estatus: estatus });
    res.status(200).json({ total: resultado.length, data: resultado });
} catch (error) {
    res.status(500).json({ mensaje: 'Error en consulta', error });
}
};