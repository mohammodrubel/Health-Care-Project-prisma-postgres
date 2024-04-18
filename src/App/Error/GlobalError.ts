import { NextFunction, Request, Response } from "express";
import SendResponce from "../shared/SendResponce";
import httpStatus from "http-status";

const globalErrorHandeler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    SendResponce(res,{
        statusCode:httpStatus.INTERNAL_SERVER_ERROR,
        success:false,
        message:err?.message || "somthing went wrong",
        data:err
    })
}

export default globalErrorHandeler