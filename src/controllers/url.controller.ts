import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {UrlService} from "../services/url.service";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CurrentUser} from "../decorators/current.user.decorator";
import {User} from "../entity/user.entity";

@Controller('urls')
export class UrlController {

    constructor(
        private urlService: UrlService
    ) {

    }

    // @UseGuards(AuthenticatedGuards)
    @UseGuards(JwtAuthGuard)
    @Post()
    createUrl(@Body() body: CreateUrlDto, @CurrentUser() user: User) { //require a Bearer token, validate token
        return this.urlService.create(body, user)
    }
}