"use server";

import type { PaginatedThread } from "@/types/interfaces";
import { request } from "@/lib/utils";

export async function getThread(
  threadId: string,
  channelId: string,
  cursor?: string,
): Promise<PaginatedThread | null> {
  return request<PaginatedThread>(
    `channels/${channelId}/threads/${threadId}?cursor=${cursor ?? ""}`,
  );
}
