import express from 'express';
import { ScheduleController } from './schedule__controller';
const router = express.Router()

   router.post('/',ScheduleController.createScheduleController)
   router.get('/',ScheduleController.getAllScheduleController)
   router.get('/:id',ScheduleController.getSingleScheduleController)
   router.put('/:id',ScheduleController.updateScheduleController)
   router.delete('/:id',ScheduleController.deleteScheduleController)

export const ScheduleRouter = router 