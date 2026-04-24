/*
  Warnings:

  - You are about to drop the column `approved` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_adminId_fkey";

-- DropIndex
DROP INDEX "Blog_adminId_idx";

-- DropIndex
DROP INDEX "BlogImage_blogId_isCover_idx";

-- DropIndex
DROP INDEX "Comment_blogId_approved_idx";

-- DropIndex
DROP INDEX "Comment_createdAt_idx";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "authorName" TEXT NOT NULL DEFAULT 'Admin',
ALTER COLUMN "adminId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "approved",
ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Session";

-- CreateIndex
CREATE INDEX "Comment_blogId_status_idx" ON "Comment"("blogId", "status");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
