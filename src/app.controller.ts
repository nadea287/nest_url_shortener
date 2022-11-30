import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./services/auth.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // login(@Request() request) {
  //   // return request.user
  //   //here we send back a cookie and when it goes in another request that requires a user session - guard - it will check if you have that cookie with the session id
  //   return {msg: 'logged in!'}
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request) {
    return this.authService.login(request.user) // return JWT access token
  }
}
