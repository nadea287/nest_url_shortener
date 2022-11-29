import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    urlCode: string

    @Column()
    url: string

    @Column()
    shortUrl: string
}