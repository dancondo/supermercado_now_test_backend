import { Document } from "mongoose";

export interface User extends Document {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  imageUrl?: string,
  favorites: Array<string>
}