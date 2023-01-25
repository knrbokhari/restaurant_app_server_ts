import orderItemsService from "resources/orderItems/orderItems.service";
import orderModel from "./order.model";


class OrderService {
    private orderItemsService = new orderItemsService;
    private order = orderModel;

    // create a order
    public async createOrder(
        clientId: string,
        clientName: string,
        orderArr: any,
        totalPrice: number,
        number: string,
        address: string,
    ): Promise<any | Error> {
        try {
            const orderItemsId = await this.orderItemsService.createOrderItems(orderArr);

            const order = await this.order.create(clientId, clientName, orderItemsId, totalPrice, number, address);

            return order;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // processing a order
    public async processingOrder(
        id: string
    ): Promise<any | Error> {
        try {
            const processingOrder = await this.order.findByIdAndUpdate(id, {status: 'processing'}, {new: true});

            return processingOrder;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // cancelled a order
    public async cancelledOrder(
        id: string
    ): Promise<any | Error> {
        try {
            const cancelledOrder = await this.order.findByIdAndUpdate(id, {status: 'cancelled'}, {new: true});

            return cancelledOrder;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // completed a order
    public async completedOrder(
        id: string
    ): Promise<any | Error> {
        try {
            const completedOrder = await this.order.findByIdAndUpdate(id, {status: 'completed'}, {new: true});

            return completedOrder;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default OrderService;