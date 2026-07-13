import dotenv from "dotenv";
dotenv.config();

const RPM_LIMIT = parseInt(process.env.RATE_LIMIT_RPM) || 30;
const TPM_LIMIT = parseInt(process.env.RATE_LIMIT_TPM) || 6000;

let rateLimits = {
  windowStart: Date.now(),
  requests: 0,
  tokens: 0,
};

export const aiRateLimiter = (req, res, next) => {
  const now = Date.now();
  const timePassed = now - rateLimits.windowStart;

  // Reset the window every 60 seconds
  if (timePassed > 60000) {
    rateLimits = { windowStart: now, requests: 0, tokens: 0 };
  }

  const secondsUntilReset = Math.ceil((60000 - timePassed) / 1000);

  // 1. Check Requests (RPM)
  if (rateLimits.requests >= RPM_LIMIT) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: `Request limit (${RPM_LIMIT}/min) exceeded. Please wait ${secondsUntilReset} seconds.`,
      seconds_to_wait: secondsUntilReset,
    });
  }

  // 2. Estimate & Check Tokens (TPM)
  const estimatedInputTokens = req.body
    ? JSON.stringify(req.body).length / 4
    : 200;
  const reservedOutputTokens = 800; // Reserve buffer for AI output
  const estimatedTotalTokens = estimatedInputTokens + reservedOutputTokens;

  if (rateLimits.tokens + estimatedTotalTokens > TPM_LIMIT) {
    return res.status(429).json({
      error: "Token Limit Exceeded",
      message: `Token limit (${TPM_LIMIT}/min) exceeded. Needs ~${Math.round(estimatedTotalTokens)} tokens, but only ${TPM_LIMIT - rateLimits.tokens} remain. Please wait ${secondsUntilReset} seconds.`,
      seconds_to_wait: secondsUntilReset,
    });
  }

  // Update usage and proceed
  rateLimits.requests += 1;
  rateLimits.tokens += estimatedTotalTokens;

  req.currentUsage = { ...rateLimits };
  next();
};
