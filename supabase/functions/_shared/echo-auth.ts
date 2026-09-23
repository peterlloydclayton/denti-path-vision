// Shared access check for Echo endpoints.
// A request is allowed when EITHER:
//   1. It carries our own project's anon key (as the `apikey` header — sent
//      automatically by supabase.functions.invoke — or as a Bearer token), OR
//   2. It carries the shared secret in the `x-echo-key` header (external approved apps).
export function isAuthorizedEchoRequest(req: Request): boolean {
  const echoKey = req.headers.get("x-echo-key");
  const expectedEchoKey = Deno.env.get("ECHO_ACCESS_KEY");
  if (echoKey && expectedEchoKey && echoKey === expectedEchoKey) {
    return true;
  }

  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!anonKey) return false;

  const apikey = req.headers.get("apikey");
  if (apikey && apikey === anonKey) {
    return true;
  }

  const auth = req.headers.get("authorization");
  if (auth && auth.replace(/^Bearer\s+/i, "") === anonKey) {
    return true;
  }

  return false;
}
