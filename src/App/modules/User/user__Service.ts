import { PrismaClient, User__Role } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient() 

const createAdminService = async(data)=>{

    const hasingPassword = await bcrypt.hash(data.password,12)
    const userData = {
        password:hasingPassword,
        role:User__Role.ADMIN,
        email:data.admin.email
    }
    const adminData = data?.admin 
    const result = await prisma.$transaction(async(transactionClient)=>{
          await transactionClient.user.create({
            data: userData
        })

        const createAdminData = await transactionClient.admin.create({
            data:adminData
        })

        return createAdminData
    })

    console.log(result)

    return result
    


}


export const UserService = {
    createAdminService
}