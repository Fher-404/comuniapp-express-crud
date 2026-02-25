import mongoose, { Schema, Document } from 'mongoose';

export interface IAyudas extends Document {
codigo_ayuda: string;
tipo: string;
nombre: string;
descripcion: string;
unidad_medida: string;
proveedor: string;
condiciones_entrega: string[];
activo: boolean;
disponibilidad: number;
prioridad_distribucion: string;
requisitos_especiales: string[];
almacenamiento: {
    ubicacion: string;
    condiciones: string;
    responsable: string;
};
registrado_por: string;
fecha_registro: Date;
ultima_actualizacion: Date;
actualizado_por: string;
}

const AyudasSchema: Schema = new Schema({
codigo_ayuda:           { type: String, required: true, unique: true },
tipo:                   { type: String, required: true },
nombre:                 { type: String, required: true },
descripcion:            { type: String },
unidad_medida:          { type: String },
proveedor:              { type: String },
condiciones_entrega:    [{ type: String }],
activo:                 { type: Boolean, default: true },
disponibilidad:         { type: Number, default: 0 },
prioridad_distribucion: { type: String, enum: ['alta', 'media', 'baja'], default: 'media' },
requisitos_especiales:  [{ type: String }],
almacenamiento: {
    ubicacion:   { type: String },
    condiciones: { type: String },
    responsable: { type: String }
},
registrado_por:       { type: String },
fecha_registro:       { type: Date, default: Date.now },
ultima_actualizacion: { type: Date, default: Date.now },
actualizado_por:      { type: String }
});

export default mongoose.model<IAyudas>('ayudas', AyudasSchema);