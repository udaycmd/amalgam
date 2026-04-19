import { z } from "zod";

export const postThreadSchema = z.object({
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
