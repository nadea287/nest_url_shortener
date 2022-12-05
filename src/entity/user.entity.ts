import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Url} from "./url.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(() => Url, (url) => url.user)
    urls: Url[]
}