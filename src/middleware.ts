import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Add strict security headers
  response.headers.set('X-Frame-Options', 'DENY'); // Prevent clickjacking
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME-type sniffing
  response.headers.set('Referrer-Policy', 'no-referrer'); // Strict referrer policy
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'); // 2 years + preload for HSTS
  response.headers.set('X-XSS-Protection', '0'); // Disable deprecated XSS header (modern browsers use CSP instead)
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); // Disable unused APIs
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp'); // Enforce cross-origin isolation
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin'); // Protect against cross-origin attacks
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin'); // Restrict cross-origin resource sharing

  // Add a custom owner header
  response.headers.set('X-Owner', 'Parth Sinha');

  return response;
});
