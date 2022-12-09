import {Body, Controller, Get, NotFoundException, Param, Post, Res, UseGuards} from "@nestjs/common";
import {UrlService} from "../services/url.service";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CurrentUser} from "../decorators/current.user.decorator";
import {User} from "../entity/user.entity";
import {Url} from "../entity/url.entity";
import {Response} from "express";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UrlDto} from "../dto/url.dto";

@Controller('urls')
export class UrlController {

    constructor(
        private urlService: UrlService
    ) {

    }

    // @UseGuards(AuthenticatedGuards)
    @UseGuards(JwtAuthGuard)
    @Post()
    @Serialize(UrlDto)
    createUrl(@Body() body: CreateUrlDto, @CurrentUser() user: User) { //require a Bearer token, validate token
        return this.urlService.create(body, user)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUrls(@CurrentUser() user: User): Promise<Array<Url>> {
        return this.urlService.index(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:code')
    async findUrl(@Param('code') code: string, @Res() response: Response): Promise<void> {
        const url = await this.urlService.findByUrlCode(code)
        if (!url) {
            throw new NotFoundException('url not found ...')
        }
        return response.redirect(301, url.url)
    }
}