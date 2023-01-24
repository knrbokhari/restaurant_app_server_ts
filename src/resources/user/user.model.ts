import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from './user.interface';

const UserSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone:{
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'Chef', 'delivery_Boy', 'Admin'],
            default: 'user',
            required: true,
        },
        address: {
            type: String,
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Orders",
        }]
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);