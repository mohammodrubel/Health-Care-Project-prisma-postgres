import httpStatus from "http-status";
import Catch__async from "../../Middleware/Catch__Async";
import SendResponce from "../../shared/SendResponce";
import { PatientService } from "./patient__service";
import pick from "../../shared/pick";
import { patientFilterableFields } from "./patient__constant";


const getAllPatientController = Catch__async(async (req, res, next) => {
    const filterData = pick(req.query, patientFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await PatientService.getAllPatientService(filterData, options);
    SendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "all Doctor showen successfully",
      data: result,
    });
  });
const getSinglePatientController = Catch__async(async (req, res, next) => {
    const {id} = req.params
    const result = await PatientService.getSinglePatientService(id);
    SendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "single Patient Data showen successfully",
      data: result,
    });
  });
const deleteSinglePatientController = Catch__async(async (req, res, next) => {
    const {id} = req.params
    const result = await PatientService.deletePatientService(id);
    SendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "single Patient Data showen successfully",
      data: result,
    });
  });
const updatedSinglePatientController = Catch__async(async (req, res, next) => {
    const {id} = req.params
    const result = await PatientService.updatePatientService(id,req.body);
    SendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Updated Patient Data  successfully",
      data: result,
    });
  });


  export const PatientController = {
    getAllPatientController,
    getSinglePatientController,
    deleteSinglePatientController,
    updatedSinglePatientController
  }