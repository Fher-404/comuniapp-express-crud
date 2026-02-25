import mongoose, { Schema, Document } from 'mongoose';

export interface IReportesComunitarios extends Document {
tipo_incidencia: string;
descripcion: string;
sector: string;
estatus: string;
prioridad: string;
reportado_por: string;
fecha_creacion: Date;
evidencia: string;
fecha_resolucion: Date;
resuelto_por: string;
observaciones: string;
}

const ReportesComunitariosSchema: Schema = new Schema({
tipo_incidencia: { type: String, required: true },
descripcion:     { type: String, required: true },
sector:          { type: String, required: true },
estatus: {
    type: String,
    enum: ['Abierto', 'En proceso', 'Resuelto', 'Cerrado'],
    default: 'Abierto'
},
prioridad: {
    type: String,
    enum: ['Alta', 'Media', 'Baja'],
    default: 'Media'
},
reportado_por:    { type: String },
fecha_creacion:   { type: Date, default: Date.now },
evidencia:        { type: String, default: '' },
fecha_resolucion: { type: Date },
resuelto_por:     { type: String },
observaciones:    { type: String }
});

export default mongoose.model<IReportesComunitarios>('reportes_comunitarios', ReportesComunitariosSchema);