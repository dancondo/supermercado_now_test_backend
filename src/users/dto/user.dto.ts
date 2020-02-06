import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";

export class UserDto {
  
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly imageUrl?: string;


  @ApiProperty()
  readonly favoritesCount: number;

  constructor({ _id, email, firstName, lastName, imageUrl, favorites }: User) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
    this.favoritesCount = favorites ? favorites.length : 0
  }

}