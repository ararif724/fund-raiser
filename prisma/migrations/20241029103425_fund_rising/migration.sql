-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funder" (
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
    "isVerified" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Funder" ("account", "accountType", "amount", "comment", "createdAt", "currency", "email", "id", "isVerified", "name", "password", "paymentRefImage", "phone", "profileImage", "registration", "roll", "transactionId", "updatedAt") SELECT "account", "accountType", "amount", "comment", "createdAt", "currency", "email", "id", "isVerified", "name", "password", "paymentRefImage", "phone", "profileImage", "registration", "roll", "transactionId", "updatedAt" FROM "Funder";
DROP TABLE "Funder";
ALTER TABLE "new_Funder" RENAME TO "Funder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
