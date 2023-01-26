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
        this.router.get(`${this.path}`, 
        authenticatedMiddleware, 
        this.getAllUser
        );
        this.router.get(`${this.path}/verify/:registerToken`, 
        authenticatedMiddleware, 
        this.verifyUser
        );
        this.router.put(`${this.path}/update/:id`, 
        authenticatedMiddleware, 
        this.updateUser
        );
        this.router.put(`${this.path}/change-password`, 
        authenticatedMiddleware, 
        this.changePassword
        );
        this.router.post(`${this.path}/forgot`, 
        authenticatedMiddleware, 
        this.forgotPassword
        );
        this.router.post(`${this.path}/reset/:token`, 
        authenticatedMiddleware, 
        this.resetPassword
        );
    }

    // creating new user
    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { first_name, last_name, email, password, role } = req.body;
            const protocol = req.protocol;
            const host: any = req.headers.host;

            const user: any = await this.UserService.register(
                first_name,
                last_name,
                email,
                password,
                role,
                protocol,
                host
            );

            res.status(201).json({ success: true, data: `Please check your email ${user.email} to complete signup process in order to use the application` });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // login user
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

    // Verify user using email
    private verifyUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { registerToken } = req.params;

            const vToken = await this.UserService.verifyUser(registerToken);

            res.status(200).json({ success: true, msg: 'User verification successfully' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // get all users 
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

    // update user 
    private updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const user = await this.UserService.updateUser( id, req.body);

            res.status(200).json({ success: true, user, msg: 'User updated successfully' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // change Password
    private changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, oldPassword, newPassword } = req.body;

            await this.UserService.changePassword( email, oldPassword, newPassword );

            res.status(200).json({ success: true, msg: 'Password changed successfully' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // forget password
    private forgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email } = req.body;
            const protocol = req.protocol;
            const host: any = req.headers.host;

            const user = await this.UserService.forgotPassword( email, protocol, host );

            res.status(200).json({ success: true, msg: `Please check your email ${user.email} to complete the process` });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // reset password
    private resetPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;

            await this.UserService.resetPassword( token, newPassword );

            res.status(200).json({ success: true, msg: 'reset password successfully' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;