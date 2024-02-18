/* eslint-disable no-return-await */
import prisma from '@shared/infra/prisma/client';
import { Pius } from '@prisma/client';

import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';

export default class PiuRepository implements IPiusRepository {
  private ormRepository = prisma.pius;

  public async create(data: ICreatePiuDTO): Promise<Pius> {
    const piu = await this.ormRepository.create({ data });

    return piu;
  }

  public async getAll(): Promise<Pius[]> {
    const pius = await this.ormRepository.findMany();
    return pius;
  }

  public async getByIdUser(idUser: string): Promise<Pius|null> {
    const piu = await this.ormRepository.findFirst({ where: { user_id: idUser } });
    return piu;
  }

  public async getById(id: string): Promise<Pius | null> {
    return await this.ormRepository.findFirst({ where: { id } });
  }

  public async delete(idUser: string): Promise<void> {
    await this.ormRepository.deleteMany({ where: { user_id: idUser } });
  }
}
