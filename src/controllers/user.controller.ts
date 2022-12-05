import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {CreateUserDto} from "../dto/create.user.dto";
import {UserService} from "../services/user.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body)
    }
}