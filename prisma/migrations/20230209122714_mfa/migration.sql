-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mfaCode" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "mfaEnabled" BOOLEAN NOT NULL DEFAULT false;