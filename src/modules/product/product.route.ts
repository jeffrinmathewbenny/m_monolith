import { Router } from 'express';
import ProductController from './product.controller';

const router = Router();

router.get('/:productId', ProductController.getProduct);

export default router;
