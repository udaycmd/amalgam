/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `header` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "header" SET NOT NULL;
