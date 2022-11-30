import {Injectable} from "@nestjs/common";
import {PassportSerializer} from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    deserializeUser(payload: any, done: Function): any {
        //you can inject here UserService via constructor
        //const user - this.userService.findById(payload.id)
        // done(null, user)
        done(null, payload)
    }

    serializeUser(user: any, done: Function): any {
        done(null, user)
        // done(null, {id: user.id})
    }

}