import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@/env.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function get<T>(
  route: string,
  revalidate?: number | false,
): Promise<T> {
  try {
    const res = await fetch(`${env.BACKEND_API_ROOT}/${route}`, {
      next: {
        revalidate: revalidate,
      },
    });

    if (!res.ok) {
      console.error(`unable to fetch, server status: ${res.status}`);
      return [] as T;
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error) {
      console.error(`unable to fetch: ${e.message}`);
    }

    return [] as T;
  }
}
