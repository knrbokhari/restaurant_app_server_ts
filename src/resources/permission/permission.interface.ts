import { Document } from 'mongoose';

export default interface Permission extends Document {
    roleId: string;
    resourceId: string;
    isAllowed: string;
    type: string;
}