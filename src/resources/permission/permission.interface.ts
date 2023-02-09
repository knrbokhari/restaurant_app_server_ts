import { Document } from 'mongoose';

export default interface Permission extends Document {
    roleId: string;
    roleName: string;
    roleAlias: string;
    resourceId: string;
    resourceName: string;
    resourceAlias: string;
    isAllowed: string;
    type: string;
}