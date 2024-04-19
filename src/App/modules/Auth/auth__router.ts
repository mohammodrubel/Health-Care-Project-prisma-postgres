import express from 'express';
import { AuthController } from './auth__controller';
const router = express.Router()


    router.post('/login',AuthController.loginUserController)
    router.post('/refresh-token',AuthController.refreshTokenUserController)

export const authRouter = router  