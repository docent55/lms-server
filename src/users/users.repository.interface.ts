import { UserModel } from '@prisma/client';
import { UserEntity } from './user.entity';

export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (user: string) => Promise<UserModel | null>;
}
