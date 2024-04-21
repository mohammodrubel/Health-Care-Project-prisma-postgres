import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import genareateToken from "../../Router/Token/Token";
import verifyToken from '../../Router/Token/verifyToken';
import { User__Role, User__Status } from "@prisma/client";
import { RequestUser } from "../../Global/Global_interface";
import app__error from "../../Middleware/app__error";
import httpStatus from "http-status";
import generateToken from "../../Router/Token/Token";
import email__sender from "../../Middleware/email__sender";

const loginUserService = async (payload: {
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: User__Status.ACTIVE,
    },
  });
  // check password
  const checkPassword: boolean = await bcrypt.compare(
    payload.password,
    existingUser.password
  );
  if (!checkPassword) {
    throw new Error("password did not matched!");
  }
  const jwtData = {
    email: existingUser.email,
    role: existingUser.role,
  };
  // access Token
  const accessToken = await genareateToken(
    jwtData,
    process.env.JWT_SECRET as string,
    "10d"
  );
  // refresh Token
  const refreshToken = await genareateToken(
    jwtData,
    process.env.REFRESH_TOKEN_SECRET as string,
    "30d"
  );

  return {
    accessToken,
    needPasswordChange: existingUser.needPasswordChange,
    refreshToken,
  };
};

const refreshToken = async (payload: string) => {
  let decodedData;
  try {
    decodedData = await verifyToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string
    );
  } catch (error) {
    throw new Error("you are not authorize");
  }

  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: User__Status.ACTIVE,
    },
  });

  const jwtData = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };
  // access Token
  const accessToken = await genareateToken(
    jwtData,
    process.env.JWT_SECRET as string,
    "10d"
  );
  return {
    accessToken,
    needPasswordChange: isUserExist.needPasswordChange,
  };
};

const changePassword = async (
  payload: RequestUser,
  passwordChangeData: { oldPassword: string; newPassword: string }
) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: User__Status.ACTIVE,
    },
  });
  // check password
  const checkPassword: boolean = await bcrypt.compare(
    passwordChangeData.oldPassword,
    isUserExist.password
  );
  if (!checkPassword) {
    throw new app__error(httpStatus.FORBIDDEN, "password did not matched!");
  }

  const hasingPassword = await bcrypt.hash(passwordChangeData.newPassword,12)

  const updatePassword = await prisma.user.update({
    where:{
        email:payload.email,
        status: User__Status.ACTIVE,
    },
    data:{
        password:hasingPassword,
        needPasswordChange:false
    }
  })

  return updatePassword

};

const forgatePassword = async (payload:{email:string})=>{
    const userData = await prisma.user.findUniqueOrThrow({
      where:{
        email:payload.email,
        status:User__Status.ACTIVE
      }
    })

    const resetPasswordToken = await generateToken({email:userData.email,role:userData.role},process.env.RESET_PASSWORD_TOKEN as string,process.env.RESET_PASSWORD_TIME as string)
    // RESET_PASSWORD_LINK
    const resetPasswordLink = process.env.RESET_PASSWORD_LINK + `?id=${userData.id}&token=${resetPasswordToken}`
    const htmlBody = `
      <div>
        <b>Your Reset Password Link </b>
        <a href=${resetPasswordLink}><button>Reset Password</button></a>
      </div>
    `
    const senderEmailForReset = email__sender(userData.email,htmlBody)
    return senderEmailForReset
}

const resetPassword = async (token:string,bodyData:{id:string,password:string})=>{
    // check valid user 
    const validUser = await prisma.user.findUniqueOrThrow({
      where:{
        id:bodyData.id,
        status:User__Status.ACTIVE
      }
    })

    // is valid token 
    const isValidToken = await verifyToken(token,process.env.RESET_PASSWORD_TOKEN as string)
    
    if(!isValidToken){
      throw new app__error(httpStatus.FORBIDDEN,'forbidden')
    }
}
export const AuthService = {
  loginUserService,
  refreshToken,
  changePassword,
  forgatePassword,
  resetPassword
};
