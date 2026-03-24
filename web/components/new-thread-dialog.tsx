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
import { Input } from "@/components/ui/input";

const CAPTCHA_DURATION = 120; // seconds

function generateCaptchaText(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function drawCaptcha(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = 220;
  canvas.height = 56;

  // Background with noise
  ctx.fillStyle = "#1a1f2e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines for distortion
  ctx.strokeStyle = "rgba(100, 120, 180, 0.15)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.height; i += 6) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // Noise dots
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${0.2 + Math.random() * 0.3})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2,
    );
  }

  // Wavy distortion lines
  ctx.strokeStyle = "rgba(80, 100, 200, 0.25)";
  ctx.lineWidth = 1.5;
  for (let l = 0; l < 3; l++) {
    ctx.beginPath();
    const y = 10 + Math.random() * 36;
    for (let x = 0; x < canvas.width; x++) {
      ctx.lineTo(x, y + Math.sin(x * 0.06 + l) * 8);
    }
    ctx.stroke();
  }

  // Draw characters with individual rotation and color variation
  const startX = 18;
  const spacing = 32;
  ctx.textBaseline = "middle";

  for (let i = 0; i < text.length; i++) {
    ctx.save();
    const x = startX + i * spacing;
    const y = canvas.height / 2 + (Math.random() - 0.5) * 10;
    const angle = (Math.random() - 0.5) * 0.4;
    const hue = 200 + Math.random() * 60;
    const lightness = 65 + Math.random() * 20;

    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.font = `bold ${22 + Math.random() * 6}px monospace`;
    ctx.fillStyle = `hsl(${hue}, 70%, ${lightness}%)`;
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
}

export function NewThreadDialog({ channelId }: { channelId: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  // Captcha state
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaTimer, setCaptchaTimer] = useState(0);
  const [captchaError, setCaptchaError] = useState(false);
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
    // Draw on next frame so canvas is mounted
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

  // Countdown effect
  useEffect(() => {
    if (captchaVerified && captchaTimer > 0) {
      timerRef.current = setInterval(() => {
        setCaptchaTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCaptchaVerified(false);
            resetCaptcha();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [captchaVerified, captchaTimer, resetCaptcha]);

  function verifyCaptcha() {
    if (captchaInput.toLowerCase() === captchaText.toLowerCase()) {
      setCaptchaVerified(true);
      setCaptchaTimer(CAPTCHA_DURATION);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      resetCaptcha();
    }
  }

  function handleMediaSelect(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setMediaFile(file);
    setMediaType(type);

    if (type === "image") {
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(URL.createObjectURL(file));
    }
  }

  function clearMedia() {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captchaVerified) return;
    // TODO: Build FormData with subject, comment, mediaFile and POST
    setOpen(false);
    setSubject("");
    setComment("");
    clearMedia();
  }

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <Dialog open={open as boolean} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto cursor-pointer rounded-xs">
          <PenSquare className="mr-2 h-4 w-4" />
          Start new thread
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xs bg-sidebar max-w-md sm:max-w-lg p-0 gap-0 overflow-hidden border-primary/30">
        <DialogHeader className="px-4 py-3 bg-linear-to-r from-indigo-950/40 to-blue-950/60 border-b border-primary/30">
          <DialogTitle className="text-[15px] font-semibold tracking-wide text-primary/90">
            Create a new thread
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="border-b border-primary/30">
            <div className="flex border-b border-primary/30">
              <label className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none">
                Subject
              </label>
              <div className="flex-1 px-2 py-1.5">
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Thread Subject"
                  className="text-sm rounded-xs border-0 bg-transparent shadow-none focus-visible:ring-0 px-1"
                />
              </div>
            </div>

            <div className="flex border-b border-primary/30">
              <label className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none">
                Comment
              </label>
              <div className="flex-1 px-2 py-1.5">
                <textarea
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
                  items-center
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
                  className="text-sm rounded-xs cursor-pointer gap-1.5 border-primary/20 hover:bg-indigo-950/40"
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
              <label className="shrink-0 w-24 px-3 py-2.5 text-sm font-semibold text-muted-foreground bg-indigo-950/40 border-r border-primary/30 select-none">
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
                      <Loader2 className="h-3 w-3 animate-spin" />
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
                        className={`h-7 text-xs flex-1 rounded-xs px-2 ${captchaError ? "border-destructive ring-destructive/30 ring-2" : ""}`}
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
                disabled={!captchaVerified}
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
