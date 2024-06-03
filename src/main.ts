import { ExceptionFilter } from './errors/exception.filter';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';
import { IArticleRepository } from './article/article.repository.interface';
import { ArticleRepository } from './article/article.repository';
import { IArticleService } from './article/article.service.interface';
import { ArticleService } from './article/article.service';
import { IArticleController } from './article/article.controller.interface';
import { ArticleController } from './article/article.controller';
import { ISwaggerService } from './swagger/swagger.service.interface';
import { SwaggerService } from './swagger/swagger.service';

export const AppBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<ISwaggerService>(TYPES.SwaggerService).to(SwaggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();

	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();

	bind<IArticleController>(TYPES.ArticleController).to(ArticleController).inSingletonScope();
	bind<IArticleService>(TYPES.ArticleService).to(ArticleService).inSingletonScope();
	bind<IArticleRepository>(TYPES.ArticleRepository).to(ArticleRepository).inSingletonScope();

	bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
	const appContainer = new Container();
	appContainer.load(AppBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();

	return { appContainer, app };
}

export const boot = bootstrap();
