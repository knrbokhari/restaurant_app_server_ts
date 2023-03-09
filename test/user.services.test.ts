import mongoose from "mongoose";
import request from "supertest";
import App from "../src/app";
import * as dotenv from "dotenv";
dotenv.config();
import UserController from "../src/resources/user/user.controller";
// import UserService from "../src/resources/user/user.service";
jest.mock("../src/middleware/authenticated.middleware");
jest.mock("../src/resources/user/user.service");

const { MONGO_DB, PORT }: any = process.env;

const app = new App([new UserController()], PORT);

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(MONGO_DB);
});

describe("User endpoints", () => {
  //   const userService = new UserService();
  const user = {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    password: "password123",
    role: "user",
  };

  describe("GET /api/v1/users", () => {
    it("responds with an array of users", async () => {
      const response = await request(app.express).get("/api/v1/users");

      expect(response.status).toBe(200);
      let users = response.body;
      expect(users).toEqual(expect.any(Array));
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]._id).toEqual(expect.any(String));
    });
  });

  describe("POST /api/v1/users/register", () => {
    it("should create a new user, generate access token, send verification email, and return email", async () => {
      const response = await request(app.express)
        .post("/api/v1/users/register")
        .send(user);

      expect(response.status).toBe(201);
      let newUser = response.body;
      expect(newUser.success).toEqual(true);
      expect(newUser.msg).toEqual(expect.any(String));
    });

    it("should throw an error if any error occurs'", async () => {
      const response = await request(app.express).post(
        "/api/v1/users/register"
      );

      expect(response.status).toBe(400);
      let newUser = response.body;
      expect(newUser.errors).toEqual(expect.any(Array));
    });
  });

  describe("POST /api/v1/users/login", () => {
    const verifyUser = {
      email: "johndoe@example.com",
      password: "password123",
    };
    const unVerifyUser = {
      email: "jonidoe@example.com",
      password: "password123",
    };
    const userNotFound = {
      email: "joni@example.com",
      password: "password123",
    };
    const incorrectPassword = {
      email: "johndoe@example.com",
      password: "passw123",
    };
    it("should return user object and token if credentials are correct", async () => {
      const response = await request(app.express)
        .post("/api/v1/users/login")
        .send(verifyUser);

      expect(response.status).toBe(200);
      let result = response.body;
      expect(result.user.email).toEqual(verifyUser.email);
      expect(result.user.verification).toEqual(true);
      expect(result.token).toEqual(expect.any(String));
    });

    it("should throw an error if the account is not verified", async () => {
      const response = await request(app.express)
        .post("/api/v1/users/login")
        .send(unVerifyUser);

      expect(response.status).toBe(400);
      let result = response.body;
      expect(result.message).toBe("Please Verify your account");
    });

    it("should throw an error if user is not found", async () => {
      const response = await request(app.express)
        .post("/api/v1/users/login")
        .send(userNotFound);

      expect(response.status).toBe(400);
      let result = response.body;
      expect(result.message).toBe(
        "Unable to find user with that email address"
      );
    });

    it("should throw an error if the password is incorrect", async () => {
      const response = await request(app.express)
        .post("/api/v1/users/login")
        .send(incorrectPassword);

      expect(response.status).toBe(400);
      let result = response.body;
      expect(result.message).toBe("Wrong credentials given");
    });
  });



  describe("PUT /api/v1/users/update/:id", () => {
    const updateUser = {
      first_name: "John",
      last_name: "Doei",
      email: "john@doei.com",
      password: "password",
      role: "user",
      verification: true,
    };

    it("should update a user", async () => {
      // send a PUT request to update the user with ID 1
      const response = await request(app.express)
        .put("/api/v1/users/update/1")
        .set("Authorization", "Bearer token")
        .send(updateUser);
      expect(response.statusCode).toBe(200);
      let result = response.body;
      expect(result.success).toEqual(true);
      expect(result.msg).toBe("User updated successfully");
    });

    it("should handle errors", async () => {
      // send a PUT request to update the user with ID 3
      const response = await request(app.express)
        .put("/api/v1/users/update/3")
        .set("Authorization", "Bearer token")
        .send(updateUser);
      expect(response.statusCode).toBe(400);
      let result = response.body;
      expect(result.message).toBe("User not found");
    });
  });
});
