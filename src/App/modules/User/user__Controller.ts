import express, { NextFunction, Request, Response } from "express";
import { UserService } from "./user__Service";
import SendResponce from "../../shared/SendResponce";
import httpStatus from "http-status";
import Catch__async from "../../Middleware/Catch__Async";


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

export const userController = {
  createAdminController,
  createDoctorController,
  createPatientDoctorController
};
