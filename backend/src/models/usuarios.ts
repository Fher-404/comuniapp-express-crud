import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuarios extends Document {
nombre: string;
apellido: string;
correo: string;
contrasena: string;
rol: string;
activo: boolean;
fecha_registro: Date;
ultima_actualizacion: Date;
}

const UsuariosSchema: Schema = new Schema({
nombre:    { type: String, required: true },
apellido:  { type: String, required: true },
correo:    { type: String, required: true, unique: true },
contrasena:{ type: String, required: true },
rol: {
    type: String,
    enum: ['admin', 'operador', 'consulta'],
    default: 'consulta'
},
activo:               { type: Boolean, default: true },
fecha_registro:       { type: Date, default: Date.now },
ultima_actualizacion: { type: Date, default: Date.now }
});

export default mongoose.model<IUsuarios>('usuarios', UsuariosSchema);