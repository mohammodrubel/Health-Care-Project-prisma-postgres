import express, { NextFunction, Request, Response } from "express";
import { UserService } from "./user__Service";
import SendResponce from "../../shared/SendResponce";
import httpStatus from "http-status";
import Catch__async from "../../Middleware/Catch__Async";
const createAdminController = Catch__async(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createAdminService(req.body);
    SendResponce(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "user created Successfully",
      data: result,
    });
  }
);

export const userController = {
  createAdminController,
};
