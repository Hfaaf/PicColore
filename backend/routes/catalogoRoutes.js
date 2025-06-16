import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import auth from '../middleware/authMiddleware.js';
import { 
    listCatalogo, 
    addCatalogo, 
    deleteCatalogo, 
    updateCatalogo,
} from '../controllers/catalogoController.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'catalogo',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage });

router.get('/', listCatalogo);
router.post('/', auth, upload.single('imagem'), addCatalogo);
router.delete('/:id', auth, deleteCatalogo);
router.put('/:id', auth, upload.single('imagem'), updateCatalogo);

export default router;