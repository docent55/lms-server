import { ArticleModel } from '@prisma/client';
import { ArticleEntity } from './article.entity';

export interface IArticleRepository {
	create: (article: ArticleEntity) => Promise<ArticleModel>;
	getArticles: (params: { page: string }) => Promise<ArticleModel[] | null>;
}
