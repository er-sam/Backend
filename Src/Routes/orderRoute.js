import {Router} from 'express'
import {verifiedUser} from '../Middleware/verifyMiddleware.js'
import { orderCancelled, orderPlacemnents } from '../Controller/orderController.js';
const router = Router();





//------protected----
router.route('/placed').post(verifiedUser,orderPlacemnents);
router.route('/cancel').delete(verifiedUser,orderCancelled);
router.route('/view').get(verifiedUser,orderPlacemnents);


export default router