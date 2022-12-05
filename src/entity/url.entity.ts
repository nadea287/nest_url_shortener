import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    urlCode: string

    @Column()
    url: string

    @Column()
    shortUrl: string

    @Column({ default: 0 })
    numberOfVisits: number

    @ManyToOne(() => User, (user) => user.urls)
    user: User
}