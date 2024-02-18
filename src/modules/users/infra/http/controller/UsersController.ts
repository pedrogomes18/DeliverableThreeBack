import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateUserService from '@modules/users/services/CreateUserService';
import GetAllUsersService from '@modules/users/services/GetAllUserService';

export default class UserController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAll = container.resolve(GetAllUsersService);
    const users = getAll.execute();
    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      birth_date,
      cpf,
      phone,
      password,
    } = req.body;

    const parsedDate = parseISO(birth_date);

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      password,
      birth_date: parsedDate,
    });

    user.password = '###';

    return res.status(201).json(user);
  }
}
