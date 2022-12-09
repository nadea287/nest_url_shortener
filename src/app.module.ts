import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommonModule} from "./common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Url} from "./entity/url.entity";
import {UrlModule} from "./modules/url.module";
import {User} from "./entity/user.entity";
import {PassportModule} from "@nestjs/passport";
import {AuthModule} from "./modules/auth.module";
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./modules/user.module";

@Module({
  imports: [
      CommonModule,
      TypeOrmModule.forFeature([Url, User]),
      UrlModule,
      PassportModule.register({defaultStrategy: 'local'}),
      AuthModule,
      ConfigModule.forRoot(),
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
