import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../../users/dto/user.dto";
import { User } from "src/users/users.model";

export class AuthResponseDto {
  
  @ApiProperty({
    type: UserDto
  })
  readonly user: UserDto;
  
  @ApiProperty()
  readonly token: string;

  constructor(user: User, token: string) {
    this.user = new UserDto(user);
    this.token = token;
  }

}
