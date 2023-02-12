import reviewModel from "./review.model";


class ReviewService {
    private review = reviewModel;

    // create a review
    public async createReview(
        name: string,
        email: string,
        review: string,
        rating: string,
        type: string
    ): Promise<any | Error> {
        try {
            let newReview = await this.review.create({
                name,
                email,
                review,
                rating,
                type
                });

            return newReview;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // find a review
    public async findReview(
        id: string
    ): Promise<any | Error> {
        try {
            let review = await this.review.findById(id);

            return review;
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

    // delete a review
    public async deleteReview(
        id: string
    ): Promise<any | Error> {
        try {
            let deleteReview = await this.review.findByIdAndDelete(id);

            return deleteReview;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default ReviewService;