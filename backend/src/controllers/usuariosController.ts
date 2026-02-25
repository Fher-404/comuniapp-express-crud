import { type Request, type Response } from 'express';
import Usuarios from '../models/usuarios';

// ── CREATE ──────────────────────────────────────────
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
try {
    const usuario = new Usuarios(req.body);
    const saved = await usuario.save();
    res.status(201).json({ mensaje: 'Usuario creado', data: saved });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al crear', error });
}
};

// ── READ (todos) ─────────────────────────────────────
export const getAllUsuarios = async (_req: Request, res: Response): Promise<void> => {
try {
    const allUsuarios = await Usuarios.find({ activo: true });
    res.status(200).json(allUsuarios);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── READ (por ID) ────────────────────────────────────
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
try {
    const usuario = await Usuarios.findById(req.params.id);
    if (!usuario) {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
    return;
    }
    res.status(200).json(usuario);
} catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener', error });
}
};

// ── UPDATE ───────────────────────────────────────────
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
try {
    const updated = await Usuarios.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    );
    if (!updated) {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
    return;
    }
    res.status(200).json({ mensaje: 'Usuario actualizado', data: updated });
} catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar', error });
}
};

// ── DELETE (soft) ────────────────────────────────────
export const deleteSoftUsuario = async (req: Request, res: Response): Promise<void> => {
try {
    const softDelete = await Usuarios.findByIdAndUpdate(
    req.params.id,
    { activo: false },
    { new: true }
    );
    if (!softDelete) {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
    return;
    }
    res.status(200).json({ mensaje: 'Usuario desactivado correctamente' });
} catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error });
}
};

// ── CONSULTA ESPECIAL: buscar por rol ────────────────
export const getUsuariosByRol = async (req: Request, res: Response): Promise<void> => {
try {
    const { rol } = req.params;
    const resultado = await Usuarios.find({ rol: rol, activo: true });
    res.status(200).json({ total: resultado.length, data: resultado });
} catch (error) {
    res.status(500).json({ mensaje: 'Error en consulta', error });
}
};