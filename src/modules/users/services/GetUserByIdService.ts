import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetUserById {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
  ) {}

  public async execute(idUser: string):Promise<Users> {
    const user = await this.usersRepository.getUserById(idUser);
    return user;
  }
}
