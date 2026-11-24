CREATE TABLE "InstagramAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "assignedToUserId" TEXT,
    CONSTRAINT "InstagramAccount_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "InstagramAccount_username_key" ON "InstagramAccount"("username");
CREATE INDEX "InstagramAccount_assignedToUserId_idx" ON "InstagramAccount"("assignedToUserId");
