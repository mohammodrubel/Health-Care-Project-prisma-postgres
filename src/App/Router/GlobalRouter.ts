import express from 'express';
import { userRouter } from '../modules/User/user__Router';
import { adminRouter } from '../modules/Admin/admin_Router';

const router = express.Router()

    const moduleRoute = [
        {path:"/user",routerData:userRouter},
        {path:"/admin",routerData:adminRouter},
    ]

    moduleRoute.forEach(route => router.use(route.path,route.routerData))

export default router 