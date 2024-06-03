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
 *        name:
 *        password:
 *          type: string
 *          default: password12345678
 *        passwordConfirmation:
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        id:
 *          type: number
 */

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString()
	password: string;
}
