import { Document } from 'mongoose';

export default interface Product extends Document {
    name: string;
    price: string;
    discription: string;
    stock_out: boolean;
    discount: number;
    time: string;
    size: string;
    image: Array<string>;
}