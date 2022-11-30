import {Controller, Post, Request, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "../auth/local-auth.guard";

@Controller('auth')
export class AuthController {

    // @UseGuards(LocalAuthGuard)
    // @Post('/login')
    // login(@Request() request) {
    //     return request.user
    // }
}