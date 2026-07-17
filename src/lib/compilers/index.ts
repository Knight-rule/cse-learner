export interface CompileResult {
  stdout: string;
  stderr: string;
  error?: string;
}

export interface Compiler {
  run(code: string): Promise<CompileResult>;
}

// Rate limiter (in-memory, per-page)
const rateLimiter = {
  counts: new Map<string, number[]>(),
  limit: 20, // max requests per window
  window: 60000, // 1 minute

  check(key: string): boolean {
    const now = Date.now();
    const timestamps = this.counts.get(key) || [];
    const valid = timestamps.filter((t) => now - t < this.window);
    if (valid.length >= this.limit) return false;
    valid.push(now);
    this.counts.set(key, valid);
    return true;
  },
};

// Code size limit (50KB)
const MAX_CODE_SIZE = 50 * 1024;

export function validateCode(code: string): string | null {
  if (!code || code.trim().length === 0) return "Code cannot be empty";
  if (code.length > MAX_CODE_SIZE) return `Code exceeds ${MAX_CODE_SIZE / 1024}KB limit`;
  return null;
}

export function checkRateLimit(ip: string = "global"): boolean {
  return rateLimiter.check(ip);
}
