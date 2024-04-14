import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin_Service"

const getAllAdminController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await adminService.getAllAdminService(req.query)
        res.status(200).json({
            success:true,
            messege:"admin created Successfully",
            data:result
        })
    }
    catch(error){
        res.status(500).json({
            success:true,
            messege: "somting went wrong",
            error
        })
    }
}



export const adminController = {
    getAllAdminController
}