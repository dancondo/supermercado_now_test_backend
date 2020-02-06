import { Controller, Get, HttpStatus, UseGuards, Put, Request, Body, UseInterceptors, UploadedFile, Res, Next } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ImageUploadService } from 'src/images/images.service';
import { UpdateUserDto } from './dto/update-user-dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    private readonly imageService: ImageUploadService
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

  @ApiOperation({
    description: 'Updates an user profile'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated an user'
  })
  @Put('me')
  @UseInterceptors(FileInterceptor('image'))
  public async update(
    @Request() req,
    @Body() body,
    @UploadedFile() image,
    @Body() user: UpdateUserDto
  ): Promise<UserDto> {
    console.log('image', image);
    if (image) {
      user.imageUrl = await this.imageService.upload(image);
    }
    return new UserDto(await this.userService.update(req.user._id, user));
  }

}
