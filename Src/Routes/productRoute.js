import {Router} from 'express'
import {verifiedUser} from '../Middleware/verifyMiddleware.js'
import { addCatrgory, addProduct } from '../Controller/productController.js';
import { upload } from '../Middleware/Multer.js';
const router = Router();


//------category----
router.route('/').post(verifiedUser,addCatrgory);
// router.route('/cancel').delete(verifiedUser,orderCancelled);

//------product-----
router.route('/add').post(verifiedUser,upload.single("image"),addProduct);


export default router