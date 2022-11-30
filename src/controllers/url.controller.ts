import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {UrlService} from "../services/url.service";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {AuthenticatedGuards} from "../auth/authenticated.guards";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('urls')
export class UrlController {

    constructor(
        private urlService: UrlService
    ) {

    }

    // @UseGuards(AuthenticatedGuards)
    @UseGuards(JwtAuthGuard)
    @Post()
    createUrl(@Body() body: CreateUrlDto) { //require a Bearer token, validate token
        return this.urlService.create(body)
    }
}