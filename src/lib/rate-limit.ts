import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const ratelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // 3 submissions per 60s per IP — generous for a real visitor, tight for a script.
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      prefix: "contact-form",
    })
  : null;

/** Returns `success: true` when Upstash isn't configured yet, so local/dev never hard-fails. */
export async function checkContactRateLimit(identifier: string) {
  if (!ratelimit) return { success: true as const };
  return ratelimit.limit(identifier);
}
