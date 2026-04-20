import { createHash } from "node:crypto";
import config from "@/lib/config.js";

function getCode(password: string) {
  return createHash("sha256")
    .update(password + config.SECRET_SALT)
    .digest("base64");
}

export default function processTripcode(rawName: string): {
  name: string;
  tc?: string;
} {
  if (rawName === "unknown") return { name: rawName };

  const sep = rawName.indexOf("##");
  const password = rawName.slice(sep + 2);

  if (sep < 0 || password === "") {
    return { name: rawName };
  }

  return {
    name: rawName.slice(0, sep),
    tc: getCode(password),
  };
}
