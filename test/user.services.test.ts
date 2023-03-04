import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import request from "supertest";
import App from "../src/app";
import UserController from "../src/resources/user/user.controller";
// import UserService from "../src/resources/user/user.service";
jest.mock('../src/middleware/authenticated.middleware')

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
      const response = await request(app.express)
        .get("/api/v1/users");

      expect(response.status).toBe(200);
      let users = response.body;
      expect(users).toEqual(expect.any(Array));
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]._id).toEqual(expect.any(String));
    });
  });

//   describe("GET /api/v1/users/", () => {
//     it("responds with an array of users", async () => {
//       const response = await request(app.express)
//         .get("/api/v1/users")
//         .send(user);

//       expect(response.status).toBe(200);
//       let users = response.body;
//       expect(users).toEqual(expect.any(Array));
//       expect(users.length).toBeGreaterThan(0);
//       expect(users[0]._id).toEqual(expect.any(String));
//     });
//   });
});
