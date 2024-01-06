import {Router} from 'express'
import { registerUser,loginController, logoutUser, changePassword } from '../Controller/UserController.js';
const router = Router();


router.route('/register').post(registerUser);
router.route('/login').get(loginController);
router.route('/logout').get(logoutUser);
router.route('/change-password').get(changePassword);



export default router 