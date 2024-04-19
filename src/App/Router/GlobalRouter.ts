import express from 'express';
import { userRouter } from '../modules/User/user__Router';
import { adminRouter } from '../modules/Admin/admin_Router';
import { authRouter } from '../modules/Auth/auth__router';

const router = express.Router()

    const moduleRoute = [
        {path:"/user",routerData:userRouter},
        {path:"/admin",routerData:adminRouter},
        {path:"/auth",routerData:authRouter},
    ]

    moduleRoute.forEach(route => router.use(route.path,route.routerData))

export default router 