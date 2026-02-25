import express, { type Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

import habitanteRoutes from './routes/habitantesRoutes';
import ayudasRoutes            from './routes/ayudasRoutes';
import jornadasEventosRoutes   from './routes/jornadasEventosRoutes';
import reportesRoutes          from './routes/reportesComunitariosRoutes';
import usuariosRoutes          from './routes/usuariosRoutes';

dotenv.config();

const app: Application = express(); //Creamos la instacia de la aplicacon de express
const PORT = process.env.PORT || 3000; //Iniciamos el servidor de backend en el puerto definido en env o de lo contrario en 3000

app.use(cors()); //Deshabilitar el cors solo para que el frontend cuando este listo se pueda comunicar con el back
app.use(express.json()); // Convertir los req.body en json
app.use(express.urlencoded({ extended: true })); // Poder leer formularios correctamente

connectDB();

app.use('/habitantes',      habitanteRoutes); //Ruta principal de los controllers de habitantes.
app.use('/ayudas',             ayudasRoutes);
app.use('/jornadas-eventos',   jornadasEventosRoutes);
app.use('/reportes',           reportesRoutes);
app.use('/usuarios',           usuariosRoutes);


app.get('/', (_req, res) => {
res.json({ mensaje: 'Sistema Comuniapp funcionando correctamente' });
});

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});