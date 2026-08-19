# DentiPay Echo Export Kit

This folder contains a backend-ready copy of the DentiPay Echo voice + text assistant. Copy these files into the target Lovable project to add the same Echo assistant to another surface (e.g. the backend admin portal).

## What is included

- **Supabase Edge Functions**
  - `supabase/functions/_shared/echo-prompt.ts` — Shared system prompt used by both voice and text chat.
  - `supabase/functions/realtime-voice-token/index.ts` — Proxies OpenAI Realtime API for voice sessions.
  - `supabase/functions/chat/index.ts` — Proxies OpenAI `gpt-4o-mini` for text chat.

- **Frontend**
  - `src/utils/VoiceAgent.ts` — WebRTC / OpenAI Realtime client.
  - `src/components/EchoVoiceChat.tsx` — Floating voice + text chat widget.

## Requirements in the target project

The target project must already be a Lovable Classic/Supabase stack with:

- React + Vite + Tailwind CSS
- shadcn/ui components: `Button`, `Input`, `ScrollArea`
- `lucide-react`
- `src/hooks/use-toast.ts`
- `src/integrations/supabase/client.ts` with the standard Supabase client

The backend project (`dental-docs-hub`) meets all of these requirements.

## Copy instructions

1. Copy the **Supabase functions** into the target project:
   ```bash
   cp -R echo-export/supabase/functions/_shared <target-project>/supabase/functions/
   cp -R echo-export/supabase/functions/realtime-voice-token <target-project>/supabase/functions/
   cp -R echo-export/supabase/functions/chat <target-project>/supabase/functions/
   ```

2. Copy the **frontend** files into the target project:
   ```bash
   cp echo-export/src/utils/VoiceAgent.ts <target-project>/src/utils/VoiceAgent.ts
   cp echo-export/src/components/EchoVoiceChat.tsx <target-project>/src/components/EchoVoiceChat.tsx
   ```

3. In the target project, make sure the `OPENAI_API_KEY` secret is set. It must be the same key used by the marketing site for identical model behavior. Add it in the target project's Lovable Secrets panel.

4. Add the widget to a root layout or page so it is available globally, e.g.:
   ```tsx
   import { EchoVoiceChat } from '@/components/EchoVoiceChat';

   export function Layout() {
     return (
       <>
         <main>...</main>
         <EchoVoiceChat />
       </>
     );
   }
   ```

5. Deploy the edge functions in the target project (Lovable-managed deployments happen automatically, or use `supabase functions deploy`).

## Customizing for the backend

The `EchoVoiceChat.tsx` component is intentionally backend-agnostic:
- No marketing-site route names are hard-coded.
- Tool calls (`navigate_to_patients`, etc.) are surfaced as a toast so you can wire them to your own routes.
- Pass `pageContext` to help Echo understand the current page/form.

### Example: page context for a form
```tsx
<EchoVoiceChat
  pageContext={{
    page: 'Application Review',
    stepNumber: 1,
    stepTitle: 'Personal Information',
    fields: ['First Name', 'Last Name', 'SSN'],
  }}
/>
```

### Example: wire tool calls to backend routes
Inside `EchoVoiceChat.tsx`, replace the generic `handleToolCall` toast with your own navigation logic:
```tsx
const handleToolCall = useCallback((toolName: string) => {
  if (toolName === 'navigate_to_financing_application') {
    navigate('/applications/new');
  }
}, [navigate]);
```

## Important notes

- Both voice and text use the **same shared system prompt** (`echo-prompt.ts`). Update it in one place and both channels will stay consistent.
- The voice agent uses OpenAI's `gpt-realtime` model and the WebRTC `calls` endpoint. The target project must use the same `OPENAI_API_KEY`.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (or `VITE_SUPABASE_PUBLISHABLE_KEY`) must be available in the target project. These are standard in Lovable Supabase projects.
- No framer-motion is required, so this kit works even if the target project does not have it installed.
