import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {

    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)

        if (user && await bcrypt.compare(password, user.password)) {
            const {password, username, ...rest} = user
            return rest
        }

        return null
    }

    async login(user: any) {
        const payload = {name: user.name, sub: user.id} //information that we wanna save in our jwt

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}