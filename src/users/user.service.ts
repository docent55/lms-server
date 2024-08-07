import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { UserEntity } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto) {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);

		if (existedUser) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto) {
		const existedUser = await this.usersRepository.find(email);

		if (!existedUser) {
			return false;
		}

		const newUser = new UserEntity(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string) {
		return this.usersRepository.find(email);
	}
}
