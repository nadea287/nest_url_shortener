import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({username: username})
    }

}