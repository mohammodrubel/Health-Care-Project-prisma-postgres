import express from 'express';
import { PatientController } from './patient__controller';
const router = express.Router()

    router.get('/',PatientController.getAllPatientController)
    router.get('/:id',PatientController.getSinglePatientController)
    router.delete('/:id',PatientController.deleteSinglePatientController)
    router.put('/:id',PatientController.updatedSinglePatientController)
    router.delete('/soft/:id',PatientController.softDeleteSinglePatientController)

export const PatientRouter = router 