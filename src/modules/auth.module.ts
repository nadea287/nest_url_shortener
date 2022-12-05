import {Module} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../auth/local.strategy";
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../auth/jwt.strategy";
import {ConfigModule} from "@nestjs/config";

// @Module({
//     imports: [UserModule, PassportModule.register({session: true})],
//     providers: [AuthService, LocalStrategy, SessionSerializer]
// })

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '12h'}
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [
        AuthService //because we need to import `AuthService` in `AppController`
    ],
})

export class AuthModule {
}