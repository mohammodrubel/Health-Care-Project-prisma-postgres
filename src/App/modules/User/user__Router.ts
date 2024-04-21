import express from "express";
import { userController } from "./user__Controller";
import Auth from "../../Middleware/Auth";
import { User__Role } from "@prisma/client";
import { file__upload } from "../../Middleware/file__upload";
const router = express.Router();



router.post(
  "/create-admin",file__upload.single('file'),
  Auth(User__Role.ADMIN, User__Role.SUPER_ADMIN),
  userController.createAdminController
);

export const userRouter = router;
