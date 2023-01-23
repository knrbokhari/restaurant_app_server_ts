import { Document } from 'mongoose';

export default interface User extends Document {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
  phone?: string;
  address?: string;
  orders?: Array<string>;

  isValidPassword(password: string): Promise<Error | boolean>;
}