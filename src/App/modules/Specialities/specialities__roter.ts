import express, { NextFunction, Request, Response } from 'express';
import { specialitiesController } from './specialities__controller';
import { file__upload } from '../../Middleware/file__upload';
const router = express.Router()

    router.post('/create-specialities',file__upload.upload.single('file'),
    (req:Request,res:Response,next:NextFunction)=>{
        req.body =  JSON.parse(req.body.data)
        return  specialitiesController.createSpecialities(req,res,next)
    });
export  const SpecialitiesRouter = router