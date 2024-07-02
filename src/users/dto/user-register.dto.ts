import { IsEmail, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserDto:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - name
 *      properties:
 *        email:
 *          type: string
 *          default: ivan@mail.com
 *        password:
 *          type: string
 *          default: password12345678
 *        name:
 *          type: string
 *          default: Ivan
 */
export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'Need to send to password' })
	password: string;

	@IsString({ message: 'Need to send name' })
	name: string;
}
