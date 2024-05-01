import express, { NextFunction, Request, Response } from 'express';
import { specialitiesController } from './specialities__controller';
import { file__upload } from '../../Middleware/file__upload';
import { SpecialitiesValidation } from './specialities__zod_validation';
const router = express.Router()

    router.get('/',specialitiesController.getAllSpecialities)

    router.post('/create-specialities',file__upload.upload.single('file'),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body =  SpecialitiesValidation.CreateSpecialitiesValidation.parse(JSON.parse(req.body.data))
        return  specialitiesController.createSpecialities(req,res,next)
    });

    router.delete('/:id',specialitiesController.deleteSpecialities)
    router.get('/:id',specialitiesController.findSingleSpecialities)

    
export  const SpecialitiesRouter = router