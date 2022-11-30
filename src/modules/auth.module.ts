import {Module} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../auth/local.strategy";
import {UserModule} from "./user.module";
import {SessionSerializer} from "../auth/session.serializer";

@Module({
    imports: [UserModule, PassportModule.register({session: true})],
    providers: [AuthService, LocalStrategy, SessionSerializer]
})

export class AuthModule {
}