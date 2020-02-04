import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
) {}

  @Post()
  @ApiOperation({
    description: 'Login a user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user was successfully authenticated',
    type: AuthResponseDto
  })
  async login(
    @Body() user: AuthDto
  ): Promise<AuthResponseDto> {
    const validatedUser = await this.authService.validateUser(user);
    const token = await this.authService.signJwt(validatedUser);
    return new AuthResponseDto(validatedUser, token)
  }

  @Post('/register')
  @ApiOperation({
    description: 'Create a user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user was successfully created',
    type: AuthResponseDto
  })
  async register(
    @Body() user: CreateUserDto
  ): Promise<AuthResponseDto> {
    const validatedUser = await this.authService.registerUser(user);
    const token = await this.authService.signJwt(validatedUser);
    return new AuthResponseDto(validatedUser, token)
  }

}
