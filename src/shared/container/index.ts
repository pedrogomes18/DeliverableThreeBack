import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import PiuRepository from '@modules/pius/infra/prisma/repositories/PiusRepository';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IPiusRepository>('PiusRepository', PiuRepository);
