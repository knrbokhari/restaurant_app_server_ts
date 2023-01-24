import { Document } from 'mongoose';

export default interface Order extends Document {
    clientId: string;
    clientName: string;
    orderIds: Array<string>;
    totalPrice: number;
    number: string;
    address: string;
}