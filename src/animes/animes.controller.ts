import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AnimesService } from './animes.service';
import { AnimeDto } from './dto/animes.dto';

@ApiTags('animes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('animes')
export class AnimesController {

  constructor( private readonly animesService: AnimesService ) {}

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
    @Query('q') q: string
  ): Promise<Array<AnimeDto>> {
    return (await this.animesService.search(q)).map(anime => new AnimeDto(anime));
  }

}
