import express from 'express';
import { generateImageController } from '../controllers/imageController.js';
import { enforceAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/generate-image', enforceAuth, generateImageController);

export default router;
