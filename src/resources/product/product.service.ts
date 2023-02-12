import productModel from "./product.model";


class ProductService {
    private product = productModel;

    // get a product
    public async getProduct(
        id: string
    ): Promise<any | Error> {
        try {
            let product = await this.product.findById(id);

            return product;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    // get all product
    public async getAllProduct(): Promise<any | Error> {
        try {
            let products = await this.product.find();

            return products;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // create a product
    public async createProduct(
        name: string,
        price: string,
        discription: string,
        stock_out: boolean,
        discount: number,
        time: string,
        size: string,
        image: Array<string>
    ): Promise<any | Error> {
        try {
            let product = await this.product.create({
                name,
                price,
                discription,
                stock_out,
                discount,
                time,
                size,
                image
                });

            return product;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }


    // update a product
    public async updateProduct(
        id: string,
        name: string,
        price: string,
        discription: string,
        stock_out: boolean,
        discount: number,
        time: string,
        size: string,
        image: Array<string>
    ): Promise<any | Error> {
        try {
            let product = await this.product.findByIdAndUpdate(id, {
                name,
                price,
                discription,
                stock_out,
                discount,
                time,
                size, 
                image 
            }, 
            {new: true});

            return product;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // add review to product
    public async addProductReview(
        id: string,
        reviewId: string
    ): Promise<any | Error> {
        try {
            let product = await this.product.findByIdAndUpdate(id, { $push: { reviews: reviewId }}, {new: true}).populate('reviews');

            return product;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // delete a product
    public async deleteProduct(
        id: string
    ): Promise<any | Error> {
        try {
            let product = await this.product.findByIdAndDelete(id);

            return product;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default ProductService;