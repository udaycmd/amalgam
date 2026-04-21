export default function wc(str: string) {
  return str
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}
