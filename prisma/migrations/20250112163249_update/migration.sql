/*
  Warnings:

  - You are about to drop the column `email` on the `School` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "School_email_key";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "email";
