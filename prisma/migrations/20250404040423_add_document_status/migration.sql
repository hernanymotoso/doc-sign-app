-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'SIGNED');

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING';
