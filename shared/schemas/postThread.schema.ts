import { z } from "zod";

export const postThreadSchema = z.object({
  name: z.string().max(60, { error: "name too long" }),
  header: z.string().optional(),
  comment: z
    .string()
    .min(1, { error: "comment cannot be empty" })
    .refine(
      (s) => {
        if (!s || s.trim() === "") return true;
        return (
          s
            .trim()
            .split(/\s+/)
            .filter((w) => w.length > 0).length <= 2000
        );
      },
      {
        error: "comment must be under 2000 words",
      },
    ),
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
      {
        error: "invalid file type",
      },
    )
    .optional()
    .nullable(),
});
