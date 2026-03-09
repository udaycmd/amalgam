/*
 * chseed.ts: channel seeder.
 */

import { channels } from "@/data/channels.js";
import db from "@/prisma/db.js";

async function main() {
  console.log("starting channel seeding ...");

  for (const ch of channels) {
    const channel = await db.channel.upsert({
      where: { slug: ch.slug },
      create: ch,
      update: {},
    });

    console.log(`created channel with id: ${channel.id}`);
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
