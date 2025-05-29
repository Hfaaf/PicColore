import express from 'express';
import multer from 'multer';
import auth from '../middleware/authMiddleware.js';
import { listCatalogo, addCatalogo, deleteCatalogo, updateCatalogo } from '../controllers/catalogoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', auth, listCatalogo);
router.post('/', auth, upload.single('imgsUrl'), addCatalogo);
router.delete('/:id', auth, deleteCatalogo);
router.put('/:id', auth, upload.single('imgsUrl'), updateCatalogo);

export default router;
