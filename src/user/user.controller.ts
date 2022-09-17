import { Controller, Get } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/public')
  @Unprotected()
  getpublic(): string {
    return `${this.userService.getHello()} from public`;
  }

  @Get('/user')
  @Roles({ roles: ['realm:USER'] })
  getUser(): string {
    return `${this.userService.getHello()} from user`;
  }

  @Get('/admin')
  @Roles({ roles: ['realm:ADMIN'] })
  getAdmin(): string {
    return `${this.userService.getHello()} from admin`;
  }

  @Get('/all')
  getAll(): string {
    return `${this.userService.getHello()} from all`;
  }
}
