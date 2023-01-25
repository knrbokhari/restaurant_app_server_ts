import { Router, Request, Response, NextFunction } from "express";
import Controller from "interfaces/controller.interface";
import authenticatedMiddleware from "middleware/authenticated.middleware";
import HttpException from "utils/exceptions/http.exception";
import OrderService from "./order.service";


class OrderController implements Controller{
    public path = '/orders'
    public router = Router();
    private OrderService = new OrderService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/create`, 
        authenticatedMiddleware, 
        // validationMiddleware(validate), 
        this.newOrder
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        // validationMiddleware(validate), 
        // this.processingOrder
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        // validationMiddleware(validate), 
        // this.cancelledOrder
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        // validationMiddleware(validate), 
        // this.completedOrder
        );
    }

    // create a Order
    private newOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { clientId, clientName, orderArr, totalPrice, number, address } = req.body;

            const newOrder = await this.OrderService.createOrder( clientId, clientName, orderArr, totalPrice, number, address );

            res.status(201).json({
                success: true,
                newOrder,
                msg: "New Order added successfully",
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}