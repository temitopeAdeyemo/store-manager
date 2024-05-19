import { Router } from 'express';
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers';
import auth from '../../../shared/middlewares/auth';
import createCategoryValidator from '../../category/validators/createCategory.validator';
import deleteCategoryValidator from '../validators/deleteCategory.validator';
import updateCategoryValidator from '../validators/updateCategory.validator';
import { getManyValidator, getOneValidator } from '../validators/getCategory.validator';

const router = Router();

router.post('/create', createCategoryValidator, auth, createCategory.create);
router.delete('/delete', deleteCategoryValidator, auth, deleteCategory.delete);
router.patch('/update', updateCategoryValidator, auth, updateCategory.update);
router.get('/single', getOneValidator, auth, getCategory.fetchOne);
router.get('/all', getManyValidator, auth, getCategory.fetchAll);

export default router;
