-- AlterTable
ALTER TABLE "BlogImage" ADD COLUMN     "isCover" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "BlogImage_blogId_isCover_idx" ON "BlogImage"("blogId", "isCover");
