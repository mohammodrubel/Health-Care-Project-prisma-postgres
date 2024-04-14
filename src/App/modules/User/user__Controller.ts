import express, { Request, Response } from 'express';
import { UserService } from './user__Service';
const createAdminController = async(req:Request,res:Response)=>{
    try{
        const result = await UserService.createAdminService(req.body)
        res.status(200).json({
            success:true,
            messege:"admin created Successfully",
            data:result
        })
    }
    catch(error){
        res.status(500).json({
            success:true,
            messege:error?.name || "somting went wrong",
            error
        })
    }
}


export const userController = {
    createAdminController
}