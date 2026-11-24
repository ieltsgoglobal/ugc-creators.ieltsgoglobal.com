-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "CreatorWalletTransactionKind" AS ENUM ('CREDIT', 'WITHDRAWAL_HOLD', 'WITHDRAWAL_RELEASE');

-- CreateEnum
CREATE TYPE "CreatorWithdrawalStatus" AS ENUM ('PENDING', 'PAID', 'REJECTED');

-- CreateEnum
CREATE TYPE "CreatorPayoutMethod" AS ENUM ('UPI', 'PAYPAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleSub" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_application" (
    "id" TEXT NOT NULL,
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
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "creator_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstagramAccount" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "assignedToUserId" TEXT,

    CONSTRAINT "InstagramAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_withdrawal_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestKey" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "status" "CreatorWithdrawalStatus" NOT NULL DEFAULT 'PENDING',
    "payoutMethod" "CreatorPayoutMethod",
    "payoutDestination" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_withdrawal_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_wallet_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "withdrawalRequestId" TEXT,
    "kind" "CreatorWalletTransactionKind" NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creator_wallet_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_wallets" (
    "userId" TEXT NOT NULL,
    "payoutMethod" "CreatorPayoutMethod" NOT NULL,
    "payoutDestination" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_wallets_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "creator_referrals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "creatorReferralId" TEXT NOT NULL,
    "externalReference" TEXT NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleSub_key" ON "User"("googleSub");

-- CreateIndex
CREATE UNIQUE INDEX "creator_application_userId_key" ON "creator_application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "creator_application_email_key" ON "creator_application"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramAccount_username_key" ON "InstagramAccount"("username");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramAccount_assignedToUserId_key" ON "InstagramAccount"("assignedToUserId");

-- CreateIndex
CREATE INDEX "creator_withdrawal_requests_userId_createdAt_idx" ON "creator_withdrawal_requests"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "creator_withdrawal_requests_userId_requestKey_key" ON "creator_withdrawal_requests"("userId", "requestKey");

-- CreateIndex
CREATE INDEX "creator_wallet_transactions_userId_createdAt_idx" ON "creator_wallet_transactions"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "creator_wallet_transactions_withdrawalRequestId_kind_key" ON "creator_wallet_transactions"("withdrawalRequestId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "creator_referrals_userId_key" ON "creator_referrals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "creator_referrals_url_key" ON "creator_referrals"("url");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_externalReference_key" ON "subscriptions"("externalReference");

-- CreateIndex
CREATE INDEX "subscriptions_creatorReferralId_subscribedAt_idx" ON "subscriptions"("creatorReferralId", "subscribedAt");

-- AddForeignKey
ALTER TABLE "creator_application" ADD CONSTRAINT "creator_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramAccount" ADD CONSTRAINT "InstagramAccount_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_withdrawal_requests" ADD CONSTRAINT "creator_withdrawal_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_wallet_transactions" ADD CONSTRAINT "creator_wallet_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_wallet_transactions" ADD CONSTRAINT "creator_wallet_transactions_withdrawalRequestId_fkey" FOREIGN KEY ("withdrawalRequestId") REFERENCES "creator_withdrawal_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_wallets" ADD CONSTRAINT "creator_wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_referrals" ADD CONSTRAINT "creator_referrals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_creatorReferralId_fkey" FOREIGN KEY ("creatorReferralId") REFERENCES "creator_referrals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

