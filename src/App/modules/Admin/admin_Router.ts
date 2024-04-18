import express from 'express';
import { adminController } from './admin__Controller';
const router = express.Router()

    router.get('/',adminController.getAllAdminController)
    router.get('/:id',adminController.getSinlgeId)
    router.patch('/:id',adminController.updateAdminController)
    router.delete('/:id',adminController.deleteAdminController)
    router.put('/soft/:id',adminController.softAdminController)

export const adminRouter = router 