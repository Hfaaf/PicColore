import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import auth from '../middleware/authMiddleware.js';
import { uploadImage, listImages, deleteImage } from '../controllers/carrouselController.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'carrousel',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage });

router.get('/', listImages);
router.post('/', auth, upload.single('image'), uploadImage);
router.delete('/:id', auth, deleteImage);

export default router;