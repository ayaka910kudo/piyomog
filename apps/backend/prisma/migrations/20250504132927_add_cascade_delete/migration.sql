-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_baby_foods_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "baby_food_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    CONSTRAINT "baby_foods_ingredients_baby_food_id_fkey" FOREIGN KEY ("baby_food_id") REFERENCES "baby_foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "baby_foods_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_baby_foods_ingredients" ("baby_food_id", "id", "ingredient_id") SELECT "baby_food_id", "id", "ingredient_id" FROM "baby_foods_ingredients";
DROP TABLE "baby_foods_ingredients";
ALTER TABLE "new_baby_foods_ingredients" RENAME TO "baby_foods_ingredients";
CREATE UNIQUE INDEX "baby_foods_ingredients_baby_food_id_ingredient_id_key" ON "baby_foods_ingredients"("baby_food_id", "ingredient_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
