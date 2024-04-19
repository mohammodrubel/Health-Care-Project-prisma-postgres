import { NextFunction, Request, RequestHandler, Response } from "express";

const Catch__async = (myFunction: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await myFunction(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default Catch__async;
