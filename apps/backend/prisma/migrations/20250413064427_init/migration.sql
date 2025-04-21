-- CreateTable
CREATE TABLE "baby_foods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "reaction_stars" INTEGER NOT NULL,
    "memo" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "baby_foods_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "baby_food_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    CONSTRAINT "baby_foods_ingredients_baby_food_id_fkey" FOREIGN KEY ("baby_food_id") REFERENCES "baby_foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "baby_foods_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "baby_foods_ingredients_baby_food_id_ingredient_id_key" ON "baby_foods_ingredients"("baby_food_id", "ingredient_id");
