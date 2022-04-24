import { Body, Controller, Get } from '@nestjs/common';
import { loginDTO } from 'src/dto/loginDTO';
import { LoginDB } from 'src/interfaces/login.interface';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly _LoginService: LoginService) {}

  @Get()
  getLogin(@Body() params: loginDTO): LoginDB {
    return this._LoginService.getLogin(params.email, params.password);
  }
}
