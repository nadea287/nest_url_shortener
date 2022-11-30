import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import config from "./config/config";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: config.database.host,
            port: config.database.port,
            username: config.database.username,
            charset: config.database.charset,
            password: config.database.password,
            database: config.database.database,
            entities: [''],
            synchronize: true,
            logging: false,
            autoLoadEntities: true
        })
    ]
})
export class CommonModule {
}
