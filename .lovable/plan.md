# Plan: Reuse Echo on dental-docs-hub backend project

## Goal
Make the current Echo voice + text chat system (OpenAI Realtime voice + streaming text chat) usable as a separate copy/instantiation inside the `dental-docs-hub` Lovable backend project, while keeping separation of concerns so marketing, patient, provider, and backend surfaces each have their own lightweight edge-function proxies to the same OpenAI backend.

## Claude Code question
Per Lovable docs, there is no separate "Claude Code" feature to enable or connect inside Lovable. Lovable's built-in AI is already integrated into the editor and uses its own mix of models. You do not need to connect an external Claude Code instance; just describe the task in the chat and Lovable will use its integrated AI. Docs: [https://docs.lovable.dev/features/ai.md](https://docs.lovable.dev/features/ai.md) and [https://docs.lovable.dev/users-asking-which-llm-we-use.md](https://docs.lovable.dev/users-asking-which-llm-we-use.md).

## Echo architecture summary
The current Echo system is composed of two lightweight Supabase Edge Functions that only proxy to OpenAI:

- `supabase/functions/realtime-voice-token/index.ts` — requests an ephemeral OpenAI Realtime session token and returns it to the browser.
- `supabase/functions/chat/index.ts` — proxies a streaming chat completion request to OpenAI.

All heavy lifting (model inference, audio, transcription) happens at OpenAI. The edge functions are thin wrappers, so it is safe and clean for each surface to have its own copy.

Recommended architecture:

```text
marketing site (current project)
  ├─ Edge Functions: realtime-voice-token, chat
  ├─ UI: EchoAvatarCompanion, VoiceAgentOverlay, VoiceAgentFullscreenIntro, ChatWidget, VoiceAgent.ts
  └─ Uses OPENAI_API_KEY

backend project (dental-docs-hub)
  ├─ Copy of Edge Functions: realtime-voice-token, chat
  ├─ Copy of UI components
  └─ Same OPENAI_API_KEY secret

patient / provider surfaces (future)
  ├─ Same copy of Edge Functions + UI
  └─ Same OPENAI_API_KEY secret
```

## What we will implement

### 1. Extract shared source of truth for the system prompt
Create a single shared file in the current project so voice and text use the same persona:

- New file: `supabase/functions/_shared/echo-prompt.ts`
- Move the `SYSTEM_PROMPT` from `realtime-voice-token/index.ts` and `chat/index.ts` into this shared file.
- Import the shared prompt in both edge functions.

This keeps the two channels (voice and text) behaviorally identical without requiring a new npm package.

### 2. Copy the lightweight edge functions to dental-docs-hub
Copy these two functions into `dental-docs-hub/supabase/functions/`:

- `realtime-voice-token/`
- `chat/`

Use the new shared prompt from step 1. No business logic changes beyond the path import update.

### 3. Copy the frontend Echo components
Copy the following components/utilities into the dental-docs-hub project (adjusting paths from `@/...` to the backend project's structure):

- `src/utils/VoiceAgent.ts` → backend `src/utils/VoiceAgent.ts`
- `src/components/ChatWidget.tsx` → backend `src/components/ChatWidget.tsx`
- `src/components/EchoAvatarCompanion.tsx` → backend `src/components/EchoAvatarCompanion.tsx`
- `src/components/VoiceAgentOverlay.tsx` → backend `src/components/VoiceAgentOverlay.tsx`
- `src/components/VoiceAgentFullscreenIntro.tsx` → backend `src/components/VoiceAgentFullscreenIntro.tsx`
- `src/components/ui/central-voice-hub.tsx` → backend `src/components/ui/central-voice-hub.tsx`
- `src/components/ui/audio-visualizer.tsx` → backend `src/components/ui/audio-visualizer.tsx` (if referenced)
- `src/components/VoiceAssistantPrompt.tsx` → backend `src/components/VoiceAssistantPrompt.tsx` (if intro prompt is desired)
- `src/components/SplashScreen.tsx` → backend `src/components/SplashScreen.tsx` (if intro splash is desired)
- `src/components/chat/MessageContent.tsx` → backend `src/components/chat/MessageContent.tsx`
- `src/hooks/useFormContext.ts` → backend `src/hooks/useFormContext.ts` (for form page context)
- `src/assets/echo-avatar.png` → backend `src/assets/echo-avatar.png`

### 4. Add the backend UI shell
Wire the copied components into the backend project's `App.tsx` (or equivalent root layout) with the same state management:

- Central hub button (voice + text entry points)
- `EchoAvatarCompanion` for voice
- `ChatWidget` for text
- Navigation callbacks that route to the backend project's own routes

Keep it DentiPay-branded as requested; no generic re-theming work.

### 5. Configure the shared secret in the backend project
Add the same `OPENAI_API_KEY` secret to the `dental-docs-hub` project so its edge functions can call OpenAI. The value is already known from the current project (the user confirmed they want the same key). Use the secrets tool to set it.

### 6. Verify the backend project functions
After the copies and secret are in place, deploy the `realtime-voice-token` and `chat` functions in `dental-docs-hub` and test them with the curl tool to confirm 200 responses and token/chat streaming behavior.

### 7. Verify the frontend integration in the backend project
Use the running preview to confirm:

- The central hub button appears.
- Voice opens and connects without "Failed to get voice session token".
- Text chat opens and streams a response.
- No console errors from the copied components.

## Open decisions before we build
1. The `chat` edge function currently uses `gpt-4o-mini`. Do you want the backend copy to use the same model, or a different one?
2. Do you want the backend project's voice avatar to use the same `echo-avatar.png`, or a different avatar for the backend surface?
3. Should backend navigation tools (e.g., `navigate_to_financing_application`) route to backend-specific URLs, or should those tools be removed from the backend copy?

## Technical details
- Edge functions: Deno + `https://deno.land/std@0.168.0/http/server.ts` or `npm:@supabase/supabase-js@2/cors` for CORS.
- Frontend: React 18 + TypeScript + Tailwind + shadcn/ui components already used in the backend project.
- Voice API: OpenAI Realtime `gpt-realtime` model.
- Text API: OpenAI Chat Completions `gpt-4o-mini` model.
- Secret: `OPENAI_API_KEY` stored in each project's Lovable Cloud secret store.
