import reviewModel from "./review.model";


class ReviewService {
    private review = reviewModel;

    // create a review
    public async createReview(
        name: string,
        email: string,
        review: string,
        rating: string,
    ): Promise<any | Error> {
        try {
            let newReview = await this.review.create({
                name,
                email,
                review,
                rating
                });

            return newReview;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    
    // update a review
    public async updateReview(
        id: string,
        review: string,
        rating: string,
    ): Promise<any | Error> {
        try {
            let updateReview = await this.review.findByIdAndUpdate( id, { review, rating });

            return updateReview;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default ReviewService;