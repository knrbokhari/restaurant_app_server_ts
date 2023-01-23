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

    // create a product

    // update a product

    // delete a product

}

export default ProductService;