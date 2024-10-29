/*
  Warnings:

  - Added the required column `account` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "roll" INTEGER NOT NULL,
    "registration" INTEGER,
    "transactionId" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT BDT,
    "comment" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "profileImage" TEXT,
    "paymentRefImage" TEXT,
    "accountType" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("amount", "comment", "createdAt", "currency", "email", "id", "name", "password", "registration", "roll", "transactionId", "updatedAt") SELECT "amount", "comment", "createdAt", "currency", "email", "id", "name", "password", "registration", "roll", "transactionId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
