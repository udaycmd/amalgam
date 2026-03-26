"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  PenSquare,
  ImagePlus,
  Film,
  X,
  CheckCircle2,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  drawCaptcha,
  generateCaptchaText,
  CAPTCHA_DURATION,
} from "@/lib/captcha";
import { postThread } from "@/actions/thread";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function PostForm({
  channelId,
  isReply,
  media,
}: {
  channelId: string;
  isReply?: boolean;
  media: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("unknown");
  const [subject, setSubject] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const [captchaText, setCaptchaText] = useState<string>("");
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [captchaTimer, setCaptchaTimer] = useState<number>(0);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const resetCaptcha = useCallback(() => {
    const text = generateCaptchaText();
    setCaptchaText(text);
    setCaptchaInput("");
    setCaptchaVerified(false);
    setCaptchaError(false);
    setCaptchaTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
    requestAnimationFrame(() => {
      if (canvasRef.current) drawCaptcha(canvasRef.current, text);
    });
  }, []);

  useEffect(() => {
    if (open) resetCaptcha();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [open, resetCaptcha]);

  useEffect(() => {
    if (captchaVerified && captchaTimer > 0) {
      timerRef.current = setInterval(() => {
        setCaptchaTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [captchaVerified, captchaTimer]);

  useEffect(() => {
    return () => {
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    };
  }, [mediaPreview]);

  function verifyCaptcha() {
    if (
      captchaInput.normalize().toLowerCase() ===
      captchaText.normalize().toLowerCase()
    ) {
      setCaptchaVerified(true);
      setCaptchaTimer(CAPTCHA_DURATION);
      setCaptchaError(false);
    } else {
      resetCaptcha();
      setCaptchaError(true);
    }
  }

  function clearMedia() {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  }

  function formatTime(s: number): string {
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  }

  function handleMediaSelect(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video",
  ) {
    const MAX_FILE_SIZE = 4 * 1024 * 1024;
    const file = e.target.files?.[0]; // select the first known file
    if (!file) return;

    if (file.size > MAX_FILE_SIZE || file.size == 0) {
      alert("Invalid file size.");
      e.target.value = "";
      return;
    }

    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";

    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }

    setMediaFile(file);
    setMediaType(type);
    setMediaPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captchaVerified) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("header", subject);
    formData.append("comment", comment);

    if (mediaFile) {
      formData.append("media", mediaFile);
      formData.append("mediaType", mediaType as string);
    }

    const res = await postThread(formData, channelId);

    if (res.error) {
      alert(res.message);
      console.error(res.message);
    } else {
      alert("Post Added!");
      console.log(res.message);
    }

    setOpen(false);
    setSubject("");
    setComment("");
    clearMedia();
    resetCaptcha();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto cursor-pointer rounded-xs">
          <PenSquare className="mr-2 h-4 w-4" />
          Start new thread
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xs bg-sidebar max-w-md sm:max-w-lg p-0 gap-0 overflow-hidden border border-primary/30">
        <DialogHeader className="px-4 py-3 bg-linear-to-r from-indigo-950/40 to-blue-950/60 border-b border-primary/30">
          <DialogTitle className="text-[15px] font-semibold tracking-wide text-primary/90">
            Create a new thread
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="border-b border-primary/30">
            <div className="flex border-b border-primary/30">
              <label
                htmlFor="name"
                className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none"
              >
                Name
              </label>
              <div className="flex-1 px-2 py-1.5">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="unknown"
                  className="text-sm rounded-xs border-0 bg-transparent shadow-none focus-visible:ring-0 px-1"
                />
              </div>
            </div>

            <div className="flex border-b border-primary/30">
              <label
                htmlFor="subject"
                className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none"
              >
                Subject
              </label>
              <div className="flex-1 px-2 py-1.5">
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Thread Subject"
                  className="text-sm rounded-xs border-0 bg-transparent shadow-none focus-visible:ring-0 px-1"
                />
              </div>
            </div>

            <div className="flex border-b border-primary/30">
              <label
                htmlFor="comment"
                className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none"
              >
                Comment
              </label>
              <div className="flex-1 px-2 py-1.5">
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your thoughts here..."
                  rows={7}
                  className="w-full rounded-xs bg-transparent border border-primary/20 p-1 text-sm text-foreground placeholder:text-muted-foreground resize-y outline-none"
                />
              </div>
            </div>

            <div className="flex border-b border-primary/30">
              <label className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none">
                File
              </label>
              <div className="flex-1 px-2 py-1.5 flex items-center gap-2">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  className="hidden"
                  onChange={(e) => handleMediaSelect(e, "image")}
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4,video/webm"
                  className="hidden"
                  onChange={(e) => handleMediaSelect(e, "video")}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-sm rounded-xs cursor-pointer gap-1.5 border-primary/20 hover:bg-indigo-950/40"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <ImagePlus className="h-3.5 w-3.5" />
                  Image
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-sm rounded-xs cursor-pointer gap-1.5 border-primary/20 hover:bg-indigo-950/40",
                    media === "image" ? "hidden" : "",
                  )}
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Film className="h-3.5 w-3.5" />
                  Video
                </Button>
                {mediaFile && (
                  <span className="text-xs text-primary truncate bg-blue-700 p-1 px-2 rounded-xl">
                    {mediaFile.name}
                  </span>
                )}
              </div>
            </div>

            {mediaPreview && (
              <div className="relative px-4 py-3 border-b border-primary/30 bg-transparent">
                <button
                  type="button"
                  onClick={clearMedia}
                  className="absolute top-2 right-2 p-1 rounded-full bg-destructive/80 hover:bg-destructive text-primary cursor-pointer transition-colors z-10"
                >
                  <X className="h-4 w-4" />
                </button>
                {mediaType === "image" ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-h-40 rounded-xs object-contain mx-auto"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    controls
                    className="max-h-40 rounded-xs mx-auto"
                  />
                )}
              </div>
            )}

            <div className="flex border-b border-primary/30">
              <label
                htmlFor="captcha"
                className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none"
              >
                Captcha
              </label>
              <div className="flex-1 px-2 py-2">
                {captchaVerified ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Loader2
                        className={cn(
                          "h-3 w-3",
                          captchaTimer > 0 ? "animate-spin" : "hidden",
                        )}
                      />
                      <span className="font-mono tabular-nums">
                        {formatTime(captchaTimer)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <canvas
                        ref={canvasRef}
                        className="rounded-xs border border-primary/35 h-10 w-38"
                        style={{ imageRendering: "smooth" }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer p-2 rounded-full h-6 w-6 group"
                        onClick={resetCaptcha}
                      >
                        <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id="captcha"
                        value={captchaInput}
                        onChange={(e) => {
                          setCaptchaInput(e.target.value);
                          setCaptchaError(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            verifyCaptcha();
                          }
                        }}
                        placeholder="Type the text above"
                        className={`h-7 text-xs flex-1 rounded-xs px-2 bg-transparent shadow-none focus-visible:ring-0 ${captchaError ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs rounded-xs cursor-pointer border-primary/30"
                        onClick={verifyCaptcha}
                      >
                        Verify
                      </Button>
                    </div>
                    {captchaError && (
                      <p className="text-xs text-destructive">
                        Incorrect captcha. Try again.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex h-10 items-center justify-between p-3">
              <span className="text-xs font-semibold text-primary">
                *Max file size: 4 MB
              </span>
              <Button
                type="submit"
                disabled={!captchaVerified || captchaTimer > 0}
                className="rounded-xs cursor-pointer h-7 text-primary text-xs px-6 bg-indigo-950/40 hover:bg-indigo-950/80 border border-primary/30"
              >
                Post
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
