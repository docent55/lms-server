import { Request, Response, NextFunction } from 'express';

export interface IArticleController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	getArticles: (req: Request, res: Response, next: NextFunction) => void;
}
