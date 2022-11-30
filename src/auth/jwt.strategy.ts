import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        //the actual validation is happening here as it goes through this strategy
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "SECRET" // todo move it to env var
        });
    }

    async validate(payload: any) {
        //to return the user:
        //const user = await this.userService.getById(payload.sub)
        //whenever we return here -> becomes available in re    uest.user
        return {
            id: payload.sub,
            name: payload.name
        }
    }

}