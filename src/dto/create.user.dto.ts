import {IsEnum, IsString} from "class-validator";
import {UserType} from "../config/config";

export class CreateUserDto {
    @IsString()
    username: string

    @IsString()
    @IsEnum(UserType, {each: true, message: 'type must be either citizen or admin'})
    type: string

    @IsString()
    password: string
}