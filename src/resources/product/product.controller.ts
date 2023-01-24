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
        this.router.post(`${this.path}/create`, 
        authenticatedMiddleware, 
        validationMiddleware(validate.createProduct), 
        this.newProduct
        );
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        validationMiddleware(validate.updateProduct), 
        this.updateAProduct
        );
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

            if(!product.length) return next(new HttpException(404, 'Product not found.'))

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

            if (!products.length) return res.status(200).json({ success: true, msg: "No product created yet" });

            res.status(200).json(products);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // create a Product
    private newProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, price, discription, stock_out, discount, time, size, image } = req.body;

            const newProduct = await this.ProductService.createProduct( name, price, discription, stock_out, discount, time, size, image );

            res.status(201).json({
                success: true,
                newProduct,
                msg: "New product added successfully",
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    // update A Product
    private updateAProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const { name, price, discription, stock_out, discount, time, size, image } = req.body;

            const updatedProduct = await this.ProductService.updateProduct( id, name, price, discription, stock_out, discount, time, size, image );

            res.status(200).json({
                success: true,
                updatedProduct,
                msg: "Product update successfully",
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    //  DELETE product
    private deleteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const product = await this.ProductService.getProduct(id);

            if(!product.length) return next(new HttpException(404, 'Product not found.'));

            const deleteProduct = await this.ProductService.deleteProduct(id);

            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    
}

export default ProductController;