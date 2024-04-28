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


export const specialitiesController = {
    createSpecialities
}