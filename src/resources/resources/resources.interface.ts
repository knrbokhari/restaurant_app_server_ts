import { Document } from 'mongoose';

export default interface Resources extends Document {
    name: string;
    alias: string;
    type: string;
}