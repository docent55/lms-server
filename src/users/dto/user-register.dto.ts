import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'Need to send to password' })
	password: string;

	@IsString({ message: 'Need to send name' })
	name: string;
}
