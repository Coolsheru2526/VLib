import express from 'express';
import { login, logoutUser, userRegister } from '../controllers/userController.js';
const router = express.Router();


router.post('/register',userRegister);
router.post("/login",login);
router.post('/logout',logoutUser);

export default router; 