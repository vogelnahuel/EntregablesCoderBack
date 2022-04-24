import { Module } from '@nestjs/common';
import { UserDao } from 'src/dao/login';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, UserDao],
})
export class LoginModule {}
