-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleSub" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_creator_application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "age" BOOLEAN NOT NULL,
    "instagramUsername" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "followers" INTEGER,
    "platforms" TEXT,
    "niche" TEXT,
    "promotionalExperience" BOOLEAN,
    "language" TEXT,
    "audienceCountry" TEXT,
    "onCamera" BOOLEAN,
    "weeklyVideos" INTEGER,
    "promotionAccount" BOOLEAN,
    "terms" BOOLEAN NOT NULL,
    "payout" BOOLEAN NOT NULL,
    "disclosure" BOOLEAN NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "creator_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_creator_application" ("age", "audienceCountry", "country", "disclosure", "email", "followers", "fullName", "id", "instagramUrl", "instagramUsername", "language", "niche", "onCamera", "payout", "platforms", "promotionAccount", "promotionalExperience", "submittedAt", "terms", "weeklyVideos", "whatsapp") SELECT "age", "audienceCountry", "country", "disclosure", "email", "followers", "fullName", "id", "instagramUrl", "instagramUsername", "language", "niche", "onCamera", "payout", "platforms", "promotionAccount", "promotionalExperience", "submittedAt", "terms", "weeklyVideos", "whatsapp" FROM "creator_application";
DROP TABLE "creator_application";
ALTER TABLE "new_creator_application" RENAME TO "creator_application";
CREATE UNIQUE INDEX "creator_application_userId_key" ON "creator_application"("userId");
CREATE UNIQUE INDEX "creator_application_email_key" ON "creator_application"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleSub_key" ON "User"("googleSub");
