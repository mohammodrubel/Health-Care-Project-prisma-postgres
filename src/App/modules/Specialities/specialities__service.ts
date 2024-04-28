import { Request } from "express"
import { file__upload } from "../../Middleware/file__upload"
import prisma from "../../shared/prisma"

const createSpecialitiesService = async(req:Request)=>{
    const file = req.file 
    if(file){
        const uploadToCloudinary = await file__upload.uploadToCloudinary(file)
        req.body.icon = uploadToCloudinary?.secure_url
    }

    const result = await prisma.specialties.create({
        data:req.body
    })

    return result
}

export const specialitiesService = {
createSpecialitiesService
}