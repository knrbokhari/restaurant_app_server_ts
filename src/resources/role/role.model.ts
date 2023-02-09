import { Schema, model } from 'mongoose';
import Role from './role.interface';

const RoleSchema = new Schema(
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


export default model<Role>('Role', RoleSchema);