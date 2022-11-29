import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommonModule} from "./common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Url} from "./entity/url.entity";
import {UrlModule} from "./modules/url.module";
import {User} from "./entity/user.entity";

@Module({
  imports: [
      CommonModule,
      TypeOrmModule.forFeature([Url, User]),
      UrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
