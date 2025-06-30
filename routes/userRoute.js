import express from 'express';
import {resendOTP, sendOTP, verifyOTP} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/sendOTP', sendOTP)
userRouter.post('/verifyOTP',verifyOTP)
userRouter.post('/resendOTP',resendOTP)

export default userRouter;
