import mongoose, { Schema, Document } from 'mongoose';

export interface IHabitantes extends Document {
primer_nombre: string;
segundo_nombre: string;
primer_apellido: string;
segundo_apellido: string;
fecha_nacimiento: Date;
genero: string;
telefono_celular: number;
telefono_local: number;
correo: string;
estado_civil: string;
direccion: {
    sector: string;
    calle: string;
    casa: string;
    punto_referencia: string;
};
discapacidad: {
    tiene_discapacidad: boolean;
    tipo: string;
    grado: string;
};
enfermedades_cronicas: string[];
nivel_instruccion: string;
ocupacion: string;
ingreso_mensual: number;
vivienda: {
    tipo_vivienda: string;
    condicion_vivienda: string;
    es_propia: boolean;
};
jefe_familia: boolean;
dependientes: {
    adultos_dependientes: string[];
    menores_dependientes: string[];
};
activo: boolean;
fecha_registro: Date;
registrado_por: string;
ultima_actualizacion: Date;
actualizado_por: string;
}

const HabitanteSchema: Schema = new Schema({
primer_nombre:    { type: String, required: true },
segundo_nombre:   { type: String },
primer_apellido:  { type: String, required: true },
segundo_apellido: { type: String },
fecha_nacimiento: { type: Date, required: true },
genero:           { type: String, required: true },
telefono_celular: { type: Number },
telefono_local:   { type: Number },
correo:           { type: String },
estado_civil:     { type: String },
direccion: {
    sector:           { type: String },
    calle:            { type: String },
    casa:             { type: String },
    punto_referencia: { type: String }
},
discapacidad: {
    tiene_discapacidad: { type: Boolean, default: false },
    tipo:               { type: String },
    grado:              { type: String }
},
enfermedades_cronicas: [{ type: String }],
nivel_instruccion:     { type: String },
ocupacion:             { type: String },
ingreso_mensual:       { type: Number },
vivienda: {
    tipo_vivienda:      { type: String },
    condicion_vivienda: { type: String },
    es_propia:          { type: Boolean, default: false }
},
jefe_familia: { type: Boolean, default: false },
dependientes: {
    adultos_dependientes: [{ type: String }],
    menores_dependientes: [{ type: String }]
},
activo:               { type: Boolean, default: true },
fecha_registro:       { type: Date, default: Date.now },
registrado_por:       { type: String },
ultima_actualizacion: { type: Date, default: Date.now },
actualizado_por:      { type: String }
});

export default mongoose.model<IHabitantes>('Habitantes', HabitanteSchema);