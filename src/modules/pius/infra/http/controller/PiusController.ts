import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePiuService from '@modules/pius/services/CreatePiuService';

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
}
