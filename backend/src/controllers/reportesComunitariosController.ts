import { type Request, type Response } from 'express';
import ReportesComunitarios from '../models/reportes_comunitarios';

// ── CREATE ──────────────────────────────────────────
export const createReporte = async (req: Request, res: Response): Promise<void> => {
try {
    const reporte = new ReportesComunitarios(req.body);
    const saved = await reporte.save();
    res.status(201).json({ mensaje: 'Reporte creado', data: saved });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al crear', error });
}
};

// ── READ (todos) ─────────────────────────────────────
export const getAllReportes = async (_req: Request, res: Response): Promise<void> => {
try {
    const allReportes = await ReportesComunitarios.find();
    res.status(200).json(allReportes);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── READ (por ID) ────────────────────────────────────
export const getReporteById = async (req: Request, res: Response): Promise<void> => {
try {
    const reporte = await ReportesComunitarios.findById(req.params.id);
    if (!reporte) {
    res.status(404).json({ mensaje: 'Reporte no encontrado' });
    return;
    }
    res.status(200).json(reporte);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── UPDATE ───────────────────────────────────────────
export const updateReporte = async (req: Request, res: Response): Promise<void> => {
try {
    const updated = await ReportesComunitarios.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    if (!updated) {
    res.status(404).json({ mensaje: 'Reporte no encontrado' });
    return;
    }
    res.status(200).json({ mensaje: 'Reporte actualizado', data: updated });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar', error });
}
};

// ── DELETE (soft) ────────────────────────────────────
export const deleteSoftReporte = async (req: Request, res: Response): Promise<void> => {
try {
    const softDelete = await ReportesComunitarios.findByIdAndUpdate(
    req.params.id,
    { estatus: 'Cerrado' },
    { new: true }
    );
    if (!softDelete) {
    res.status(404).json({ mensaje: 'Reporte no encontrado' });
    return;
    }
    res.status(200).json({ mensaje: 'Reporte cerrado correctamente' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error });
}
};

// ── CONSULTA ESPECIAL: buscar por prioridad ──────────
export const getReportesByPrioridad = async (req: Request, res: Response): Promise<void> => {
try {
    const { prioridad } = req.params;
    const resultado = await ReportesComunitarios.find({
    prioridad: prioridad,
    estatus: { $ne: 'Cerrado' }
    });
    res.status(200).json({ total: resultado.length, data: resultado });
} catch (error) {
    res.status(500).json({ mensaje: 'Error en consulta', error });
}
};