import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,
  ) {}

  public async execute(idUser:string): Promise<void> {
    await this.usersRepository.deleteUser(idUser);
  }
}
