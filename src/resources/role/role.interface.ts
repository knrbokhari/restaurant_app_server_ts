import { Document } from 'mongoose';

export default interface Role extends Document {
    name: string;
    alias: string;
    type: string;
}