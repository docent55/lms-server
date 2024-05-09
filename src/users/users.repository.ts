import { inject, injectable } from 'inversify';
import { UserEntity } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, name, password }: UserEntity) {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				name,
				password,
			},
		});
	}

	async find(email: string) {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
