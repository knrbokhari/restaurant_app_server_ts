import { Schema, model } from 'mongoose';
import Resources from './resources.interface';

const ResourcesSchema = new Schema(
    {
        name: {
            type: String
        },
        alias: {
            type: String
        },
        type: {
            type: String
        }
    },
    { timestamps: true }
);

ResourcesSchema.index({name: 'text', alias: 'text'});
export default model<Resources>('Resources', ResourcesSchema);