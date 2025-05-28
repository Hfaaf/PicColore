import express from 'express';
import multer from 'multer';
import auth from '../middleware/authMiddleware.js';
import { listEventos, addEvento, deleteEvento, updateEvento } from '../controllers/agendaController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', listEventos);
router.post('/', auth, upload.single('imagem'), addEvento);
router.put('/:id', auth, upload.single('imagem'), updateEvento); // <--- rota de edição
router.delete('/:id', auth, deleteEvento);

export default router;