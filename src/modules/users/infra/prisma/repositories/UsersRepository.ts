import prisma from '@shared/infra/prisma/client';
import { Prisma, Users } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UsersDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.users;
  }

  public async deleteUser(idUser: string): Promise<void> {
    await this.ormRepository.delete({
      where: {
        id: idUser,
      },
    });
  }

  public async getUserById(idUser: string): Promise<Users> {
    const user = await this.ormRepository.findFirst({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  public async getAll(): Promise<Users[]> {
    const users = await this.ormRepository.findMany();
    return users;
  }

  public async findByEmailWithRelations(email: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }, { phone }, { cpf }] },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<Users> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async update(idUser: string, data: Partial<ICreateUserDTO>): Promise<Users | null> {
    const newData: Partial<ICreateUserDTO> = { ...data };
    if (newData.birth_date) {
      newData.birth_date = new Date(newData.birth_date); // Converter a string para um objeto Date
    }

    const user = await this.ormRepository.update({
      where: { id: idUser },
      data: newData,
    });

    return user;
  }
}
