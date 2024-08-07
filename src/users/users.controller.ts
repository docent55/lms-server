import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { HTTPError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate-middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	/**
	 * @openapi
	 * '/api/users/login':
	 *  post:
	 *     tags:
	 *     - User
	 *     summary: Login
	 *     requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *           schema:
	 *              $ref: '#/components/schemas/UserLoginDto'
	 *     responses:
	 *      200:
	 *        description: Success
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                jwt:
	 *                  type: string
	 */
	async login(req: Request<object, object, UserLoginDto>, res: Response, next: NextFunction) {
		const result = await this.userService.validateUser(req.body);

		if (!result) {
			return next(new HTTPError(401, 'Error authorization'));
		}

		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));

		this.ok(res, { jwt });
	}

	/**
	 * @openapi
	 * '/api/users/register':
	 *  post:
	 *     tags:
	 *     - User
	 *     summary: Register
	 *     requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *           schema:
	 *              $ref: '#/components/schemas/RegisterUserDto'
	 *     responses:
	 *      200:
	 *        description: Success
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                id:
	 *                  type: number
	 */
	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	) {
		const result = await this.userService.createUser(body);

		if (!result) {
			return next(new HTTPError(422, 'User already exist'));
		}

		this.ok(res, { email: result.email, id: result.id });
	}

	async info({ user }: Request, res: Response, next: NextFunction) {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}

	private signJWT(email: string, secret: string) {
		return new Promise<string>((resolve, reject) => {
			sign(
				{ email, iat: Math.floor(Date.now() / 1000) },
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
