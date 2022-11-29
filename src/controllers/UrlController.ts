import {Body, Controller, Post} from "@nestjs/common";
import {UrlService} from "../services/UrlService";
import {CreateUrlDto} from "../dto/CreateUrlDto";

@Controller('urls')
export class UrlController {

    constructor(
        private urlService: UrlService
    ) {

    }

    @Post()
    createUrl(@Body() body: CreateUrlDto) {
        return this.urlService.create(body)
    }
}