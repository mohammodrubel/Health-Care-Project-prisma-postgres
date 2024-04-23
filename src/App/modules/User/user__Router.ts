import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user__Controller";
import Auth from "../../Middleware/Auth";
import { User__Role } from "@prisma/client";
import { file__upload } from "../../Middleware/file__upload";
import { userValidation } from "./user__validation";
const router = express.Router();

router.get('/',Auth(User__Role.ADMIN,User__Role.SUPER_ADMIN),userController.getAllUserController)

router.post(
  "/create-admin",file__upload.upload.single('file'),
  Auth(User__Role.ADMIN, User__Role.SUPER_ADMIN),
(req:Request,res:Response,next:NextFunction)=>{
    req.body =  userValidation.createAdminValidation.parse(JSON.parse(req.body.data))
    return  userController.createAdminController(req,res,next)
});

router.post(
  "/create-doctor",file__upload.upload.single('file'),
  Auth(User__Role.ADMIN, User__Role.SUPER_ADMIN),
(req:Request,res:Response,next:NextFunction)=>{
    req.body =  userValidation.doctorZodValidation.parse(JSON.parse(req.body.data))
    return  userController.createDoctorController(req,res,next)
});

router.post(
  "/create-patient",file__upload.upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{
    req.body =  userValidation.PatientZodValidation.parse(JSON.parse(req.body.data))
    return  userController.createPatientDoctorController(req,res,next)
});

router.patch('/:id/status',Auth(User__Role.ADMIN,User__Role.SUPER_ADMIN),userController.updateUserController)


export const userRouter = router;
