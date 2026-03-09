/*
  Warnings:

  - You are about to drop the column `channel` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_threadId_fkey";

-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_channelId_fkey";

-- DropIndex
DROP INDEX "Post_threadId_id_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "channel";

-- CreateIndex
CREATE INDEX "Post_threadId_ucode_idx" ON "Post"("threadId", "ucode");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
