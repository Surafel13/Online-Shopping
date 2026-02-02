import express from 'express';
import { createProduct, updateProduct,deleteProduct,getAllProducts, getProductById} from '../controller/ProductController.js';

const router = express.Router();

router.post('/create-product', createProduct);
router.put('/update-product/:productId', updateProduct);
router.get('/products', getAllProducts);
router.post('/product', getProductById);
router.post('/delete-product', deleteProduct);

export default router;