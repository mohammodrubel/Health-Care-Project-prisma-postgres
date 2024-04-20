import { NextFunction, Request, Response } from "express";
import Catch__async from "../../Middleware/Catch__Async";
import { AuthService } from "./auth__service";
import SendResponce from "../../shared/SendResponce";
import httpStatus from "http-status";

const loginUserController = Catch__async(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await AuthService.loginUserService(req.body)
    const {refreshToken} = result
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:false
    })
    SendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"login successfull",
        data:{
            accessToken : result.accessToken,
            needPasswordChange:result.needPasswordChange
        }
    })
})

const refreshTokenUserController = Catch__async(async(req:Request,res:Response,next:NextFunction)=>{
    const {refreshToken} = req.cookies 
    const result = await AuthService.refreshToken(refreshToken)
    SendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"login successfull",
        data:result
    })
})
const changePasswordUserController = Catch__async(async(req:Request,res:Response,next:NextFunction)=>{
    const user = req?.user 
    const passwordChangeData = req.body
    const result = await AuthService.changePassword(user,passwordChangeData)
    SendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"login successfull",
        data:result
    })
})

export const AuthController  ={
    loginUserController,
    refreshTokenUserController,
    changePasswordUserController
}