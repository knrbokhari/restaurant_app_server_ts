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

    // update a product

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