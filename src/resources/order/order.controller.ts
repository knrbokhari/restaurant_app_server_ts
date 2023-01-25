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
        this.router.get(`${this.path}/`, 
        authenticatedMiddleware, 
        this.findAllOrder
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        this.processingOrder
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        this.cancelledOrder
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
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

    // find all Orders
    private findAllOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const Orders = await this.OrderService.findAllOrder();

            res.status(200).json({
                success: true,
                Orders,
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };


    // processing a Order
    private processingOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {id} = req.params;

            const order = await this.OrderService.findAOrder(id);

            if(!order) return res.status(404).json({ success: false, msg: "Order not found." });

            const processingOrder = await this.OrderService.processingOrder(id);

            res.status(200).json({
                success: true,
                processingOrder,
                msg: "Order processing successfully"
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // processing a Order
    private cancelledOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {id} = req.params;

            const order = await this.OrderService.findAOrder(id);

            if(!order) return res.status(404).json({ success: false, msg: "Order not found." });

            const cancelledOrder = await this.OrderService.cancelledOrder(id);

            res.status(200).json({
                success: true,
                msg: "Order successfully cancelled"
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}