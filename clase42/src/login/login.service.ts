import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDao } from 'src/dao/login';
import { LoginDB } from 'src/interfaces/login.interface';

@Injectable()
export class LoginService {
  constructor(private readonly _UserDao: UserDao) {}

  getLogin(email: string, password: string): LoginDB {
    const result = UserDao.getUser(email, password);
    if (!result) {
      throw new NotFoundException('No se encontro el valor');
    }
    return result;
  }
}
