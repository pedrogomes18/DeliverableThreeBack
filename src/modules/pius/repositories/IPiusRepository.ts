import { Pius } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';

interface IUsersRepository {
  create(data: ICreatePiuDTO): Promise<Pius>;
  getAll(): Promise<Pius[]>;
  getByIdUser(idUser:string): Promise<Pius| null>;
  getById(id:string): Promise<Pius |null>;
  delete(idUser:string): Promise<void>;
}

export default IUsersRepository;
