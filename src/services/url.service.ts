import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Url} from "../entity/url.entity";
import {Repository} from "typeorm";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {nanoid} from "nanoid";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url) private urlRepository: Repository<Url>
    ) {
    }

    async create(body: CreateUrlDto) {
        const {url} = body
        try {
            let storedUrl = await this.urlRepository.findOneBy({url})
            if (storedUrl) {
                return storedUrl
            }
            console.log(storedUrl);
            const urlCode = nanoid(10)
            const baseUrl = 'http://ngoc'
            const shortUrl = `${baseUrl}/${urlCode}`

            storedUrl = await this.urlRepository.create({url, urlCode, shortUrl})
            await this.urlRepository.save(storedUrl)
            return storedUrl
        } catch (error) {
            throw new UnprocessableEntityException('Server error :(')
        }
    }
}