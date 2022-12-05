import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

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

    @ManyToOne(() => User, (user) => user.urls)
    user: User
}