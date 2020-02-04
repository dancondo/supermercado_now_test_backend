import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";

export class UserDto {
  
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  constructor({ _id, email, password, firstName, lastName }: User) {
    this.id = _id;
    this.email = email;
    this.password = password;
     this.firstName = firstName;
     this.lastName = lastName;
  }

}