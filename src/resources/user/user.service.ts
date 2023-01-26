import sendEmail from "utils/sendEmail";
import token, { verifyToken } from "../../utils/token";
import userModel from "./user.model";
import bcrypt from 'bcrypt';
import crypto from 'crypto';


class UserService {
    private user = userModel;

    // Register a new user
    public async register(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        role: string,
        protocol: string,
        host: string,
    ): Promise<any | Error> {
        try {
            const user: any = await this.user.create({
                first_name,
                last_name,
                email,
                password,
                role,
            });

            const accessToken = token.createToken(user);

            const verificationURL = `${protocol}://${host}/verify/${accessToken}`;
            const message = `Please click the link below to complete your signup process on POS System: \n\n ${verificationURL} `;

            await sendEmail({
                email: user.email,
                subject: 'POS account verification',
                message,
            });

            return user.email;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // Verify user using email
    public async verifyUser(
        token: string,
        email: string
    ): Promise<any | Error> {
        try {
            await verifyToken(token);

            // const user = await this.user.findOne({email});

            // // if (await user.isValidPassword(password)) {
            // //     // remove password from user Object
            //     const userObject = user.toObject();
            //     delete userObject.password;

            //     const accessToken = token.createToken(user);

            //     return { user: userObject, token: accessToken};
            // // } else {
            // //     throw new Error('Wrong credentials given');
            // // }
            const user = await this.user.findOneAndUpdate({ email }, { verification: true }, { new: true });

            return user?.email
        } catch (err) {
            throw new Error('verify Token failed');
        }
    }

    // Attempt to login a user
    public async login(
        email: string,
        password: string
    ): Promise<any | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                // remove password from user Object
                const userObject = user.toObject();
                delete userObject.password;

                const accessToken = token.createToken(user);

                return { user: userObject, token: accessToken};
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (err) {
            throw new Error('Unable to Login');
        }
    }

    // find all user
    public async getAllUsers(): Promise<any | Error> {
        try {
            const users = await this.user.find();

            return users;
        } catch (err) {
            throw new Error('Unable to Login');
        }
    }

    // update user
    public async updateUsers(
        id:string,
        data: any
    ): Promise<any | Error> {
        try {
            const user: any = await this.user.findByIdAndUpdate(id, data, { new: true });
            // remove password from user Object
            const userObject = user.toObject();
            delete userObject.password;

            return user;
        } catch (err) {
            throw new Error('Unable to Login');
        }
    }

    // change password
    public async changePassword(
        email: string,
        oldPassword:string,
        newPassword: string
    ): Promise<any | Error> {
        try {
            const user : any = await this.user.findOne({ email });

            if (await user.isValidPassword(oldPassword)) {

                const hash = await bcrypt.hash(newPassword, 10);
                
                await this.user.findByIdAndUpdate(user._id, { $set: { password: hash } } );

                return ;
            } else {
                throw new Error('Old password does not match');
            }
        } catch (err) {
            throw new Error('Unable to Login');
        }
    }

    // forget password
    public async forgotPassword(
        email: string,
        protocol: string,
        host: string
    ): Promise<any | Error> {
        try {
            const user : any = await this.user.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            crypto.randomBytes(32, async (err, buffer) => {
                const token = buffer.toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                await user.save();

                // reset url
                const resetUrl = `${protocol}://${host}/reset/${token}`;
            
                const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                 Please click on the following link to complete the process: \n\n ${resetUrl} \n\n
                 If you did not request this, please ignore this email and your password will remain unchanged.`;
            
                await sendEmail({
                  email: user.email,
                  subject: 'Password Reset',
                  message,
                });
                
                return user.email;
            });

        } catch (err) {
            throw new Error('Unable to send email');
        }
    }


    // reset  password
    public async resetPassword(
        token:string,
        newPassword: string
    ): Promise<any | Error> {
        try {
            const hash = await bcrypt.hash(newPassword, 10);

            const user = await this.user.findOneAndUpdate(
                {
                  resetPasswordToken: token,
                  resetPasswordExpires: { $gt: Date.now() },
                },
                {
                  password: hash,
                  resetToken: undefined,
                  expireToken: undefined,
                },
                { new: true },
            );

            if (!user) {
                throw new Error('Try again session expired');
            }

            return user;
        } catch (err) {
            throw new Error('Unable to reset  password');
        }
    }

}

export default UserService;