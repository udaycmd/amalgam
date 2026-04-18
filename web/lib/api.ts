import { env } from "@/env.js";

export async function request<T>(
  route: string,
  requestConfig?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${env.BACKEND_API_BASE}/${route}`, requestConfig);

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
