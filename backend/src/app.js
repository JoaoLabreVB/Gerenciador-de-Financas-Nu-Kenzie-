import express from 'express';
import cors from 'cors';
import authRoutes from './controllers/auth.js'
import taskRoutes from './middlewares/tasks.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
//Conectar MONGODB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});