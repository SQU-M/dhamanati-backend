/*
  Warnings:

  - You are about to drop the column `warrantyMonths` on the `Warranty` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Warranty" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productName" TEXT NOT NULL,
    "purchaseDate" DATETIME NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "notes" TEXT,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Warranty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Warranty" ("createdAt", "expiryDate", "id", "imageUrl", "notes", "productName", "purchaseDate", "userId") SELECT "createdAt", "expiryDate", "id", "imageUrl", "notes", "productName", "purchaseDate", "userId" FROM "Warranty";
DROP TABLE "Warranty";
ALTER TABLE "new_Warranty" RENAME TO "Warranty";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
