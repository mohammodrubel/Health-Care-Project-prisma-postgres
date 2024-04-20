import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import genareateToken from "../../Router/Token/Token";
import verifyToken from "../../Router/Token/verifyToken";
import { User__Role, User__Status } from "@prisma/client";
import { RequestUser } from "../../Global/Global_interface";
import app__error from "../../Middleware/app__error";
import httpStatus from "http-status";

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

export const AuthService = {
  loginUserService,
  refreshToken,
  changePassword,
};
