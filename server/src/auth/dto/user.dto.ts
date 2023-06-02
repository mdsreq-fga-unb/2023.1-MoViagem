import { User } from "@prisma/client";
import { Length, IsEmail } from "class-validator";

export class UserResponseDTO {
  id: number;
  email: string;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}

export class UserLoginDTO {
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 100)
  password: string;
}

export class UserCreateDTO {
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 100)
  name: string;

  @Length(4, 100)
  password: string;
}

export class UserInRequest {
  id: number;
}
