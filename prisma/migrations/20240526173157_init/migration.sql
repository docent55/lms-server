-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleModel" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userModelId" INTEGER NOT NULL,

    CONSTRAINT "ArticleModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleModel" ADD CONSTRAINT "ArticleModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
