import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../interfaces/controller.interface';
import authenticatedMiddleware from '../../middleware/authenticated.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import HttpException from '../../utils/exceptions/http.exception';
import UserService from './user.service';
import validate from './user.validation';


class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(`${this.path}`, authenticatedMiddleware, this.getAllUser);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { first_name, last_name, email, password, role } = req.body;

        try {

            const userWithToken: any = await this.UserService.register(
                first_name,
                last_name,
                email,
                password,
                role
            );

            res.status(201).json({ ...userWithToken });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const userWithToken = await this.UserService.login(email, password);

            res.status(200).json({ ...userWithToken });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const users = await this.UserService.getAllUsers();

            res.status(200).json(users);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;