import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  newData: Partial<Users>;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, newData }: IRequest): Promise<Users | null> {
    try {
      // Verificar se o usuário existe
      const existingUser = await this.usersRepository.getUserById(userId);

      // Se o usuário existir, atualize os dados
      if (existingUser) {
        const updatedUser = await this.usersRepository.update(userId, newData);
        return updatedUser;
      }
      throw new Error('User not found');
    } catch (error) {
      // Se ocorrer um erro ao atualizar o usuário
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
}
