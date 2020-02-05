import { ApiProperty } from "@nestjs/swagger";

export class AnimeDto {
  
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly synopsis: string;

  constructor({ mal_id, image_url, title, synopsis }) {
    this.id = mal_id;
    this.imageUrl = image_url;
    this.title = title;
    this.synopsis = synopsis;
  }

}