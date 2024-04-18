import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        status:false,
        message:"api not found",
        error:{
            path:req.originalUrl,
            message:"your requiest path is not found"
        }
    })
}

export default notFound