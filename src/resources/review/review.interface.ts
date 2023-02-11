import { Document } from 'mongoose';

export default interface Review extends Document {
    name: string;
    email: string;
    review: string;
    rating: string;
}