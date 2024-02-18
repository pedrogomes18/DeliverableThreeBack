/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe';
import { Pius } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  user_id: string;
  text: string;
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    user_id,
    text,
  }: IRequest): Promise<Pius> {
    const existingPiu = await this.piusRepository.getByIdUser(user_id);
    if (existingPiu) {
      throw new AppError('A Piu with the same user id already exists');
    }

    const newPiu = await this.piusRepository.create({
      user_id,
      text,
    });

    return newPiu;
  }
}
