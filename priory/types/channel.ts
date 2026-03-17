import type { ThreadInfo } from "@/types/thread.js";

export type ChannelInfo = {
  slug: string;
  name: string;
  desc: string;
  nsfw: boolean;
};

export type PaginatedChannel = {
  chinfo: ChannelInfo;
  threads: ThreadInfo[];
  hasMore: boolean;
};
