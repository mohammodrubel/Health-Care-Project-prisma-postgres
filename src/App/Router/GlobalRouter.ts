import express from 'express';
import { userRouter } from '../modules/User/user__Router';
import { adminRouter } from '../modules/Admin/admin_Router';
import { authRouter } from '../modules/Auth/auth__router';
import { SpecialitiesRouter } from '../modules/Specialities/specialities__router';
import { DoctorRouter } from '../modules/Doctor/doctor__router';
import { PatientRouter } from '../modules/Patient/patient__router';
import { ScheduleRouter } from '../modules/Schedule/schedule__router';

const router = express.Router()

    const moduleRoute = [
        {path:"/user",routerData:userRouter},
        {path:"/admin",routerData:adminRouter},
        {path:"/auth",routerData:authRouter},
        {path:"/specialities",routerData:SpecialitiesRouter},
        {path:"/doctor",routerData:DoctorRouter},
        {path:"/patient",routerData:PatientRouter},
        {path:"/schedule",routerData:ScheduleRouter},
    ]

    moduleRoute.forEach(route => router.use(route.path,route.routerData))

export default router 