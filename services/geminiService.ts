
import { GoogleGenAI, Type } from "@google/genai";
import { TargetingRequest, TargetingResult, Tier } from "../types";

const SYSTEM_INSTRUCTION = `You are Pavilion Targeter, a world-class sponsorship targeting assistant.
Your role is to identify and prioritize potential brand sponsors for a given property.

EVALUATION FRAMEWORK:
- Audience match: Does the brand’s target customer align with this audience?
- Geographic presence: Is the brand active or relevant in this geography?
- Objective alignment: Can this property support the stated sponsorship goal?
- Category relevance: Is there a natural connection to the property or audience?
- Activation potential: Can the brand create meaningful activations?

TIERING LOGIC:
- Tier 1 (Strong Strategic Fit): 3 or more strong fit factors align.
- Tier 2 (Secondary / Opportunistic Fit): 2 strong fit factors align.

OUTPUT RULES:
- Generate exactly 5–7 sponsor targets total.
- Typically 3–4 Tier 1 and 2–3 Tier 2.
- Prioritize category diversity.
- Avoid listing direct competitors within the same tier.
- Use executive, practical, and clear tone. No hype or sales language.
- Brand names must be plausible but illustrative/fictional (e.g., "Peak Performance Apparel" instead of "Nike").
- Frame all suggestions as demo examples.

Each sponsor entry must include:
- Brand Name
- Industry Category
- One-sentence rationale (Why it fits)
- Likely decision-maker title (Contact Lead)
- Tier
- List of specific Fit Factors identified
- Website (plausible URL)
- Contact Lead Name and Title (e.g., "Sarah Johnson, Director of Partnerships")
- Contact Clue (best available contact clue, e.g., "VP of Partnerships mentioned in press release" or "Media contact: press@company.com")
- Email (if publicly available, e.g., "partnerships@brand.com")
- Phone (if available, e.g., "+1-555-0123")
- Source (e.g., "Press release / About page / News / LinkedIn")`;

export async function generateSponsorshipStrategy(request: TargetingRequest): Promise<TargetingResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        text: `Target sponsors for the following:
        Property: ${request.property}
        Geography: ${request.geography}
        Audience Profile: ${request.audienceProfile}
        Sponsorship Goal: ${request.sponsorshipGoal}`
      }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategyHeadline: {
            type: Type.STRING,
            description: "A short, bold, executive headline summarizing the strategy (e.g., 'Local, family-focused brand partnerships prioritized for community engagement.')"
          },
          executiveSummary: {
            type: Type.STRING,
            description: "A brief executive summary of the targeting strategy."
          },
          sponsors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                brandName: { type: Type.STRING },
                industryCategory: { type: Type.STRING },
                rationale: { type: Type.STRING },
                decisionMakerTitle: { type: Type.STRING },
                tier: { 
                    type: Type.STRING,
                    description: "Tier 1 or Tier 2 based on evaluation logic."
                },
                fitFactors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                website: { type: Type.STRING },
                contactLead: { type: Type.STRING },
                contactClue: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                source: { type: Type.STRING }
              },
              required: ["brandName", "industryCategory", "rationale", "decisionMakerTitle", "tier", "fitFactors", "website", "contactLead", "contactClue", "email", "phone", "source"]
            }
          }
        },
        required: ["strategyHeadline", "executiveSummary", "sponsors"]
      }
    }
  });

  const result = JSON.parse(response.text || '{}');
  return result as TargetingResult;
}
