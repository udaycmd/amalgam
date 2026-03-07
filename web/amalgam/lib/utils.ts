import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/env.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// server fetch helper
export async function get<T>(
  route: string,
  requestConfig?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${env.BACKEND_API_ROOT}/${route}`, requestConfig);

    if (!res.ok) {
      console.error(`unable to fetch /${route}, server status: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error(`unable to fetch: ${e.message}`);
    }

    return null;
  }
}
