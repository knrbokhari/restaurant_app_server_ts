import { Router, Request, Response, NextFunction } from "express";
import Controller from "interfaces/controller.interface";
import authenticatedMiddleware from "middleware/authenticated.middleware";
import validationMiddleware from "middleware/validation.middleware";
import ReviewService from "resources/review/review.service";
import HttpException from "utils/exceptions/http.exception";
import OrderService from "./order.service";
import validate from './order.validation';



class OrderController implements Controller{
    public path = '/orders'
    public router = Router();
    private OrderService = new OrderService();
    private ReviewService = new ReviewService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/create`, 
        authenticatedMiddleware, 
        validationMiddleware(validate.createOrder), 
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
        this.completedOrder
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

    // cancelled a Order
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

    // completed a Order
    private completedOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {id} = req.params;

            const order = await this.OrderService.findAOrder(id);

            if(!order) return res.status(404).json({ success: false, msg: "Order not found." });

            const completedOrder = await this.OrderService.completedOrder(id);

            res.status(200).json({
                success: true,
                completedOrder,
                msg: "Order completed successfully"
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // add Order Review
    private addOrderReview = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {id} = req.params;
            const { _id } = req.user;
            const { name, email, review, rating, type  } = req.body;

            const order = await this.OrderService.findAOrder(id);

            if(!order) return res.status(404).json({ success: false, msg: "Order not found." });

            if(order.clientId !== _id) return res.status(404).json({ success: false, msg: "Your not valid user for this review." });

            const newReview: any = await this.ReviewService.createReview(name, email, review, rating, type);

            await this.OrderService.addOrderReview(id, newReview.id)

            res.status(200).json({
                success: true,
                msg: "Review added successfully"
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

}

export default OrderController;