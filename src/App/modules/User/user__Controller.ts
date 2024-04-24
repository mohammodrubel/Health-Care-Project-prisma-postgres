import express, { NextFunction, Request, Response } from "express";
import { UserService } from "./user__Service";
import SendResponce from "../../shared/SendResponce";
import httpStatus from "http-status";
import Catch__async from "../../Middleware/Catch__Async";
import pick from "../../shared/pick";
import { userFilterField } from "./user_searchable_field";


const createAdminController = Catch__async(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createAdminService(req);
    SendResponce(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "user created Successfully",
      data: result,
    });
  }
);
const createDoctorController = Catch__async(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createDoctorService(req);
    SendResponce(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Doctor created Successfully",
      data: result,
    });
  }
);

const createPatientDoctorController = Catch__async(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.patientDoctorService(req);
    SendResponce(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Patient created Successfully",
      data: result,
    });
  }
);

const getAllUserController = Catch__async(async (req:Request,res:Response,next:NextFunction) => {
  const filterData = pick(req.query, userFilterField);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getAllUserService(filterData, options);
  SendResponce(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"all User showen successfully",
    data:result
  })
})

const updateUserController = Catch__async(async (req:Request,res:Response,next:NextFunction) => {
    const id = req.params.id
  const result = await UserService.updateUserService(id,req.body);
  SendResponce(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"update user successfully",
    data:result
  })
})
const getMyProfieController = Catch__async(async (req:Request ,res:Response,next:NextFunction) => {
  const userProfile = req.user
  const result = await UserService.getMyPfofile(userProfile);
  SendResponce(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"get your successfully",
    data:result
  })
})

export const userController = {
  createAdminController,
  createDoctorController,
  createPatientDoctorController,
  getAllUserController,
  updateUserController,
  getMyProfieController
};
