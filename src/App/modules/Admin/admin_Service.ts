import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAllAdminService = async (params:any)=>{
    console.log(params)
    const result = await prisma.admin.findMany({
        where:{
            OR:[
                {
                    name:{
                        contains:params?.searchTerm,
                        mode:'insensitive'
                    }
                },
                {
                    email:{
                        contains:params?.email,
                        mode:'insensitive'
                    }
                },
            ]
        }
    })
    return result
}


export const adminService = {
    getAllAdminService
}