
export enum Tier {
  TIER_1 = 'Tier 1',
  TIER_2 = 'Tier 2'
}

export interface Sponsor {
  brandName: string;
  industryCategory: string;
  rationale: string;
  decisionMakerTitle: string;
  tier: Tier;
  fitFactors: string[];
  website: string;
  contactLead: string;
  contactClue: string;
  email: string;
  phone: string;
  source: string;
}

export interface TargetingRequest {
  property: string;
  geography: string;
  audienceProfile: string;
  sponsorshipGoal: string;
}

export interface TargetingResult {
  sponsors: Sponsor[];
  strategyHeadline: string;
  executiveSummary: string;
}
