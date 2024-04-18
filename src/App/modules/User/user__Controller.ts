import express, { NextFunction, Request, Response } from 'express';
import { UserService } from './user__Service';
import SendResponce from '../../shared/SendResponce';
import httpStatus from 'http-status';
const createAdminController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await UserService.createAdminService(req.body)
        SendResponce(res,{
            statusCode:httpStatus.CREATED,
            success:true,
            message:"user created Successfully",
            data:result
        })
    }
    catch(error){
        next(error)
    }
}


export const userController = {
    createAdminController
}