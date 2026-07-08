/** Basic SSRF guard for server-side fetches of feed-supplied URLs. */
export function safeExternalUrl(raw: string): URL | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    const h = u.hostname.toLowerCase();
    if (
      h === "localhost" ||
      h === "0.0.0.0" ||
      h.endsWith(".local") ||
      h.endsWith(".internal") ||
      h.includes(":") || // IPv6 literal
      /^127\./.test(h) ||
      /^10\./.test(h) ||
      /^192\.168\./.test(h) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
      /^169\.254\./.test(h)
    ) {
      return null;
    }
    return u;
  } catch {
    return null;
  }
}
