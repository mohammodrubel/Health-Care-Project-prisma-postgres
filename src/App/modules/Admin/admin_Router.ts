import express from 'express';
import { adminController } from './admin__Controller';
const router = express.Router()

    router.get('/admin',adminController.getAllAdminController)
    router.get('/admin/:id',adminController.getSinlgeId)
    router.patch('/admin/:id',adminController.updateAdminController)
    router.delete('/admin/:id',adminController.deleteAdminController)
    router.put('/admin/soft/:id',adminController.softAdminController)

export const adminRouter = router 