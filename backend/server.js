import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import carrouselRoutes from './routes/carrouselRoutes.js';
import agendaRoutes from './routes/agendaRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/carrousel', carrouselRoutes);
app.use('/api/agenda', agendaRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Servidor rodando na porta ' + process.env.PORT);
    });
  });
