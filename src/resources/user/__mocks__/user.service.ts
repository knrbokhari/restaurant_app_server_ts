import userModel from "../user.model";


class UserService {
    private user = userModel;
    private users = [
        {
        _id: '1',
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        password: "password123",
        role: "user",
        verification: true
      },
      {
        _id: '2',
        first_name: "Joni",
        last_name: "Doe",
        email: "jonidoe@example.com",
        password: "password123",
        role: "user",
        verification: false
      }
    ]

    // Register a new user
    public async register(
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        role: string,
        origin: string,
    ): Promise<any | Error> {
        try {
            const user: any = new this.user({
                first_name,
                last_name,
                email,
                password,
                role,
            });

            return user.email;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // Verify user using email
    public async verifyUser(
        token: string,
    ): Promise<any | Error> {}

    // ReSend Verify Token
    public async ReSendVerifyToken(
        email: string,
        origin: string,
    ): Promise<any | Error> {}

    // Attempt to login a user
    public async login(
        email: string,
        password: string
    ): Promise<any | Error> {}

    // find all user
    public async getAllUsers(): Promise<any | Error> {
        try {
            const users = this.users;

            return users;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // find a user
    public async getAUser( id: string): Promise<any | Error> {
        try {
            const user = this.users.find(user => user._id === id)

            return user;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    // update user
    public async updateUser(
        id:string,
        data: any
    ): Promise<any | Error> {}

    // change password
    public async changePassword(
        email: string,
        oldPassword:string,
        newPassword: string
    ): Promise<any | Error> {}

    // forget password
    public async forgotPassword(
        email: string,
        protocol: string,
        host: string
    ): Promise<any | Error> {}


    // reset  password
    public async resetPassword(
        token:string,
        newPassword: string
    ): Promise<any | Error> {}

}

export default UserService;