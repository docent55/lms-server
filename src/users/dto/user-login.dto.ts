import { IsEmail, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *  schemas:
 *    UserLoginDto:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: ivan@mail.com
 *        password:
 *          type: string
 *          default: password12345678
 */

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString()
	password: string;
}
