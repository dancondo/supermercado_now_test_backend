import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

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

  async update(id, user: UpdateUserDto): Promise<User> {
    return this.users.findOneAndUpdate({ _id: id }, user, { new: true });
  }

  async updateFavorites(user: User, animeId): Promise<User> {
    const favIndex = user.favorites.indexOf(animeId);
    if (favIndex) {
      user.favorites.splice(favIndex, 1)
    } else {
      user.favorites.push(animeId);
    }
    return this.users.findOneAndUpdate({ _id: user.id }, { favorites: user.favorites }, { new: true })
  }

}
