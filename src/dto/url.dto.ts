import {Expose} from "class-transformer";

export class UrlDto {
    @Expose()
    id: number

    @Expose()
    userId: number

    @Expose()
    urlCode: string

    @Expose()
    url: string

    @Expose()
    shortUrl: string

    @Expose()
    numberOfVisits: number

}