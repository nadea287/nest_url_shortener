import {AuthGuard} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";

@Injectable()
//REGISTER THE STRATEGY IN AUTH MODULE
export class JwtAuthGuard extends AuthGuard('jwt'){

}