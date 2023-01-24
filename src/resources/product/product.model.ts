import { Schema, model } from 'mongoose';
import Product from './product.interface';

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },
        stock_out:{
            type: Boolean,
            required: true,
        },
        time: {
            type: String,
            required: true,
            default: '30'
        },
        discount: {
            type: Number,
            required: true,
            default: 0
        },
        size: {
            type: String,
            required: true,
        },
        image: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

export default model<Product>('Products', ProductSchema);