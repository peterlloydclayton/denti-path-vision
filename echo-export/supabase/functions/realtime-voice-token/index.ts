import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { ECHO_SYSTEM_PROMPT } from "../_shared/echo-prompt.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};


serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Generating ephemeral token for OpenAI Realtime API...');

    // Request an ephemeral token from OpenAI (new client_secrets endpoint)
    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: "gpt-realtime",
          instructions: ECHO_SYSTEM_PROMPT,
          audio: {
            output: { voice: "sage" },
            input: {
              transcription: { model: "whisper-1", language: "en" },
              turn_detection: {
                type: "server_vad",
                threshold: 0.8,
                prefix_padding_ms: 500,
                silence_duration_ms: 1500,
              },
            },
          },
          tools: [
          {
            type: "function",
            name: "navigate_to_patients",
            description: "Navigate the user to the patients page where they can learn about financing options",
            parameters: {
              type: "object",
              properties: {},
              required: []
            }
          },
          {
            type: "function",
            name: "navigate_to_providers",
            description: "Navigate the user to the providers page where dental practices can learn about offering financing to their patients",
            parameters: {
              type: "object",
              properties: {},
              required: []
            }
          },
          {
            type: "function",
            name: "navigate_to_financing_application",
            description: "Navigate the user directly to the patient financing application form where they can apply for dental financing",
            parameters: {
              type: "object",
              properties: {},
              required: []
            }
          },
          {
            type: "function",
            name: "navigate_to_about",
            description: "Navigate the user to the about page to learn more about DentiPay as a company",
            parameters: {
              type: "object",
              properties: {},
              required: []
            }
          },
          {
            type: "function",
            name: "get_started_providers",
            description: "Open the provider signup form for dental practices wanting to get started with DentiPay",
            parameters: {
              type: "object",
              properties: {},
              required: []
            }
          },
          {
            type: "function",
            name: "set_language",
            description: "Switch the website interface language. Only call this for English or Spanish - the voice can speak any language but the website only supports these two.",
            parameters: {
              type: "object",
              properties: {
                language: {
                  type: "string",
                  enum: ["en", "es"],
                  description: "The language code: 'en' for English, 'es' for Spanish"
                }
              },
              required: ["language"]
            }
          }
          ],
          tool_choice: "auto",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Session created successfully:", data?.session?.id);

    // Reshape to keep backward compatibility with existing client
    const payload = {
      ...data,
      client_secret: { value: data.value, expires_at: data.expires_at },
      id: data?.session?.id,
    };

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
