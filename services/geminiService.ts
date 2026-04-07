import { GoogleGenAI, Type } from "@google/genai";
import { TargetingRequest, TargetingResult } from "../types";

const SYSTEM_INSTRUCTION = `You are Pavilion Targeter, a world-class sponsorship targeting assistant.
Your role is to identify and prioritize potential REAL brand sponsors for a given property.

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
- Use REAL companies, not fictional placeholders.
- Prefer companies that are plausible sponsorship targets for the property, geography, audience, and goal provided.
- If a detail cannot be verified with reasonable confidence, return "N/A".
- Accuracy is more important than completeness.

STRICT CONTACT AND SOURCE RULES:
- DO NOT fabricate or guess any phone numbers, email addresses, LinkedIn URLs, names, titles, or sources.
- DO NOT use placeholder data such as:
  - 555 phone numbers
  - fake domains
  - invented emails
  - invented people
  - invented LinkedIn URLs
- If a direct person cannot be confidently identified, use an executive-style fallback such as:
  - "Partnerships Team"
  - "Corporate Communications"
  - "Community Relations"
  - "Marketing Leadership"
- If a direct person cannot be found, the decision-maker title should still be realistic, such as:
  - "Director of Partnerships"
  - "VP of Marketing"
  - "Director of Community Relations"
  - "Corporate Sponsorship Lead"
- Phone must be a COMPANY MAIN LINE or OFFICE NUMBER only, never a guessed direct number.
- Email must only be returned if publicly listed and verifiable.
- LinkedIn must be a real LinkedIn URL if available. Prefer the person’s LinkedIn profile. If not available, provide the company LinkedIn page. If neither can be verified, return "N/A".
- Source must describe the real source or sources used, such as:
  - "Company website - About page"
  - "Company website - Contact page"
  - "Press release"
  - "News article"
  - "LinkedIn - Company page"
  - "LinkedIn - Executive profile"
  - "Community impact report"
  - "Investor relations page"
  - "Apollo"
- If multiple sources support the entry, combine them in one concise source string separated by " / ".

Each sponsor entry must include:
- Brand Name
- Industry Category
- One-sentence rationale (Why it fits)
- Likely decision-maker title
- Tier
- List of specific Fit Factors identified
- Website
- Contact Lead Name and Title
- Contact Clue
- Email
- Company Main Line
- LinkedIn URL
- Source

FIELD RULES:
- brandName: real company name
- industryCategory: specific business category
- rationale: one sentence, strategic and concrete
- decisionMakerTitle: likely role responsible for sponsorships, partnerships, community, or marketing
- tier: must be exactly "Tier 1" or "Tier 2"
- fitFactors: concise list of actual fit reasons
- website: official company website URL if known, otherwise "N/A"
- contactLead: real name and title if verifiable; otherwise an executive-style team or function such as "Partnerships Team"
- contactClue: brief explanation of how this contact path was identified, or "N/A"
- email: public verified email only, otherwise "N/A"
- phone: company main line or office number only, otherwise "N/A"
- linkedinUrl: real LinkedIn profile or company page URL if verifiable, otherwise "N/A"
- source: concise list of real sources used, otherwise "N/A"`;

export async function generateSponsorshipStrategy(request: TargetingRequest): Promise<TargetingResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        text: `Target real sponsors for the following property and return only verifiable research-based results.

Property: ${request.property}
Geography: ${request.geography}
Audience Profile: ${request.audienceProfile}
Sponsorship Goal: ${request.sponsorshipGoal}

Important:
- Use real brands only.
- No fictional demo companies.
- No invented contact data.
- Return "N/A" for any unverifiable detail.
- Include LinkedIn and source data wherever possible.
- Phone must be a company main line or office number only.`
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
            description: "A short executive headline summarizing the overall sponsorship targeting strategy."
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
                brandName: {
                  type: Type.STRING,
                  description: "Real company name."
                },
                industryCategory: {
                  type: Type.STRING,
                  description: "Specific industry or business category."
                },
                rationale: {
                  type: Type.STRING,
                  description: "One-sentence explanation of why the brand fits."
                },
                decisionMakerTitle: {
                  type: Type.STRING,
                  description: "Likely sponsorship, partnerships, community relations, or marketing decision-maker title."
                },
                tier: {
                  type: Type.STRING,
                  description: 'Must be exactly "Tier 1" or "Tier 2".'
                },
                fitFactors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Specific reasons the brand fits the property."
                },
                website: {
                  type: Type.STRING,
                  description: 'Official company website URL if known, otherwise "N/A".'
                },
                contactLead: {
                  type: Type.STRING,
                  description: 'Real name and title if verifiable, otherwise executive-style fallback such as "Partnerships Team".'
                },
                contactClue: {
                  type: Type.STRING,
                  description: 'Short explanation of how the contact path was identified, otherwise "N/A".'
                },
                email: {
                  type: Type.STRING,
                  description: 'Public verified email only, otherwise "N/A".'
                },
                phone: {
                  type: Type.STRING,
                  description: 'Company main line or office number only, otherwise "N/A".'
                },
                linkedinUrl: {
                  type: Type.STRING,
                  description: 'Real LinkedIn profile or company page URL if verifiable, otherwise "N/A".'
                },
                source: {
                  type: Type.STRING,
                  description: 'Real source references such as company website, press release, article, LinkedIn, Apollo, or other public business resources, otherwise "N/A".'
                }
              },
              required: [
                "brandName",
                "industryCategory",
                "rationale",
                "decisionMakerTitle",
                "tier",
                "fitFactors",
                "website",
                "contactLead",
                "contactClue",
                "email",
                "phone",
                "linkedinUrl",
                "source"
              ]
            }
          }
        },
        required: ["strategyHeadline", "executiveSummary", "sponsors"]
      }
    }
  });

  const result = JSON.parse(response.text || "{}");
  return result as TargetingResult;
}
