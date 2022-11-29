import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Url} from "../entity/url.entity";
import {UrlController} from "../controllers/UrlController";
import {UrlService} from "../services/UrlService";

@Module({
    imports: [TypeOrmModule.forFeature([Url])],
    controllers: [UrlController],
    providers: [UrlService]
})

export class UrlModule {
}