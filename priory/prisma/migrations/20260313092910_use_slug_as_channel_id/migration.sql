/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Channel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_channelId_fkey";

-- DropIndex
DROP INDEX "Channel_slug_key";

-- AlterTable
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Channel_pkey" PRIMARY KEY ("slug");

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "header" TEXT;

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "channelId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
