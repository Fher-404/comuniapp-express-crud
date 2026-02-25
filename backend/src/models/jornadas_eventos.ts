import mongoose, { Schema, Document } from 'mongoose';

export interface IJornadasEventos extends Document {
nombre_evento: string;
tipo_jornada: string;
descripcion: string;
fecha_inicio: Date;
sector_lugar: string;
estatus: string;
beneficios: string[];
beneficiarios_atendidos: string[];
registrado_por: string;
fecha_registro: Date;
ultima_actualizacion: Date;
actualizado_por: string;
}

const JornadasEventosSchema: Schema = new Schema({
nombre_evento:           { type: String, required: true },
tipo_jornada:            { type: String, required: true },
descripcion:             { type: String },
fecha_inicio:            { type: Date, required: true },
sector_lugar:            { type: String },
estatus: {
    type: String,
    enum: ['Programada', 'En curso', 'Finalizada', 'Cancelada'],
    default: 'Programada'
},
beneficios:              [{ type: String }],
beneficiarios_atendidos: [{ type: String }],
registrado_por:          { type: String },
fecha_registro:          { type: Date, default: Date.now },
ultima_actualizacion:    { type: Date, default: Date.now },
actualizado_por:         { type: String }
});

export default mongoose.model<IJornadasEventos>('jornadas_eventos', JornadasEventosSchema);