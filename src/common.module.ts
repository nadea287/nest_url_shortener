import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import _config from "./config/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'mysql',
                    host: _config.database.host,
                    port: _config.database.port,
                    username: _config.database.username,
                    charset: _config.database.charset,
                    password: _config.database.password,
                    // database: config.database.database,
                    database: config.get<string>('DB_NAME'),
                    entities: [''],
                    synchronize: true,
                    logging: false,
                    autoLoadEntities: true
                }
            }
        })
    ]
})
export class CommonModule {
}

