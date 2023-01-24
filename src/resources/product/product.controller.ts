import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../interfaces/controller.interface';
import authenticatedMiddleware from '../../middleware/authenticated.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import HttpException from '../../utils/exceptions/http.exception';
import ProductService from './product.service';
import validate from './product.validation';


class ProductController implements Controller {
    public path = '/products';
    public router = Router();
    private ProductService = new ProductService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/:id`,
            this.findAProduct
        );
        this.router.get(
            `${this.path}/`,
            this.findAllProduct
        );
        // this.router.get(`${this.path}`, authenticatedMiddleware, this.);
    }

    // find A Product
    private findAProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const product = await this.ProductService.getProduct(id);

            res.status(200).json(product);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // find All Product
    private findAllProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const products = await this.ProductService.getAllProduct();

            res.status(200).json(products);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // create a Product
    private createProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, price, discription, stock_out, discount, time, size, image } = req.body;

            const product = await this.ProductService.createProduct( name, price, discription, stock_out, discount, time, size, image );

            res.status(201).json(product);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    
}

export default ProductController;