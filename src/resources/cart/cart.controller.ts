import { Router, Request, Response, NextFunction } from "express";
import Controller from "interfaces/controller.interface";
import authenticatedMiddleware from "middleware/authenticated.middleware";
import validationMiddleware from "middleware/validation.middleware";
import UserService from "resources/user/user.service";
import HttpException from "utils/exceptions/http.exception";
import CartService from "./cart.service";

class OrderController implements Controller{
    public path = '/cart'
    public router = Router();
    private CartService = new CartService();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/add-to-cart`, 
        authenticatedMiddleware, 
        // validationMiddleware(validate.createOrder), 
        this.addToCart
        );
        this.router.put(`${this.path}/remove-from-cart/:id`, 
        authenticatedMiddleware, 
        this.removeFromCart
        );
        this.router.put(`${this.path}/increase-cart/:id`, 
        authenticatedMiddleware, 
        this.increaseCartProduct
        );
        this.router.put(`${this.path}/decrease-cart/:id`, 
        authenticatedMiddleware, 
        // this.decreaseCartProduct
        );
    }

    // add product to cart
    private addToCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { clientId, productId, price } = req.body;

            const user = await this.UserService.getAUser(clientId);

            const preCart = await this.CartService.findCart( clientId, productId );

            if ( preCart ) {
                await this.CartService.increaseCartProductQuantity(preCart._id);
                const user = await this.UserService.getAUser(clientId);
                return res.status(200).json({
                    success: true,
                    user,
                    msg: "Prodact added successfully",
                  });
            }

            const createCart = await this.CartService.addProductIntoCart( clientId, productId, price );

            user.cart.push(createCart._id);
            user.markModified("cart");
            await user.save();

            res.status(201).json({
                success: true,
                user,
                msg: "Prodact added successfully",
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // remove product from card
    private removeFromCart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const preCart = await this.CartService.findCartById( id );

            if ( !preCart ) throw new Error("Product not found");
            const user = await this.UserService.getAUser(preCart.clientId);

            const userCart = user.cart;
            const updateCart = userCart.filter((i: { _id: string; }) => i._id !== id);

            user.cart = updateCart;
            user.markModified("cart");
            await user.save();

            await this.CartService.removeProductFromCart(id);

            res.status(200).json({
                success: true,
                user,
                msg: "Prodact remove successfully",
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // increase Cart quantity
    private increaseCartProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const preCart = await this.CartService.findCartById( id );

            if ( !preCart ) throw new Error("Product not found");

            await this.CartService.increaseCartProductQuantity(id);

            const user = await this.UserService.getAUser(preCart.clientId);

            res.status(200).json({
                success: true,
                user,
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // decrease Cart quantity

}