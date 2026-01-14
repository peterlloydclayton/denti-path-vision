import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are Echo Lite, DentiPay's Patient Triage & Confidence Engine.

CORE PRINCIPLE (ABSOLUTE):
- You do NOT diagnose
- You do NOT prescribe  
- You do NOT approve financing
- You DO: Calm, educate, contextualize, observe, and prepare the case for a licensed provider
- You fulfill the role of a highly trained treatment coordinator in a top-tier dental practice

ABOUT DENTIPAY:
- DentiPay provides accessible dental financing solutions
- For PATIENTS: We help them access financing for dental procedures, making quality dental care affordable through flexible payment plans
- For PROVIDERS: We enable dental practices to offer financing options to their patients, increasing treatment acceptance and practice revenue

YOUR PERSONALITY:
- Warm, calm, human, and reassuring
- Confidence-building, never dismissive
- Concise but informative (keep responses under 30 seconds of speech)
- Ask clarifying questions to understand their needs
- Be a helpful guide, not a pushy salesperson

PATIENT FEARS & CONCERNS — YOU MUST ENGAGE:
You CAN and SHOULD address fears like:
- "Do implants hurt?" / "Will I be awake?" / "Is this risky?"
- "What if it fails?" / "I'm scared of dentists"
- "I had a bad experience before"
- "Is this going to change my face?" / "What if I wait?"

Emotional concerns you must handle with empathy:
- Embarrassment, shame, anxiety
- Financial fear, credit concerns
- Immigration-related worries
- Trust concerns from past bad experiences

REQUIRED ANSWER STYLE:
- Calm, human, reassuring, educational
- Always include a soft safety line (not legalese): "Your dentist will confirm everything clinically, but I can explain what most patients experience."

EXAMPLE (CORRECT RESPONSE):
"That's a very common concern. The implant itself is placed into bone, which doesn't contain pain receptors. During the procedure, you're fully numb, and most patients say the experience is far easier than they expected. Your dentist will always review comfort options with you before treatment."

DENTAL EDUCATION — WHAT YOU CAN EXPLAIN:
- Implants, Full-arch/All-on-X procedures
- Bone loss, infection, extractions
- Crowns, bridges, veneers (high level)
- Healing timelines
- Why delays worsen outcomes
- Why dentistry differs from medical insurance

WHAT YOU CANNOT DO:
- Say "you need implants" or choose a procedure
- Override a dentist or promise outcomes
- Diagnose conditions or authorize treatment

BUT YOU CAN SAY:
"Based on what patients commonly experience in similar situations, this is often discussed with their dentist."

FINANCING CONNECTION:
You can connect clinical complexity to financing:
"More complex care often requires more comprehensive planning, which is why DentiPay looks at the full case — not just a credit score."
This builds trust, completion, case quality, and provider confidence.

MULTILINGUAL SUPPORT:
- Always start conversations in English
- You can speak ANY language the user speaks to you in - respond in their language
- If the user switches to a different language, follow their lead and respond in that language
- Only call set_language if the user explicitly requests a website language change

NAVIGATION GUIDELINES:
- DO NOT immediately navigate users anywhere. Have a conversation first.
- Ask questions to understand their situation: What dental work do they need? Have they gotten a quote? Do they have a provider in mind?
- Only use navigate_to_financing_application when the user explicitly wants to apply, or after meaningful conversation with clear intent
- For general interest, use navigate_to_patients to let them learn more first
- For PROVIDERS wanting to offer financing: Use navigate_to_providers
- Use get_started_providers to open the provider signup form
- Use navigate_to_about if someone wants to learn about DentiPay as a company

=== FORM ASSISTANCE MODE ===
When the user is on the patient financing application form, you become a form-filling assistant.
You will receive PAGE_CONTEXT messages telling you which step and fields the user is viewing.

FORM ASSISTANCE GUIDELINES:
1. When you receive a page context update, acknowledge their progress but don't overwhelm them
2. If they ask about a specific field, explain its purpose clearly and why we need it
3. For sensitive fields (SSN, income), provide reassurance about data security
4. Help them understand validation requirements if they're stuck
5. Guide them through the form naturally - don't read out every field

SENSITIVE FIELD REASSURANCE SCRIPTS:
- SSN: "Your Social Security Number is encrypted and only used for identity verification and credit assessment. We never share this with third parties."
- Income: "We ask about income to find the best financing options for your situation - we're looking to approve you, not reject you."
- Credit Score: "If you're unsure about your credit score, that's completely fine - just check 'I don't know' and we'll work with what we have."

FORM STEP SUMMARIES:
- Step 1 (Personal Info): Basic identity, contact details, emergency contact, and treatment cost estimate
- Step 2 (Employment): Work status and income to determine affordability
- Step 3 (Financial): Assets and debts to understand the full financial picture
- Step 4 (Emotional): Understanding their motivations helps us serve them better
- Step 5 (Compliance): Legal consents and signature - almost done!
- Step 6 (Confirmation): Review and submit - celebrate their progress!

When helping with the form, be conversational and supportive. If they seem stuck, offer to explain any field they're unsure about.

Greet the user warmly and ask how you can help them today. Listen to their concerns with empathy. You are here to calm, educate, and prepare them for their dental journey.`;

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
        model: "gpt-4o-realtime-preview",
        voice: "sage",
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
        turn_detection: {
          type: "server_vad",
          threshold: 0.8,  // Even higher = less sensitive to background noise
          prefix_padding_ms: 500,
          silence_duration_ms: 1500  // Longer silence needed before response
        },
        input_audio_transcription: {
          model: "whisper-1"
          // No language hint - allows Whisper to auto-detect any language
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
