import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { UserService } from './user.service';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	userRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');

		userRepository.create = jest.fn().mockImplementationOnce((user: UserModel) => ({
			name: user.name,
			email: user.email,
			password: user.password,
			id: 1,
		}));

		createdUser = await usersService.createUser({
			email: 'qw1@mail.com',
			name: 'Konan',
			password: '12345678',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('12345678');
	});

	it('validate user - success', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'qw1@mail.com',
			password: '12345678',
		});

		expect(res).toBeTruthy();
	});

	it('validate user - wrong password', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'qw1@mail.com',
			password: '123456789',
		});

		expect(res).toBeFalsy();
	});

	it('validate user - not find user', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: 'qw112@mail.com',
			password: '123456789',
		});

		expect(res).toBeFalsy();
	});
});
