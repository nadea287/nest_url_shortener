import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create.user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({username: username})
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOneBy({id: id})
    }

    async create(body: CreateUserDto) {
        let user = new User()
        user.username = body.username
        user.type = body.type
        user.password = await bcrypt.hash(body.password, 10)
        return await this.userRepository.save(user)
    }

}