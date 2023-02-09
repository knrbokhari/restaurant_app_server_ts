import { Schema, model } from 'mongoose';
import Permission from './permission.interface';

const PermissionSchema = new Schema(
    {
        roleId: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
        },
        resourceId:{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        isAllowed: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String
        }
    },
    { timestamps: true }
);

export default model<Permission>('Permission', PermissionSchema);