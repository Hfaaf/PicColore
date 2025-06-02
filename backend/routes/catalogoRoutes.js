import express from 'express';
import multer from 'multer';
import auth from '../middleware/authMiddleware.js';
import { 
    listCatalogo, 
    addCatalogo, 
    deleteCatalogo, 
    updateCatalogo,
    updateOrder 
} from '../controllers/catalogoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', listCatalogo);
router.post('/', auth, upload.single('imagem'), addCatalogo);
router.delete('/:id', auth, deleteCatalogo);
router.put('/:id', auth, upload.single('imagem'), updateCatalogo);
router.put('/order', auth, updateOrder);

export default router;