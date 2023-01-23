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
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                first_name,
                last_name,
                email,
                password,
                role,
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // Attempt to login a user
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (err) {
            throw new Error('Unable to Login');
        }
    }
}

export default UserService;