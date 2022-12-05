import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

//if you create custom guards - you have to implement CanActivate interface
//info for sessions
export class AuthenticatedGuards implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return request.isAuthenticated();
    }

}