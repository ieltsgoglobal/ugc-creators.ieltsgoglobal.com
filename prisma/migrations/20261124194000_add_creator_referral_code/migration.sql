BEGIN;

ALTER TABLE "creator_referrals" ADD COLUMN "code" TEXT;
CREATE UNIQUE INDEX "creator_referrals_code_key" ON "creator_referrals"("code");
DROP INDEX "creator_referrals_url_key";

COMMIT;
