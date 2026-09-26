// Temporary probe: tells us which folder Vercel treats as the project root.
// Plain JS on purpose: the app's tsconfig cannot emit, so .ts functions fail.
export function GET() {
  return new Response("functions-root=root", { headers: { "content-type": "text/plain" } });
}
