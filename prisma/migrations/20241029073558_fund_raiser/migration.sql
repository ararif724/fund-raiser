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
INSERT INTO "new_User" ("account", "accountType", "amount", "comment", "createdAt", "currency", "email", "id", "name", "password", "paymentRefImage", "phone", "profileImage", "registration", "roll", "transactionId", "updatedAt") SELECT "account", "accountType", "amount", "comment", "createdAt", "currency", "email", "id", "name", "password", "paymentRefImage", "phone", "profileImage", "registration", "roll", "transactionId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
