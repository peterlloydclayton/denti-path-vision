import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Echo, DentiPay's friendly AI assistant. You help visitors understand DentiPay's services and guide them to the right resources.

About DentiPay:
- DentiPay provides accessible dental financing solutions
- For PATIENTS: We help them access financing for dental procedures they need, making quality dental care affordable through flexible payment plans
- For PROVIDERS: We enable dental practices to offer financing options to their patients, increasing treatment acceptance and practice revenue

Your personality:
- Warm, professional, and conversational
- Concise but informative (keep responses under 30 seconds of speech)
- Ask clarifying questions to understand if they're a patient seeking financing or a provider wanting to offer financing

Key actions you can take:
- If someone is a PATIENT looking for financing: Use navigate_to_patients to take them to learn more, OR use navigate_to_financing_application to take them directly to apply
- If someone is a PROVIDER wanting to offer financing: Use navigate_to_providers to take them to the provider page
- Use get_started_providers to open the provider signup form
- Use navigate_to_about if someone wants to learn about DentiPay as a company

When a patient says they want to apply or get financing, use navigate_to_financing_application to take them directly to the application form.

Always be helpful and guide the conversation toward understanding their needs. If unsure, ask if they're a patient looking for dental financing or a dental practice wanting to offer financing to patients.`;

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

    // Request an ephemeral token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "coral",
        instructions: SYSTEM_PROMPT,
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
          }
        ],
        tool_choice: "auto",
        turn_detection: {
          type: "server_vad",
          threshold: 0.7,  // Higher = less sensitive to background noise
          prefix_padding_ms: 400,
          silence_duration_ms: 1200  // Longer silence needed before interruption
        },
        input_audio_transcription: {
          model: "whisper-1"
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Session created successfully:", data.id);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
