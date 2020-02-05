import { Controller, Get, HttpStatus, UseGuards, Put, Request, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) { }

  @ApiOperation({
    description: 'Gets all users profile'    
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users profile dtos',
    type: UserDto,
    isArray: true
  })
  @Get()
  public async index(): Promise<Array<UserDto>> {
    return (await this.userService.findAll()).map(user => new UserDto(user));
  }

  @ApiOperation({
    description: 'Gets a user profile'    
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user profile dto',
    type: UserDto
  })
  @Get('me')
  public async show(
    @Request() req,
  ): Promise<UserDto> {
    return new UserDto(req.user);
  }
}
