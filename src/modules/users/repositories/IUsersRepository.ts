import { Users } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<Users | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  getAll(): Promise<Users[]>;
  getUserById(idUser: string): Promise<Users>;
  deleteUser(idUser: string): Promise<void>;
  update(idUser: string, data: Partial<ICreateUserDTO>): Promise<Users | null>;
}

export default IUsersRepository;
