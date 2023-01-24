import { Schema, model } from 'mongoose';
import OrderItems from './orderItems.interface';

const OrderItemSchema = new Schema({
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

export default model<OrderItems>('OrderItems', OrderItemSchema);