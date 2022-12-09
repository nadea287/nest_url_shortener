import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Url} from "../entity/url.entity";
import {Repository} from "typeorm";
import {CreateUrlDto} from "../dto/CreateUrlDto";
import {nanoid} from "nanoid";
import {User} from "../entity/user.entity";
import {UserType} from "../config/config";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url) private urlRepository: Repository<Url>
    ) {
    }

    async create(body: CreateUrlDto, user: User) {
        const {url} = body
        try {
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
                return storedUrl
            }
            const urlCode = nanoid(10)
            const baseUrl = 'http://ngoc'
            const shortUrl = `${baseUrl}/${urlCode}`

            storedUrl = await this.urlRepository.create({url, urlCode, shortUrl})
            storedUrl.user = user
            await this.urlRepository.save(storedUrl)
            return storedUrl
        } catch (error) {
            console.log(error);
            throw new UnprocessableEntityException('Server error :(')
        }
    }

    async index(user: User): Promise<Array<Url>> {
        if (user.type === UserType.ADMIN) {
            return this.urlRepository.find({})
        }
        return this.urlRepository.find({
            where: {
                userId: user.id
            }
        })
    }

    async findByUrlCode(urlCode) {
        let url = await this.urlRepository.findOne({
            where: {
                urlCode: urlCode
            }
        });

        if (!url) {
            return null
        }
        Object.assign(url, {
            numberOfVisits: url.numberOfVisits += 1
        })
        return await this.urlRepository.save(url)
    }
}