import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import auth from '../middleware/authMiddleware.js';
import { listEventos, addEvento, deleteEvento, updateEvento } from '../controllers/agendaController.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'agenda',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage });

router.get('/', listEventos);
router.post('/', auth, upload.single('imagem'), addEvento);
router.put('/:id', auth, upload.single('imagem'), updateEvento);
router.delete('/:id', auth, deleteEvento);

export default router;