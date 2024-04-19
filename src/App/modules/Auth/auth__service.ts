import prisma from "../../shared/prisma"
import bcrypt from 'bcrypt';
import genareateToken from "../../Router/Token/Token";
import verifyToken from "../../Router/Token/verifyToken";
import { User__Status } from "@prisma/client";




const loginUserService = async(payload:{email:string,password:string})=>{
    const existingUser = await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email,
            status:User__Status.ACTIVE
        }
    })
    // check password 
    const checkPassword:boolean = await bcrypt.compare(payload.password,existingUser.password)
        if(!checkPassword){
            throw new Error('password did not matched!')
        }
    const jwtData = {
        email:existingUser.email,
        role:existingUser.role
    }
    // access Token 
    const accessToken =await genareateToken(jwtData,process.env.ACCESS_TOKEN_SECRET as string,'1m')
    // refresh Token 
    const refreshToken =await genareateToken(jwtData,process.env.REFRESH_TOKEN_SECRET as string,'4m')

    return {
        accessToken,
        needPasswordChange:existingUser.needPasswordChange,
        refreshToken
    }
}

const refreshToken = async(payload:string)=>{
    let decodedData;
    try{
        decodedData =await verifyToken(payload,process.env.REFRESH_TOKEN_SECRET  as string)
    }
    catch(error){
        throw new Error('you are not authorize')
    }

    const isUserExist = await prisma.user.findUniqueOrThrow({
        where:{
            email:(decodedData?.email),
            status:User__Status.ACTIVE
        }
    })
    
    const jwtData = {
        email:isUserExist?.email,
        role:isUserExist?.role
    }
    // access Token 
    const accessToken =await genareateToken(jwtData,process.env.ACCESS_TOKEN_SECRET as string,'1m')
    return {
        accessToken,
        needPasswordChange:isUserExist.needPasswordChange,
    }

}


export const AuthService = {
    loginUserService,
    refreshToken
}