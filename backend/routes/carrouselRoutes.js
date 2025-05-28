import express from 'express';
import multer from 'multer';
import auth from '../middleware/authMiddleware.js';
import { uploadImage, listImages, deleteImage } from '../controllers/carrouselController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', listImages);
router.post('/', auth, upload.single('image'), uploadImage);
router.delete('/:id', auth, deleteImage);

export default router;
