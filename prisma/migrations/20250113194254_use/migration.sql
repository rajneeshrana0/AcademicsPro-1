/*
  Warnings:

  - You are about to drop the `_StudentToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StudentToUser" DROP CONSTRAINT "_StudentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToUser" DROP CONSTRAINT "_StudentToUser_B_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'student';

-- DropTable
DROP TABLE "_StudentToUser";
