import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					const data = payload as { email: string };
					req.user = data.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
