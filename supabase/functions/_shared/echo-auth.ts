// Shared access check for Echo endpoints.
// A request is allowed when EITHER:
//   1. It carries our own project's anon key in the `apikey` header
//      (this is what the marketing site's widget sends automatically via supabase.functions.invoke), OR
//   2. It carries the shared secret in the `x-echo-key` header (external approved apps).
export function isAuthorizedEchoRequest(req: Request): boolean {
  const echoKey = req.headers.get("x-echo-key");
  const expectedEchoKey = Deno.env.get("ECHO_ACCESS_KEY");
  if (echoKey && expectedEchoKey && echoKey === expectedEchoKey) {
    return true;
  }

  const apikey = req.headers.get("apikey");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (apikey && anonKey && apikey === anonKey) {
    return true;
  }

  return false;
}
