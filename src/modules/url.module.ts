import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Url} from "../entity/url.entity";
import {UrlController} from "../controllers/url.controller";
import {UrlService} from "../services/url.service";
import {AuthModule} from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Url]), AuthModule],
    controllers: [UrlController],
    providers: [UrlService]
})

export class UrlModule {
}