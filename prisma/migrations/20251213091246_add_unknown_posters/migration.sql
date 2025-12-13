/*
  Warnings:

  - You are about to drop the column `poster_id` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `pass` on the `Poster` table. All the data in the column will be lost.
  - Added the required column `mod_id` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passw` to the `Poster` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Poster` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "Action" ADD VALUE 'unban_ip';

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_poster_id_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_creator_id_fkey";

-- DropIndex
DROP INDEX "Poster_name_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "poster_id",
ADD COLUMN     "meta" JSONB,
ADD COLUMN     "mod_id" TEXT NOT NULL,
ADD COLUMN     "space_id" TEXT;

-- AlterTable
ALTER TABLE "Discussion" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "trip" TEXT,
ALTER COLUMN "creator_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "trip" TEXT,
ALTER COLUMN "poster_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Poster" DROP COLUMN "pass",
ADD COLUMN     "passw" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_mod_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "Poster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Poster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Poster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
