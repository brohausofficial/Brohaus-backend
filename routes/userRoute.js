import express from 'express';
import {sendOTP, verifyOTP} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/sendOTP', sendOTP)
userRouter.post('/verifyOTP',verifyOTP)

export default userRouter;
