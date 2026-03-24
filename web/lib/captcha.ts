export const CAPTCHA_DURATION = 60 * 3; // 3 minutes

export function generateCaptchaText(): string {
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return result;
}

export function drawCaptcha(canvas: HTMLCanvasElement, text: string): boolean {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }
  canvas.width = 225;
  canvas.height = 60;

  ctx.fillStyle = "#1d202b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(100, 120, 180, 0.2)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.height; i += 8) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${0.2 + Math.random() * 0.3})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2,
    );
  }

  ctx.strokeStyle = "rgba(80, 100, 200, 0.3)";
  ctx.lineWidth = 1.5;
  for (let l = 0; l < 3; l++) {
    ctx.beginPath();
    const y = 10 + Math.random() * 36;
    for (let x = 0; x < canvas.width; x++) {
      ctx.lineTo(x, y + Math.sin(x * 0.06 + l) * 8);
    }
    ctx.stroke();
  }

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

  return true;
}
