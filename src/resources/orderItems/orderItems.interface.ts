import { Document } from 'mongoose';

export default interface OrderItems extends Document {
    productId: string;
    quantity: number;
    size: string;
    totalPrice: number;
}