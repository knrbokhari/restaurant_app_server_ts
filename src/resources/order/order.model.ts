import { Schema, model } from 'mongoose';
import Order from './order.interface';


const OrderSchema = new Schema({
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clientName: {
            type: String,
            required: true,
        },
        orderIds: [{
            type: Schema.Types.ObjectId,
            ref: "OrderItems",
            required: true,
        }],
        totalPrice:{
            type: Number,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status:{
            type: String, 
            enum: ['created', 'processing', 'cancelled', 'completed'], 
            default: 'created' 
        }
    },
    { timestamps: true }
);

export default model<Order>('Orders', OrderSchema);