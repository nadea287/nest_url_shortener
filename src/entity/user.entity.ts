import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}