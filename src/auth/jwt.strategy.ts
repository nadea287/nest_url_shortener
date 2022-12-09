import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {UserService} from "../services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        //the actual validation is happening here as it goes through this strategy
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        //to return the user:
        //const user = await this.userService.getById(payload.sub)
        //whenever we return here -> becomes available in re    uest.user
        // return {
        //     id: payload.sub,
        //     name: payload.username
        // }
        return await this.userService.findOneById(payload.sub)
    }

}