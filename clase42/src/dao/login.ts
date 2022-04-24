import { LoginDB } from 'src/interfaces/login.interface';

const DB: LoginDB[] = [
  {
    document: '1234',
    email: 'test@gmail.com',
    age: 25,
    name: 'nahuel',
    id: 1,
    password: '1234',
  },
  {
    document: '12345',
    email: 'test@gmail.net',
    age: 26,
    name: 'nahuel',
    id: 2,
    password: '12345',
  },
];

export class UserDao {
  document: string;
  email: string;
  age: number;
  name: string;

  public static getUser(email: string, password: string) {
    //buscar en la base si existe

    if (email) {
      const datoBuscado: LoginDB = DB.reduce((prev) => {
        if (prev.email === email) {
          return prev;
        }
      });
      if (datoBuscado && datoBuscado.password === password) {
        return datoBuscado;
      } else {
        return null;
      }
    }
    return null;
  }
}
