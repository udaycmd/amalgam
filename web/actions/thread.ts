"use server";

import type { ApiResponse, PaginatedThread } from "@amalgam/shared";
import { postThreadSchema } from "@amalgam/shared";
import { put, del } from "@vercel/blob";
import { env } from "@/env";

export async function getThread(
  threadId: string,
  channelId: string,
  cursor?: string,
) {
  const response = (await (
    await fetch(
      `${env.BACKEND_API_BASE}/channels/${channelId}/threads/${threadId}?cursor=${cursor ?? ""}`,
      {
        next: {
          revalidate: 60,
        },
      },
    )
  ).json()) as ApiResponse<PaginatedThread>;

  if (response.error) console.error(response.error);
  return response.data;
}

export async function postThread(formData: FormData, channelId: string) {
  const res = postThreadSchema.safeParse({
    name: formData.get("name"),
    header: formData.get("header"),
    comment: formData.get("comment"),
    media: formData.get("media"),
  });

  if (!res.success) {
    return { error: res.error };
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
    if (header) params.append("header", header);
    if (mediaURL) params.append("media", mediaURL);
    if (mediaType) params.append("mediaType", mediaType);

    const response = (await (
      await fetch(`${env.BACKEND_API_BASE}/channels/${channelId}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
    ).json()) as ApiResponse<string>;

    if (response.error) {
      throw response.error.error;
    }

    return response.data;
  } catch (err) {
    if (mediaURL) {
      await del(mediaURL, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    return { error: err };
  }
}
