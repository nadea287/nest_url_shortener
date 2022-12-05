import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as passport from "passport";
import * as session from "express-session";
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }))
    app.use(cookieParser())
    // app.use(session({
    //     secret: 'keyboard cat',
    //     //todo: by default express session uses in memory store, that doens't work well in production - it's gonna have memory leaks (Redis / db ~ whenever you wanna save your session) ! covered in the documentation of `express-session`
    //     resave: false,
    //     saveUninitialized: true,
    //     // cookie: { secure: true }
    //     cookie: { maxAge: 360000 }
    // }))
    // app.use(passport.initialize())
    // app.use(passport.session())
    await app.listen(3000);
}

bootstrap();
