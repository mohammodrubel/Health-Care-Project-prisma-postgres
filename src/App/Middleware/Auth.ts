import { NextFunction, Request, Response } from "express";
import verifyToken from "../Router/Token/verifyToken";
import app__error from "./app__error";
import httpStatus from "http-status";

const Auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            
            // If token does not exist
            if (!token) {
                throw new app__error(httpStatus.UNAUTHORIZED,"You are not authorized!")
            }
            
            // Verify the token
            const verifiedToken = await verifyToken(token, process.env.JWT_SECRET as string);
            console.log(verifiedToken);
            
            // If roles are specified and the user's role is not in the allowed roles
            if (roles.length && !roles.includes(verifiedToken?.role)) {
                throw new app__error(httpStatus.FORBIDDEN,"You are not authorized!")
            }

            req?.user = verifiedToken
            
            // Continue to the next middleware/controller
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default Auth;
