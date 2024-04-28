import { Request } from "express"
import { file__upload } from "../../Middleware/file__upload"
import prisma from "../../shared/prisma"
import { fileType } from "../../Global/file"

const createSpecialitiesService = async(req:Request)=>{
    const file = req.file as fileType
    if(file){
        const uploadToCloudinary = await file__upload.uploadToCloudinary(file)
        req.body.icon = uploadToCloudinary?.secure_url
    }

    const result = await prisma.specialties.create({
        data:req.body
    })

    return result
}

const getSpecialitiesService = async()=>{
    const result = await prisma.specialties.findMany()
    return result
}

const deleteSingleSpecialitiesService = async(id:string)=>{
    await prisma.specialties.findUniqueOrThrow({
        where:{
            id:id
        }
    })
    const result = await prisma.specialties.delete({
        where:{
            id:id
        }
    })
    return result
}

const getSingleSpecialitiesService = async(id:string)=>{
    const result = await prisma.specialties.findUniqueOrThrow({
        where:{
            id:id
        }
    })
   
    return result
}

export const specialitiesService = {
createSpecialitiesService,
getSpecialitiesService,
deleteSingleSpecialitiesService,
getSingleSpecialitiesService
}