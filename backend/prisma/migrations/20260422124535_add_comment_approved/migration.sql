-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Comment_blogId_approved_idx" ON "Comment"("blogId", "approved");
