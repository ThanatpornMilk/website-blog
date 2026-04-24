/*
  Warnings:

  - Made the column `approved` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "approved" SET NOT NULL,
ALTER COLUMN "approved" SET DEFAULT false;
