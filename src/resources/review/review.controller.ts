import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../interfaces/controller.interface';
import authenticatedMiddleware from '../../middleware/authenticated.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import HttpException from '../../utils/exceptions/http.exception';
import ReviewService from './review.service';
import validate from './review.validation';

class ReviewController implements Controller {
    public path = '/review';
    public router = Router();
    private ReviewService = new ReviewService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.put(`${this.path}/:id`, 
        authenticatedMiddleware, 
        validationMiddleware(validate.updateReview), 
        this.updateReview
        );
        this.router.delete(`${this.path}/:id`, 
        authenticatedMiddleware, 
        // this.deleteAReview
        );
    }

    // update Review
    private updateReview = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const { id } = req.params;
            const updateReview = await this.ReviewService.updateReview(id, updateReview, rating);

            res.status(200).json(updateReview);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ReviewController;