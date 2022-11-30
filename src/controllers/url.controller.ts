import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {UrlService} from "../services/url.service";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {AuthenticatedGuards} from "../auth/authenticated.guards";

@Controller('urls')
export class UrlController {

    constructor(
        private urlService: UrlService
    ) {

    }

    @UseGuards(AuthenticatedGuards)
    @Post()
    createUrl(@Body() body: CreateUrlDto) {
        return this.urlService.create(body)
    }
}