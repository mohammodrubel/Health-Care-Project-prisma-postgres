import { User__Role } from "@prisma/client"
import bcrypt from 'bcrypt'
import prisma from "../../shared/prisma"
import { file__upload } from "../../Middleware/file__upload"


const createAdminService = async(req:any)=>{
    const file = req.file 
    console.log(req.body)
        if(file){
            const uploadCloudinaray = await file__upload.uploadToCloudinary(file)
            req.body.admin.profilePhoto = uploadCloudinaray?.secure_url
            console.log(req.body)
        }
    const hasingPassword = await bcrypt.hash(req.body.password,12)
    const userData = {
        password:hasingPassword,
        role:User__Role.ADMIN,
        email:req.body.admin.email
    }
    const adminData = req.body?.admin 
    const result = await prisma.$transaction(async(transactionClient)=>{
          await transactionClient.user.create({
            data: userData
        })

        const createAdminData = await transactionClient.admin.create({
            data:adminData
        })

        return createAdminData
    })

   

    return result
    


}


export const UserService = {
    createAdminService
}