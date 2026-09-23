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

Each calling app has its own notes stored **server-side** in the denti-path-vision
backend, keyed by channel name. You set them once with the `echo-channels`
endpoint; after that, your calls only need to carry the channel name — the notes
are attached automatically to every chat and voice session for that channel.

### Setting your channel notes (one time, or whenever they change)

```ts
await fetch("https://oqrvskdtvaykqkclpgew.supabase.co/functions/v1/echo-channels", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "x-echo-key": Deno.env.get("ECHO_ACCESS_KEY")!,
  },
  body: JSON.stringify({
    channel: "dental-docs-hub",
    context: "You are in the provider document portal. Users are practice staff reviewing patient files. Uploads appear under Documents > Pending.",
  }),
});
// -> { "channel": "dental-docs-hub", "stored": true, "context_length": 129 }
```

- `channel`: string (≤64 chars), lowercased, e.g. `"dental-docs-hub"`.
- `context`: string (≤8000 chars). Sending an empty string (or omitting it) deletes your stored notes.
- `GET .../echo-channels` lists all channels; `GET .../echo-channels?channel=dental-docs-hub` returns your stored notes.

### Using it on chat and voice calls

```json
{
  "channel": "dental-docs-hub",
  "messages": [{ "role": "user", "content": "Where do I find pending uploads?" }]
}
```

For voice, send `{"channel": "dental-docs-hub"}` as the body of
`POST /realtime-voice-token`. An inline `channel_context` on a request is still
accepted and appended on top of the stored notes (useful for per-page state),
but it is optional — the stored notes are the default.

These notes are appended to the shared Echo prompt as a `CHANNEL CONTEXT`
section and are strictly additive: they can add facts and surface guidance, but
they cannot override the approved-claims policy, the prohibitions (no
diagnosis, no prices, no guarantees), or the tone rules. Conflicts always
resolve in favour of the central brain, and Echo will not disclose the notes.

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
