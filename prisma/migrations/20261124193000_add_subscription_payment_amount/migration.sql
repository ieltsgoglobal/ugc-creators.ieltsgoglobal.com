BEGIN;

LOCK TABLE "subscriptions" IN ACCESS EXCLUSIVE MODE;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM "subscriptions") THEN
        RAISE EXCEPTION 'Expected subscriptions to be empty before adding required payment fields';
    END IF;
END $$;

ALTER TABLE "subscriptions"
    ADD COLUMN "paidAmountMinor" INTEGER NOT NULL,
    ADD COLUMN "currency" TEXT NOT NULL;

COMMIT;
