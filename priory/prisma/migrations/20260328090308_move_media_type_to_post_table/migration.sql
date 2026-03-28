-- CreateTable
CREATE TABLE "Post" (
    "id" BIGSERIAL NOT NULL,
    "threadId" BIGINT,
    "header" TEXT,
    "author" TEXT NOT NULL DEFAULT 'unknown',
    "ucode" TEXT,
    "media" TEXT,
    "mediaType" TEXT,
    "content" TEXT NOT NULL,
    "op" BOOLEAN NOT NULL DEFAULT false,
    "sage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" BIGINT NOT NULL,
    "channelId" TEXT NOT NULL,
    "bumpedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "nsfw" BOOLEAN NOT NULL DEFAULT false,
    "threadLimit" INTEGER NOT NULL DEFAULT 100,
    "bumpLimit" INTEGER NOT NULL DEFAULT 150,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE INDEX "Post_threadId_ucode_idx" ON "Post"("threadId", "ucode");

-- CreateIndex
CREATE INDEX "Thread_channelId_bumpedAt_idx" ON "Thread"("channelId", "bumpedAt");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
