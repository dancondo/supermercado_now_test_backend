import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly users: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.users.findOne({ email: email });
  }

  async findById(id): Promise<User> {
    return this.users.findById(id).exec();
  }
}
