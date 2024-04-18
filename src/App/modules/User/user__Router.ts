import express, { Request, Response } from 'express';
import { userController } from './user__Controller';
const router = express.Router()

    router.post('/create-admin',userController.createAdminController)

export const userRouter = router  