import { NextFunction, Request, Response } from "express";
import Token from "interfaces/token.interface";
import HttpException from "utils/exceptions/http.exception";
import token from "utils/token";
import jwt from 'jsonwebtoken'

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    // const bearer = req.headers.authorization;

    // if (!bearer || !bearer.startsWith('Bearer ')) {
    //     return next(new HttpException(401, 'Unauthorised'));
    // }

    // const accessToken = bearer.split('Bearer ')[1].trim();
    // try {
    //     const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
    //         accessToken
    //     );

    //     if (payload instanceof jwt.JsonWebTokenError) {
    //         return next(new HttpException(401, 'Unauthorised'));
    //     }

    //     const user = await userModel.findById(payload.id)
    //         .select('-password')
    //         .exec();

    //     if (!user) {
    //         return next(new HttpException(401, 'Unauthorised'));
    //     }

    //     req.user = user;

    // } catch (error) {
    //     return next(new HttpException(401, 'Unauthorised'));
    // }
    return next();
}

export default authenticatedMiddleware;