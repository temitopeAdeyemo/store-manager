import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers';
import auth from '../../../shared/middlewares/auth';
import createProductValidator from '../validators/createProduct.validator';
import deleteProductValidator from '../validators/deleteProduct.validator';
import updateProductValidator from '../validators/updateProduct.validator';
import { getManyValidator, getOneValidator } from '../validators/getProduct.validator';

const router = Router();

router.post('/create', createProductValidator, auth, createProduct.create);
router.delete('/delete/:product_id', deleteProductValidator, auth, deleteProduct.delete);
router.patch('/update/:product_id', updateProductValidator, auth, updateProduct.update);
router.get('/single', getOneValidator, auth, getProduct.fetchOne);
router.get('/all', getManyValidator, auth, getProduct.fetchAll);

export default router;
