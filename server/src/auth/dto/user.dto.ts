import { IsEmail, Length } from "class-validator";

export class UserInTokenDTO {
  id: number;
  email: string;
  name: string;
}

export class LoginRequestDTO {
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 100)
  password: string;
}

export class CreateUserRequestDTO {
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 100)
  name: string;

  @Length(8, 100)
  password: string;
}

export class EditUserRequestDTO {
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 100)
  name: string;
}

export class EditPasswordRequestDTO {
  @Length(8, 100)
  newPassword: string;

  @Length(8, 100)
  currentPassword: string;
}
