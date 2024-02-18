import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateUserService from '@modules/users/services/CreateUserService';
import GetAllUsersService from '@modules/users/services/GetAllUserService';
import GetUserById from '@modules/users/services/GetUserByIdService';

export default class UserController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAll = container.resolve(GetAllUsersService);
    const users = await getAll.execute();
    return res.status(201).json(users);
  }

  public async getUserById(req:Request, res: Response): Promise<Response> {
    const {
      idUser,
    } = req.params;
    const getUserById = container.resolve(GetUserById);
    const user = await getUserById.execute(idUser);
    return res.status(201).json(user);
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
