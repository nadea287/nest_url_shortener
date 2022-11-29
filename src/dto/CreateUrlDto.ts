import {IsString, IsUrl} from "class-validator";

export class CreateUrlDto {
    @IsString()
    @IsUrl(undefined, {message: 'Please provide a valid url...'})
    url: string
}