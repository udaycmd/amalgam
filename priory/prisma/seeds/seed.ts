/*
 * thseed.ts: Thread seeder.
 *
 * Must be used in dev environment.
 */

import { faker } from "@faker-js/faker";
import { channels } from "@/data/channels.js";
import db from "@/prisma/db.js";

const THREAD_LIMIT = 100; // see prisma/schema.prisma
const REPLIES_PER_THREAD = (Math.random() + 1) * 100;

async function main() {
  console.log("starting db seeding ...");

  for (const ch of channels) {
    await db.channel.upsert({
      where: { slug: ch.slug },
      create: ch,
      update: {},
    });
  }

  for (const ch of channels) {
    for (let t = 0; t < THREAD_LIMIT; t++) {
      const op = await db.post.create({
        data: {
          header: faker.lorem.sentence(),
          author: faker.internet.username(),
          ucode: faker.string.alphanumeric(12),
          content: faker.lorem.paragraphs(2),
          media:
            "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
          mediaType: "image",
          op: true,
        },
      });

      await db.thread.create({
        data: {
          id: op.id,
          channelId: ch.slug,
        },
      });

      await db.post.update({
        where: { id: op.id },
        data: {
          threadId: op.id,
        },
      });

      // push replies
      await db.post.createMany({
        data: Array.from(
          {
            length: REPLIES_PER_THREAD,
          },
          () => ({
            header: faker.lorem.sentence(),
            threadId: op.id,
            author: faker.internet.username(),
            ucode: faker.string.alphanumeric(12),
            content: faker.lorem.paragraphs(Math.ceil(Math.random() * 3)),
            media:
              "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
            mediaType: "image",
            op: false,
          }),
        ),
      });

      await db.thread.update({
        where: { id: op.id },
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
