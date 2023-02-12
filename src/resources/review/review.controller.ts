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
    }

    // update Review
    private updateReview = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const { review, rating } = req.body;
            const updateReview = await this.ReviewService.updateReview(id, review, rating);

            res.status(200).json({
                success: true,
                updateReview,
                message: 'Review Update successfully'
              });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ReviewController;