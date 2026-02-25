import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = process.env.MONGODB_URI as string; // Lee el archivo el archivo

const connectDB = async (): Promise<void> => {
try {
    await mongoose.connect(mongoURI);
    console.log(`Conectado a MongoDB exitosamente en el puerto: ${process.env.PORT}`);
} catch (error) {
    console.error(' Error conectando a MongoDB:', error);
    process.exit(1); //Indicamos que el programa termino con errores 0 es con exito
}
};
export default connectDB;