import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {Strategy} from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice: AuthService) {
        super(); //config for strategy
    }

    async validate(username: string, password: string) {
        const user = await this.authservice.validateUser(username, password)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}