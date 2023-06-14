import { IsEmail, Length } from "class-validator";

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

  @Length(8, 100)
  password: string;
}

export class UserEditDTO {
  @IsEmail()
  @Length(4, 50)
  email: string;
}

export class UserEditNameDTO{
  @Length(4, 100)
  name: string;
}
