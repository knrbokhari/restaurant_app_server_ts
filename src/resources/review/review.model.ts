import { Schema, model } from 'mongoose';
import Review from './review.interface';

const ReviewSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true        
        },
        review: {
            type: String,
            require: true        
        },
        rating: {
            type: String,
            require: true        
        },
        type: {
            type: String,
            enum: ['product', 'order'],
            require: true        
        }
    },
    { timestamps: true }
);


export default model<Review>('Reviews', ReviewSchema);