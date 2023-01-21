import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_DB }: any = process.env;

const connectDB = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(MONGO_DB);
      console.log("connected to mongodb");
    } catch (error) {
      console.log(error);
    }
  };
    
  export default connectDB;
  