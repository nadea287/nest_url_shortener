import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Url} from "../entity/url.entity";
import {Repository} from "typeorm";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {nanoid} from "nanoid";
import {User} from "../entity/user.entity";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url) private urlRepository: Repository<Url>
    ) {
    }

    async create(body: CreateUrlDto, user: User) {
        const {url} = body
        try {
            // let storedUrl = await this.urlRepository.findOneBy({
            //     url
            // })
            let storedUrl = await this.urlRepository.findOne({
                relations: ['user'],
                where: {
                    url: url,
                    user: {
                        id: user.id
                    }
                }
            })
            if (storedUrl) {
                // if (storedUrl.user.id === user.id) {
                return storedUrl
                // }
                // const newUrlRecord = await this.urlRepository.create(storedUrl)
                // newUrlRecord.user = user
                // await this.urlRepository.save(newUrlRecord)
                // return newUrlRecord
            }
            const urlCode = nanoid(10)
            const baseUrl = 'http://ngoc'
            const shortUrl = `${baseUrl}/${urlCode}`

            storedUrl = await this.urlRepository.create({url, urlCode, shortUrl})
            storedUrl.user = user
            await this.urlRepository.save(storedUrl)
            return storedUrl
        } catch (error) {
            throw new UnprocessableEntityException('Server error :(')
        }
    }
}