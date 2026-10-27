// ═══════════════════════════════════════════════════════════════
// FairShift — Security Middleware
// Custom security headers (no helmet dependency needed)
// ═══════════════════════════════════════════════════════════════

import type { Request, Response, NextFunction } from 'express';

/**
 * Apply security headers to all responses.
 * Mirrors helmet's defaults without the dependency.
 */
export function securityHeaders(_req: Request, res: Response, next: NextFunction): void {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'",
  );
  // Strict Transport Security (for HTTPS deployments)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  next();
}

/**
 * Input validation helpers
 */
export function validateRequiredFields(
  body: Record<string, unknown>,
  fields: string[],
): { valid: boolean; missing: string[] } {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null || body[f] === '',
  );
  return { valid: missing.length === 0, missing };
}

export function sanitizeString(input: string, maxLength = 2000): string {
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '');
}

/**
 * Rate limiting state (simple in-memory, per-IP)
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(windowMs = 900_000, maxRequests = 100) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    entry.count++;
    if (entry.count > maxRequests) {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
      return;
    }

    next();
  };
}
