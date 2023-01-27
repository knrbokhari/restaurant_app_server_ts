import cartModel from "./cart.model";


class OrderService {
    private cart = cartModel;

    // add Product Into Cart
    public async addProductIntoCart(
        clientId: string,
        productId: string,
        price: number,
    ): Promise<any | Error> {
        try {
            const addedCart = await this.cart.create({
                clientId,
                productId,
                price
            });

            return addedCart;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // find Cart By Id
    public async findCartById(
        id: string,
    ): Promise<any | Error> {
        try {
            const cart = await this.cart.findById(id);

            return cart;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // find Cart
    public async findCart(
        clientId: string,
        productId: string,
    ): Promise<any | Error> {
        try {
            const cart = await this.cart.findOne({
                clientId,
                productId,
                order: false
            });

            return cart;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // increase Cart Product Quantity
    public async increaseCartProductQuantity(
        id: string,
    ): Promise<any | Error> {
        try {
            const cart = await this.cart.findByIdAndUpdate(
                id,
                { $inc: { quantity: 1 } },
                { new: true }
            );

            return cart;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // decrease Cart Product Quantity
    public async decreaseCartProductQuantity(
        id: string,
    ): Promise<any | Error> {
        try {
            const cart = await this.cart.findByIdAndUpdate(
                id,
                { $inc: { quantity: -1 } },
                { new: true }
            );

            return cart;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // remove Product From Cart
    public async removeProductFromCart(
        id: string,
    ): Promise<any | Error> {
        try {
            const cart = await this.cart.findByIdAndDelete(id);

            return cart;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

}

export default OrderService;
