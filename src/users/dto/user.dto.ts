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
  readonly password: string;

  constructor({ _id, email, firstName, lastName, imageUrl, password }: User) {
    this.id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
    this.password = password;
  }

}