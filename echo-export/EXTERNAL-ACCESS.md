# Granting an External App Access to Echo

Echo's "brain" (system prompt, guardrails, approved claims library) lives in
`supabase/functions/_shared/echo-prompt.ts` in the **denti-path-vision** project.
It is served through two edge functions. External apps should call these
functions directly — one brain, one place to update, every app stays compliant.

## Endpoints

Base URL (this project's backend functions endpoint):

```
https://oqrvskdtvaykqkclpgew.supabase.co/functions/v1
```

| Function | URL | Purpose |
|---|---|---|
| Text chat | `POST .../chat` | Streaming text conversation with Echo |
| Voice session | `POST .../realtime-voice-token` | Mints an ephemeral OpenAI Realtime session (voice) with the full Echo prompt |
| Channel notes | `GET/PUT .../echo-channels` | Store and retrieve the per-channel knowledge for your app |

## Authentication

Every request must include the shared access key header:

```
x-echo-key: <ECHO_ACCESS_KEY>
```

The key is stored as the secret `ECHO_ACCESS_KEY` in the denti-path-vision
project's backend secrets. Copy its value into the external app's own secret
store (e.g. `ECHO_ACCESS_KEY` in dental-docs-hub) and send it server-side.
Requests without a valid key receive `401 Unauthorized`.

This project's own site calls the same functions with its anon key instead,
which continues to work unchanged.

## Per-channel knowledge (tailored info at the edge)

Both endpoints accept two optional fields on the JSON body so each calling app
can add its own context without touching the central brain:

| Field | Type | Purpose |
| --- | --- | --- |
| `channel` | string (≤64 chars) | Name of the calling surface, e.g. `"dental-docs-hub"` |
| `channel_context` | string (≤8000 chars) | Knowledge, page context, or guidance that applies only to this channel. `context` is accepted as an alias. |

Example:
```json
{
  "channel": "dental-docs-hub",
  "channel_context": "You are in the provider document portal. Users are practice staff reviewing patient files. Uploads appear under Documents > Pending.",
  "messages": [{ "role": "user", "content": "Where do I find pending uploads?" }]
}
```

These notes are appended to the shared Echo prompt as a `CHANNEL CONTEXT`
section and are strictly additive: they can add facts and surface guidance, but
they cannot override the approved-claims policy, the prohibitions (no
diagnosis, no prices, no guarantees), or the tone rules. Conflicts always
resolve in favour of the central brain, and Echo will not disclose the notes.

Send `channel_context` fresh on each request — the functions are stateless, so
it can change per page or per user state.

## Request / response formats

### POST /chat

Body:
```json
{
  "messages": [
    { "role": "user", "content": "How does DentiPay financing work?" }
  ]
}
```

Response: a server-sent event (SSE) stream in OpenAI chat-completions format
(`data: {"choices":[{"delta":{"content":"..."}}]}` lines, terminated by
`data: [DONE]`). Accumulate the delta contents for the full reply.

Example:
```ts
const res = await fetch("https://oqrvskdtvaykqkclpgew.supabase.co/functions/v1/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-echo-key": Deno.env.get("ECHO_ACCESS_KEY")!,
  },
  body: JSON.stringify({ messages }),
});
// read res.body as an SSE stream
```

Send the full accumulated conversation on each turn — the function is stateless.

### POST /realtime-voice-token

No body required. Returns an OpenAI Realtime ephemeral session:
```json
{
  "client_secret": { "value": "ek_...", "expires_at": 1732... },
  "id": "sess_..."
}
```

The client then connects WebRTC to
`https://api.openai.com/v1/realtime/calls?model=gpt-realtime` using
`client_secret.value` as the bearer token. See
`echo-export/src/utils/VoiceAgent.ts` for a complete client implementation
(point its token fetch at this endpoint with the `x-echo-key` header, best done
through the external app's own backend proxy so the key never ships to the
browser).

## Security notes

- The Echo system prompt is never sent to or stored on OpenAI beyond the
  individual request, and is never exposed to the external app's browser.
- Rotate access by regenerating `ECHO_ACCESS_KEY` and updating the external
  app's secret — no code changes needed.
- CORS is open (`*`) so browser-based apps can call, but CORS is not the
  security boundary — the access key is. Keep the key server-side in the
  external app; if it must be used from a browser, treat the session as
  semi-trusted and prefer short-lived proxying through that app's backend.
