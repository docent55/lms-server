import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { UserEntity } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	async createUser({ email, name, password }: UserRegisterDto) {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get('SALT');
		console.log('salt', salt);
		await newUser.setPassword(password, Number(salt));
		return newUser;
	}

	async validateUser(dto: UserLoginDto) {
		return true;
	}
}
