import { Document } from 'mongoose';

export default interface Order extends Document {
    clientId: string;
    clientName: string;
    orderIds: Array<string>;
    totalPrice: boolean;
    number: string;
    address: string;
}