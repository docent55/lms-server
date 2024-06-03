import { ArticleModel } from '@prisma/client';
import { ArticleCreateDto } from './dto/article-create.dto';

export interface IArticleService {
	createArticle: (dto: ArticleCreateDto) => Promise<ArticleModel | null>;
	getArticles: (query: { page: string }) => Promise<ArticleModel[] | null>;
}
