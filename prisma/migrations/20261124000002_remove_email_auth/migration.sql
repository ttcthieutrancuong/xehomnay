-- Remove email verification and password reset infrastructure. User accounts remain intact.
DROP TABLE IF EXISTS "EmailToken";
DROP TYPE IF EXISTS "EmailTokenType";
ALTER TABLE "User" DROP COLUMN IF EXISTS "emailVerified";
