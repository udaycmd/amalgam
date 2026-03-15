/*
 * thseed.ts: Thread seeder.
 *
 * Must be used in dev environment.
 */

import { faker } from "@faker-js/faker";
import db from "@/prisma/db.js";

const THREAD_LIMIT = 100; // see prisma/schema.prisma
const REPLIES_PER_THREAD = (Math.random() + 1) * 100;

async function main() {
  console.log("starting db seeding ...");

  const channels = await db.channel.findMany();

  for (const ch of channels) {
    for (let t = 0; t < THREAD_LIMIT; t++) {
      const threadId = BigInt(faker.number.int({ min: 1e8, max: 1e10 }));

      await db.thread.create({
        data: {
          id: threadId,
          channelId: ch.slug,
        },
      });

      const posts = [];

      // Original Post
      posts.push({
        threadId,
        header: faker.lorem.sentence(),
        author: faker.internet.username(),
        ucode: faker.string.alphanumeric(12),
        content: faker.lorem.paragraphs(2),
        op: true,
      });

      // Replies
      for (let r = 0; r < REPLIES_PER_THREAD; r++) {
        posts.push({
          threadId,
          header: faker.lorem.words(3),
          author: faker.internet.username(),
          ucode: faker.string.alphanumeric(8),
          content: faker.lorem.paragraph(),
          op: false,
        });
      }

      await db.post.createMany({
        data: posts,
      });

      await db.thread.update({
        where: { id: threadId },
        data: {
          replyCount: REPLIES_PER_THREAD,
          bumpedAt: new Date(),
        },
      });
    }
  }

  console.log("seeding done.");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
