import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly users: Model<User>) {}

  async findAll(): Promise<Array<User>> {
    return this.users.find().exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.findOne({ email: email });
  }

  async findById(id): Promise<User> {
    return this.users.findById(id).exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.users.create(user);
  }

}
