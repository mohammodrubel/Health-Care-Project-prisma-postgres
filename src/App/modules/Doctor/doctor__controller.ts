import httpStatus from "http-status";
import Catch__async from "../../Middleware/Catch__Async";
import pick from "../../shared/pick";
import SendResponce from "../../shared/SendResponce";
import { doctorFilterableFields } from "./doctor__constant";
import { DoctorService } from "./doctor__service";

const getAllDoctor = Catch__async(async (req, res, next) => {
  const filterData = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await DoctorService.getAllDoctorService(filterData, options);
  SendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "all Doctor showen successfully",
    data: result,
  });
});
const getSingleDoctor = Catch__async(async (req, res, next) => {
    const id = req.params.id
    const result = await DoctorService.getSingleDoctorService(id)
    SendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get Single Doctor showen successfully",
        data: result,
      });
});
const deleteDoctor = Catch__async(async (req, res, next) => {
    const id = req.params.id
    const result = await DoctorService.deleteDoctorService(id)
    SendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "delete doctor successfully",
        data: result,
      });
});

const updateDoctor = Catch__async(async(req,res,next)=>{
  const id = req.params.id 
  const result = await DoctorService.updateDoctorservice(id,req.body)
  SendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "update doctor successfully",
      data: result,
    });
})

export const DoctorController = {
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
  updateDoctor
};
