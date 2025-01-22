/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name";
