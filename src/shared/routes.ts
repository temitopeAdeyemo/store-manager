import { Router } from 'express';
import authRoute from '../modules/auth/routes/auth.routes';
import categoryRoute from '../modules/category/routes/category.routes';
import productRoute from '../modules/products/routes/product.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);

export default router;
