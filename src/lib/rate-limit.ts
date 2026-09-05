import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const ratelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // Limit users to 3 submissions per minute to prevent API abuse.
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      prefix: "contact-form",
    })
  : null;

/**
 * Checks if the user has exceeded the rate limit.
 * Always returns true if Upstash keys are missing so local development isn't blocked.
 */
export async function checkContactRateLimit(identifier: string) {
  if (!ratelimit) return { success: true as const };
  return ratelimit.limit(identifier);
}
