import express from 'express';
import { adminController } from './admin__Controller';
const router = express.Router()

    router.get('/admin',adminController.getAllAdminController)

export const adminRouter = router 