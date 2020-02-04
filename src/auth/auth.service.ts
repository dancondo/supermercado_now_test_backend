import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser({email, password}: AuthDto): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(user: CreateUserDto): Promise<User> {
    const oldUser = await this.usersService.findOne(user.email);
    if (oldUser) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'USER ALREADY EXISTS'
      }, 409)
    }
    return this.usersService.create(user);
  }

  async signJwt(user: User) {
    const payload = { id: user._id, firstName: user.firstName }
    return this.jwtService.sign(payload);
  }

  async findByPayload(payload: any) {
    return this.usersService.findById(payload.id);
  }

}