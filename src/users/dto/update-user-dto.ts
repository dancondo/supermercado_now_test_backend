import { ApiProperty } from "@nestjs/swagger";
import { File } from "aws-sdk/clients/codecommit";

export class UpdateUserDto {
  
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly file: any

  @ApiProperty()
  imageUrl?: string;
}