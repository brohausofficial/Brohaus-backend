import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import onlyAdminAccess from '../middleware/onlyAdminAccess.js';
import authUser from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post('/add',authUser, onlyAdminAccess,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove', authUser, onlyAdminAccess,removeProduct);
productRouter.post('/single', authUser, singleProduct);
productRouter.get('/list', authUser, listProducts)

export default productRouter
