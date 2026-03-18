"use server";

import type { PaginatedThread } from "@/types";
import { request } from "@/lib/utils";

export async function getThread(
  threadId: string,
  channelId: string,
  cursor?: string,
): Promise<PaginatedThread | null> {
  return request<PaginatedThread>(
    `channels/${channelId}/threads/${threadId}?cursor=${cursor ?? ""}`,
    {
      headers: {
        "Skip-Meta": "skip",
      },
    },
  );
}
