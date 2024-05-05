import express from 'express';
import { PatientController } from './patient__controller';
const router = express.Router()

    router.get('/',PatientController.getAllPatientController)

export const PatientRouter = router 