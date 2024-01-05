-- CreateTable
CREATE TABLE "Favorites" (
    "recipeId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("recipeId","authorId")
);

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
