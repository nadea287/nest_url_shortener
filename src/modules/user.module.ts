import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {UserService} from "../services/user.service";
import {UserController} from "../controllers/user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {
}
