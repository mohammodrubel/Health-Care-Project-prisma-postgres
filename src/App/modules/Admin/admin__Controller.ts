import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin_Service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin__constant";
import SendResponce from "../../shared/SendResponce";
import httpStatus from 'http-status'

const getAllAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterData = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await adminService.getAllAdminService(filterData, options);
    SendResponce(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"all admin showen successfully",
      data:result
    })
  } catch (error) {
   next(error)
  }
};

const getSinlgeId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.getSingleId(id);
    SendResponce(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Single Admin Show Successfully",
      data:result
    })
  } catch (error) {
    next(error)
  }
};

const updateAdminController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body 
    const result = await adminService.updateAdminService(id,data);
    SendResponce(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Single Admin update Successfully",
      data:result
    })
  } catch (error) {
    next(error)
  }
};

const softAdminController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.softDeleteAdminService(id);
    SendResponce(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Single Admin Delete Successfully",
      data:result
    })
  } catch (error) {
    next(error)
  }
};
const deleteAdminController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteAdminService(id);
    SendResponce(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"Single Admin Delete Successfully",
      data:result
    })
  } catch (error) {
    next(error)
  }
};



export const adminController = {
  getAllAdminController,
  getSinlgeId,
  updateAdminController,
  deleteAdminController,
  softAdminController
};
