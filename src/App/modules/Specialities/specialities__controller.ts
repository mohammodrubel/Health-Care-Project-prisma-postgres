import httpStatus from "http-status";
import Catch__async from "../../Middleware/Catch__Async";
import SendResponce from "../../shared/SendResponce";
import { specialitiesService } from "./specialities__service";


const createSpecialities = Catch__async(async(req,res,next)=>{
    const result = await specialitiesService.createSpecialitiesService(req)
    SendResponce(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"create Specialities successfylly",
        data:result
      })
})

const getAllSpecialities = Catch__async(async(req,res,next)=>{
    const result = await specialitiesService.getSpecialitiesService()
    SendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"get Specialities successfylly",
        data:result
      })
})
const deleteSpecialities = Catch__async(async(req,res,next)=>{
    const id = req.params.id 
    const result = await specialitiesService.deleteSingleSpecialitiesService(id)
    SendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Delete Specialities successfylly",
        data:result
      })
})

const findSingleSpecialities = Catch__async(async(req,res,next)=>{
    const id = req.params.id 
    const result = await specialitiesService.getSingleSpecialitiesService(id)
    SendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"single Specialities successfylly",
        data:result
      })
})


export const specialitiesController = {
    createSpecialities,
    getAllSpecialities,
    deleteSpecialities,
    findSingleSpecialities
}