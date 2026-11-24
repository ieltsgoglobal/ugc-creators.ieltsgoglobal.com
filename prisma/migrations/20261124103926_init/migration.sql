-- CreateTable
CREATE TABLE "creator_application" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "creator_application_email_key" ON "creator_application"("email");
