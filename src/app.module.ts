import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommonModule} from "./common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Url} from "./entity/url.entity";
import {UrlModule} from "./modules/url.module";
import {User} from "./entity/user.entity";
import {AuthController} from "./controllers/auth.controller";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./auth/local.strategy";
import {AuthService} from "./services/auth.service";
import {AuthModule} from "./modules/auth.module";

@Module({
  imports: [
      CommonModule,
      TypeOrmModule.forFeature([Url, User]),
      UrlModule,
      PassportModule.register({defaultStrategy: 'local'})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
