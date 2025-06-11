import express, {Application} from 'express';
import dotenv from 'dotenv';
import { productsRouter } from './routes/productsRoutes';
import { authRouter } from './routes/authRoutes';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(express.json());

app.use("/api", productsRouter );
app.use("/api/auth", authRouter );

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});