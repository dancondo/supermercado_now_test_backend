import { Controller, UseGuards, Get, Query, Req, Put, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AnimesService } from './animes.service';
import { AnimeDto } from './dto/animes.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('animes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('animes')
export class AnimesController {

  constructor(
    private readonly animesService: AnimesService,
    private readonly userService: UsersService
  ) {}

  @ApiOperation({
    description: 'Search an anime'
  })
  @ApiQuery({
    name: 'q',
    type: String
  })
  @ApiResponse({
    isArray: true,
    type: AnimeDto
  })
  @Get()
  public async search(
    @Query('q') q: string,
    @Req() req: any
  ): Promise<Array<AnimeDto>> {
    return (await this.animesService.search(q)).map(anime => new AnimeDto(anime, req.user.favorites));
  }

  @ApiOperation({
    description: 'Mark or remove Anime from Favorites',
  })
  @ApiResponse({

  })
  @Put('/favorites')
  public async favorite(
    @Req() req: any,
    @Body() animeId: string
  ) {
    return await this.userService.updateFavorites(req.user, animeId);
  }

}
