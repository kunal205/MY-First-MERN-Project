import env from 'dotenv';
export const app = express();
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/authRoutes.js'
import { userRouter } from './Routes/userRoutes.js';
import cors from "cors"
import productsRouter from './Routes/productsRoutes.js';
env.config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/products', productsRouter)