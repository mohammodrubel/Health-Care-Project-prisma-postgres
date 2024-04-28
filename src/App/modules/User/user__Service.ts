import { Prisma, User__Role } from "@prisma/client"
import bcrypt from 'bcrypt'
import prisma from "../../shared/prisma"
import { file__upload } from "../../Middleware/file__upload"
import {fileType } from "../../Global/file"
import { Request } from "express"
import { pagination__interface } from "../../Global/pagination__interface"
import calculateNumber from "../../shared/pagination"
import { userSearchableFields } from "./user_searchable_field"
import { RequestUser } from "../../Global/Global_interface"



const createAdminService = async(req:Request)=>{
    const file = req.file as fileType
        if(file){
            const uploadCloudinaray = await file__upload.uploadToCloudinary(file)
            
            req.body.admin.profilePhoto = uploadCloudinaray?.secure_url
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
const createDoctorService = async(req:Request)=>{
    const file = req.file as fileType
        if(file){
            const uploadCloudinaray = await file__upload.uploadToCloudinary(file)
            
            req.body.doctor.profilePhoto = uploadCloudinaray?.secure_url
        }
    const hasingPassword = await bcrypt.hash(req.body.password,12)
    const userData = {
        password:hasingPassword,
        role:User__Role.DOCTOR,
        email:req.body.doctor.email
    }
    const doctorData = req.body?.doctor 
    const result = await prisma.$transaction(async(transactionClient)=>{
          await transactionClient.user.create({
            data: userData
        })

        const createDoctorData = await transactionClient.doctor.create({
            data:doctorData
        })

        return createDoctorData
    })

   

    return result
    


}
const patientDoctorService = async(req:Request)=>{
    const file = req.file as fileType
        if(file){
            const uploadCloudinaray = await file__upload.uploadToCloudinary(file)
            
            req.body.patient.profilePhoto = uploadCloudinaray?.secure_url
        }
    const hasingPassword = await bcrypt.hash(req.body.password,12)
    const patientData = {
        password:hasingPassword,
        role:User__Role.PATIENT,
        email:req.body.patient.email
    }
    const doctorDataInfo = req.body?.patient 
    const result = await prisma.$transaction(async(transactionClient)=>{
          await transactionClient.user.create({
            data: patientData
        })

        const createDoctorData = await transactionClient.patient.create({
            data:doctorDataInfo
        })

        return createDoctorData
    })

   

    return result
    


}
const getAllUserService = async (
    params: any,
    options: pagination__interface
  ) => {
    const { skip, limit,page, sortBy, sortOrder } = calculateNumber(options);
    const { searchTerm, ...filterData }: { [key: string]: string } = params;
    const addCondition: Prisma.UserWhereInput[] = [];
  
    // Partial match
    if (searchTerm) {
      addCondition.push({
        OR: userSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      });
    }
  
    // Exact match
    if (Object.keys(filterData).length > 0) {
      addCondition.push({
        AND: Object.keys(filterData).map((field) => ({
          [field]: {
            equals: filterData[field],
          },
        })),
      });
    }
  
  
  
    const whereCondition: Prisma.UserWhereInput = addCondition.length > 0 ? { AND: addCondition } : {};
  
    const result = await prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : {
              createdAt: "desc",
            },
            select:{
                id: true,
                email: true,
                role: true,
                needPasswordChange: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
    });
  
    const total = await prisma.user.count({
      where:whereCondition
    })
    return {
      meta:{
          page,
          limit,
          total
      },
      data:result
    };
  };
const updateUserService = async(id:string,status:User__Role)=>{
    await prisma.user.findUniqueOrThrow({
        where:{
            id:id 
        }
    })

    const updateData = await prisma.user.update({
        where:{
            id:id 
        },
        data:status
    })

    return updateData
}
const getMyPfofile = async (userProfile:any)=>{
  let profileRole ;
  const userInfo = await prisma.user.findUniqueOrThrow({
    where:{
      email:userProfile.email
    },
    select:{
      id:true,
      email:true,
      role:true,
      needPasswordChange:true,
      status:true,
    }
  })

  if(userInfo.role === User__Role.SUPER_ADMIN){
    profileRole = await prisma.admin.findUniqueOrThrow({
      where:{
        email:userInfo.email
      }
    })
  }
  if(userInfo.role === User__Role.ADMIN){
    profileRole = await prisma.admin.findUniqueOrThrow({
      where:{
        email:userInfo.email
      }
    })
  }
  if(userInfo.role === User__Role.DOCTOR){
    profileRole = await prisma.doctor.findUniqueOrThrow({
      where:{
        email:userInfo.email
      }
    })
  }
  if(userInfo.role === User__Role.PATIENT){
    profileRole = await prisma.patient.findUniqueOrThrow({
      where:{
        email:userInfo.email
      }
    })
  }


  return {...userInfo,...profileRole}
}
const updateMyProfileService = async(userProfile:RequestUser,req:Request)=>{
  const userInfo = await prisma.user.findUniqueOrThrow({
    where:{
      email:userProfile.email,
    }
  })
  const file = req.file as fileType
    if(file){
      const uploadToCloudinary = await file__upload.uploadToCloudinary(file)
      req.body.profilePhoto = uploadToCloudinary?.secure_url
    }
  let profileRole ;
  if(userInfo.role === User__Role.SUPER_ADMIN){
    profileRole = await prisma.admin.update({
      where:{
        email:userInfo.email
      },
      data:req.body
    })
  }
  if(userInfo.role === User__Role.ADMIN){
    profileRole = await prisma.admin.update({
      where:{
        email:userInfo.email
      },
      data:req.body
    })
  }
  if(userInfo.role === User__Role.DOCTOR){
    profileRole = await prisma.doctor.update({
      where:{
        email:userInfo.email
      },
      data:req.body
    })
  }
  if(userInfo.role === User__Role.PATIENT){
    profileRole = await prisma.patient.update({
      where:{
        email:userInfo.email
      },
      data:req.body
    })
  }

  return {...userInfo}

}

export const UserService = {
    createAdminService,
    createDoctorService,
    patientDoctorService,
    getAllUserService,
    updateUserService,
    getMyPfofile,
    updateMyProfileService
}