import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateUserService from '@modules/users/services/CreateUserService';
import GetAllUsersService from '@modules/users/services/GetAllUserService';
import GetUserByIdService from '@modules/users/services/GetUserByIdService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UserController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAll = container.resolve(GetAllUsersService);
    const users = await getAll.execute();
    return res.status(200).json(users);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { idUser } = req.params;
    await container.resolve(DeleteUserService).execute(idUser);
    return res.status(204).send();
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { idUser } = req.params;
    const getUserById = container.resolve(GetUserByIdService);
    const user = await getUserById.execute(idUser);
    return res.status(200).json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, birth_date, cpf, phone, password,
    } = req.body;

    // Verifica se algum dos campos obrigatórios está vazio
    if (!name || !email || !birth_date || !cpf || !phone || !password) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { idUser } = req.params;
    const newData = req.body;

    try {
      const updateUserService = container.resolve(UpdateUserService);
      const updatedUser = await updateUserService.execute({ userId: idUser, newData });
      return res.status(200).json(updatedUser); // Alterei o status code para 200
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
