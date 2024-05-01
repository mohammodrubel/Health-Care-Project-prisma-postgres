import express from 'express';
import { DoctorService } from './doctor__service';
import Auth from '../../Middleware/Auth';
import { User__Role } from '@prisma/client';
import { DoctorController } from './doctor__controller';
const router = express.Router()

    router.get('/',Auth(User__Role.SUPER_ADMIN,User__Role.ADMIN),DoctorController.getAllDoctor)
    router.get('/:id',Auth(User__Role.SUPER_ADMIN,User__Role.ADMIN),DoctorController.getSingleDoctor)
    router.delete('/:id',Auth(User__Role.SUPER_ADMIN,User__Role.ADMIN),DoctorController.deleteDoctor)
    router.put('/:id',Auth(User__Role.SUPER_ADMIN,User__Role.ADMIN),DoctorController.updateDoctor)

export const DoctorRouter = router 