import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePiuService from '@modules/pius/services/CreatePiuService';
import GetAllPiuService from '@modules/pius/services/GetAllPiuService';

export default class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      text, user_id,
    } = req.body;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({
      text, user_id,
    });

    return res.status(201).json(piu);
  }

  public async getAll(req:Request, res: Response): Promise<Response> {
    const getAllPius = container.resolve(GetAllPiuService);
    const pius = await getAllPius.execute();
    return res.status(201).json(pius);
  }
}
