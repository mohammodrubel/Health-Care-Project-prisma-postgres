import express, { Request, Response } from 'express';
import { UserService } from './user__Service';
const createAdminController = async(req:Request,res:Response)=>{
    try{
        const result = await UserService.createAdminService(req.body)
        res.send(result)
    }
    catch(error){
        console.log(error)
    }
}


export const userController = {
    createAdminController
}