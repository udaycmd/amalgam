-- CreateEnum
CREATE TYPE "Role" AS ENUM ('poster', 'mod', 'master');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('create_space', 'delete_space', 'create_discussion', 'delete_discussion', 'create_post', 'delete_post', 'update_post', 'ban_ip_permanent', 'ban_ip', 'announcement');

-- CreateTable
CREATE TABLE "Poster" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "pass" TEXT,
    "role" "Role" NOT NULL DEFAULT 'poster',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "action" "Action" NOT NULL,
    "target_id" TEXT,
    "desc" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "poster_id" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "contained" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "space_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discussion_id" TEXT NOT NULL,
    "poster_id" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Spacemods" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Spacemods_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Poster_email_key" ON "Poster"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Poster_name_key" ON "Poster"("name");

-- CreateIndex
CREATE INDEX "_Spacemods_B_index" ON "_Spacemods"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "Poster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Poster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "Poster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Spacemods" ADD CONSTRAINT "_Spacemods_A_fkey" FOREIGN KEY ("A") REFERENCES "Poster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Spacemods" ADD CONSTRAINT "_Spacemods_B_fkey" FOREIGN KEY ("B") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
