import {Module} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../auth/local.strategy";
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../auth/jwt.strategy";

// @Module({
//     imports: [UserModule, PassportModule.register({session: true})],
//     providers: [AuthService, LocalStrategy, SessionSerializer]
// })

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'SECRET', //todo put it in your env variables
            signOptions: {expiresIn: '60s'}
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [
        AuthService //because we need to import `AuthService` in `AppController`
    ],
})

export class AuthModule {
}