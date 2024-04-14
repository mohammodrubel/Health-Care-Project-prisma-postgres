import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin_Service"
import pick from "../../shared/pick"
import { adminFilterableFields } from "./admin__constant"

const getAllAdminController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const filterData =pick(req.query,adminFilterableFields)
        const result = await adminService.getAllAdminService(filterData)
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