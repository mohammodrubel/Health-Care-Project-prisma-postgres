import express from 'express';
import { PatientController } from './patient__controller';
const router = express.Router()

    router.get('/',PatientController.getAllPatientController)
    router.get('/:id',PatientController.getSinglePatientController)
    router.delete('/:id',PatientController.deleteSinglePatientController)
    router.put('/:id',PatientController.updatedSinglePatientController)

export const PatientRouter = router 