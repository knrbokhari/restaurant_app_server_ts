import { Schema, model } from 'mongoose';
import Cart from './cart.interface';


const CartSchema = new Schema({
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        order:{
            type: Boolean,
            default: false 
        }
    },
    { timestamps: true }
);

export default model<Cart>('Carts', CartSchema);