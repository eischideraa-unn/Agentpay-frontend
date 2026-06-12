// Lightweight wrapper around fetch() for the AgentPay backend API.
// Centralises base URL resolution and error handling so call sites stay
// small.

const API_BASE =
  process.env.NEXT_PUBLIC_AGENTPAY_API_BASE ?? "http://localhost:3001";

export type ApiError = {
  error: string;
  message: string;
  requestId?: string;
};

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    ...init,
  });
  if (res.status === 204) return undefined as T;
  const body = (await res.json()) as T | ApiError;
  if (!res.ok) {
    throw Object.assign(new Error((body as ApiError).message), body as ApiError);
  }
  return body as T;
}

export const apiGet = <T>(path: string) => apiFetch<T>(path);
export const apiPost = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: "POST", body: JSON.stringify(body) });
export const apiPatch = <T>(path: string, body: unknown) =>
  apiFetch<T>(path, { method: "PATCH", body: JSON.stringify(body) });
export const apiDelete = (path: string) =>
  apiFetch<void>(path, { method: "DELETE" });
