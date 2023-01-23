import token from "../../utils/token";
import userModel from "./user.model";

class UserService {
    private user = userModel;

    // Register a new user
    public async register(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        role: string
    ): Promise<any | Error> {
        try {
            let user: any = await this.user.create({
                first_name,
                last_name,
                email,
                password,
                role,
            });

            const userObject = user.toObject();
            delete userObject.password;

            const accessToken = token.createToken(user);

            return { user: userObject, token: accessToken};
        } catch (err: any) {
            throw new Error(err.message);
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
}

export default UserService;