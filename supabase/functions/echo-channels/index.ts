import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { isAuthorizedEchoRequest } from "../_shared/echo-auth.ts";
import { normalizeChannel } from "../_shared/echo-channel.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-echo-key",
};

const MAX_CONTEXT_CHARS = 8000;
const TABLE = "echo_channel_contexts";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function serviceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!isAuthorizedEchoRequest(req)) {
    return json({ error: "Unauthorized" }, 401);
  }

  const supabase = serviceClient();

  try {
    // GET /echo-channels              -> list of channels (names only)
    // GET /echo-channels?channel=x    -> stored context for one channel
    if (req.method === "GET") {
      const channel = normalizeChannel(new URL(req.url).searchParams.get("channel"));
      if (channel) {
        const { data, error } = await supabase
          .from(TABLE)
          .select("channel, context, updated_at")
          .eq("channel", channel)
          .maybeSingle();
        if (error) throw new Error(error.message);
        return json(data ?? { channel, context: null });
      }
      const { data, error } = await supabase
        .from(TABLE)
        .select("channel, updated_at")
        .order("channel");
      if (error) throw new Error(error.message);
      return json({ channels: data });
    }

    // PUT/POST /echo-channels  { channel, context }  -> set/replace notes
    // Empty or missing context deletes the channel's notes.
    if (req.method === "PUT" || req.method === "POST" || req.method === "DELETE") {
      let body: Record<string, unknown> = {};
      try {
        body = await req.json();
      } catch (_) {
        body = {};
      }
      const channel = normalizeChannel(body.channel);
      if (!channel) {
        return json({ error: "channel is required" }, 400);
      }
      const rawContext = body.context ?? body.channel_context;
      const context = typeof rawContext === "string" ? rawContext.trim().slice(0, MAX_CONTEXT_CHARS) : "";

      if (!context) {
        const { error } = await supabase.from(TABLE).delete().eq("channel", channel);
        if (error) throw new Error(error.message);
        return json({ channel, deleted: true });
      }

      const { error } = await supabase
        .from(TABLE)
        .upsert({ channel, context, updated_at: new Date().toISOString() });
      if (error) throw new Error(error.message);
      return json({ channel, stored: true, context_length: context.length });
    }

    return json({ error: "Method not allowed" }, 405);
  } catch (error) {
    console.error("echo-channels error:", error);
    return json({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});
