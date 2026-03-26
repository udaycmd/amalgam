"use server";

import { PaginatedThread, Status } from "@shared/types";
import { request } from "@/lib/utils";
import { put, del } from "@vercel/blob";
import { z } from "zod";

const postThreadSchema = z.object({
  name: z.string().max(60, "Name too Long"),
  header: z.string().optional(),
  comment: z.string().min(1, "Comment cannot be empty"),
  mediaType: z.union([z.literal("image"), z.literal("video")]).optional(),
  media: z
    .instanceof(File)
    .refine(
      (f) =>
        [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
          "video/mp4",
          "video/webm",
        ].includes(f.type),
      "Invalid file type",
    )
    .optional()
    .nullable(),
});

export async function getThread(
  threadId: string,
  channelId: string,
  cursor?: string,
): Promise<PaginatedThread | null> {
  return await request<PaginatedThread>(
    `channels/${channelId}/threads/${threadId}?cursor=${cursor ?? ""}`,
    {
      headers: {
        "Skip-Meta": "skip",
      },
    },
  );
}

export async function postThread(
  formData: FormData,
  channelId: string,
): Promise<Status> {
  const res = postThreadSchema.safeParse({
    name: formData.get("name"),
    header: formData.get("header"),
    comment: formData.get("comment"),
    media: formData.get("media"),
  });

  if (!res.success) {
    return {
      error: true,
      message: z.prettifyError(res.error),
    };
  }

  const { name, header, comment, media, mediaType } = res.data;
  let mediaURL: string | undefined;

  try {
    if (media) {
      const blob = await put(media.name, media, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: true,
      });

      mediaURL = blob.url;
    }

    const params = new URLSearchParams();
    params.append("name", name);
    params.append("comment", comment);
    header && params.append("header", header);
    mediaURL && params.append("media", mediaURL);
    mediaType && params.append("mediaType", mediaType);

    const status = await request<Status>(`channels/${channelId}/threads`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!status) {
      throw new Error("service down");
    }

    if (status.error) {
      throw new Error(status.message);
    }

    return status;
  } catch (e) {
    if (mediaURL) {
      // orphan cleanup
      await del(mediaURL, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    return {
      error: true,
      message: e instanceof Error ? e.message : "request failed",
    };
  }
}
