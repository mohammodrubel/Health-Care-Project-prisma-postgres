import express from "express";
import { AuthController } from "./auth__controller";
import Auth from "../../Middleware/Auth";
import { User__Role } from "@prisma/client";
const router = express.Router();

router.post("/login", AuthController.loginUserController);
router.post("/refresh-token", AuthController.refreshTokenUserController);
router.post(
  "/change-password",
  Auth(
    User__Role.ADMIN,
    User__Role.DOCTOR,
    User__Role.PATIENT,
    User__Role.SUPER_ADMIN
  ),
  AuthController.changePasswordUserController
);
router.post(
  "/forgate-password",
  Auth(
    User__Role.ADMIN,
    User__Role.DOCTOR,
    User__Role.PATIENT,
    User__Role.SUPER_ADMIN
  ),
  AuthController.forgatPasswordController
);
router.post("/reset-password",AuthController.resetPasswordController);


export const authRouter = router;
