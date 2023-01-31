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
        },
        address: {
            type: String,
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Orders",
        }],
        cart: [{
            cartId: {
                type: Schema.Types.ObjectId,
                ref: "Carts",
              },
              _id: false,
        }],
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        verification: {
            type: Boolean,
            default: false
        }
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

// removeing password from user object
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.resetPasswordExpires;
    delete userObject.resetPasswordToken;
    delete userObject.verification;
    return userObject;
  };

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);