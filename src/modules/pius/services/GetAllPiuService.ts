import { inject, injectable } from 'tsyringe';
import { Pius } from '@prisma/client';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class GetAllPiusService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute(): Promise<Pius[]> {
    const pius = await this.piusRepository.getAll();
    return pius;
  }
}
