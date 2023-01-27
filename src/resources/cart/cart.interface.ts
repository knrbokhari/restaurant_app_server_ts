import { Document } from "mongoose";

export default interface Cart extends Document {
    clientId: string;
    productId: string;
    price: number;
    quantity: number;
    order: boolean;
}