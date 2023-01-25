import OrderItems from "./orderItems.interface";
import orderItemsModel from "./orderItems.model";


class OrderItemsService {
    private orderItems = orderItemsModel;

    public async createOrderItems(
        data: Array<OrderItems>
    ): Promise<any | Error> {
        try {
            let orderItems = await this.orderItems.insertMany(data);

            let orderItemsId = orderItems.map(i => i._id);

            return orderItemsId;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default OrderItemsService;