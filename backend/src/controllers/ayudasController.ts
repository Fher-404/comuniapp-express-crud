import { type Request, type Response } from 'express';
import Ayudas from '../models/ayudas';

// ── CREATE ──────────────────────────────────────────
export const createAyuda = async (req: Request, res: Response): Promise<void> => {
try {
    const ayuda = new Ayudas(req.body);
    const saved = await ayuda.save();
    res.status(201).json({ mensaje: 'Ayuda creada', data: saved });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al crear', error });
}
};

// ── READ (todos) ─────────────────────────────────────
export const getAllAyudas = async (_req: Request, res: Response): Promise<void> => {
try {
    const allAyudas = await Ayudas.find({ activo: true });
    res.status(200).json(allAyudas);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── READ (por ID) ────────────────────────────────────
export const getAyudaById = async (req: Request, res: Response): Promise<void> => {
try {
    const ayuda = await Ayudas.findById(req.params.id);
    if (!ayuda) {
    res.status(404).json({ mensaje: 'Ayuda no encontrada' });
    return;
    }
    res.status(200).json(ayuda);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── UPDATE ───────────────────────────────────────────
export const updateAyuda = async (req: Request, res: Response): Promise<void> => {
try {
    const updated = await Ayudas.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    if (!updated) {
    res.status(404).json({ mensaje: 'Ayuda no encontrada' });
    return;
    }
    res.status(200).json({ mensaje: 'Ayuda actualizada', data: updated });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar', error });
}
};

// ── DELETE (soft) ────────────────────────────────────
export const deleteSoftAyuda = async (req: Request, res: Response): Promise<void> => {
try {
    const softDelete = await Ayudas.findByIdAndUpdate(
    req.params.id,
    { activo: false },
    { new: true }
    );
    if (!softDelete) {
    res.status(404).json({ mensaje: 'Ayuda no encontrada' });
    return;
    }
    res.status(200).json({ mensaje: 'Ayuda eliminada correctamente' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error });
}
};

// ── CONSULTA ESPECIAL: buscar por tipo ───────────────
export const getAyudasByTipo = async (req: Request, res: Response): Promise<void> => {
try {
    const { tipo } = req.params;
    const resultado = await Ayudas.find({ tipo: tipo, activo: true });
    res.status(200).json({ total: resultado.length, data: resultado });
} catch (error) {
    res.status(500).json({ mensaje: 'Error en consulta', error });
}
};