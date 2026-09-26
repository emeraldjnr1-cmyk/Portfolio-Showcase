// Temporary probe: tells us which folder Vercel treats as the project root.
export function GET() {
  return new Response("functions-root=app", { headers: { "content-type": "text/plain" } });
}
