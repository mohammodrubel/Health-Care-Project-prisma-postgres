import express from 'express';
import { adminController } from './admin__Controller';
import validation__requiest from '../../Middleware/validation__requiest';
import adminUPdateValidation from './update__zod__validation';
const router = express.Router()

    router.get('/',adminController.getAllAdminController)
    router.get('/:id',adminController.getSinlgeId)
    router.patch('/:id',validation__requiest(adminUPdateValidation),adminController.updateAdminController)
    router.delete('/:id',adminController.deleteAdminController)
    router.put('/soft/:id',adminController.softAdminController)

export const adminRouter = router 