import { Schema, model } from 'mongoose';
import Product from './user.interface';

const ProductSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone:{
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order",
        }]
    },
    { timestamps: true }
);

export default model<Product>('Products', ProductSchema);