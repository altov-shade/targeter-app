
import React from 'react';
import { TargetingRequest } from '../types';

interface InputSectionProps {
  request: TargetingRequest;
  onChange: (field: keyof TargetingRequest, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ request, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-bullseye text-blue-600"></i>
        Campaign Parameters
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Property Name</label>
          <input 
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="e.g. Gotham City Marathon"
            value={request.property}
            onChange={(e) => onChange('property', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Geography</label>
          <input 
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="e.g. Northeast Region, USA"
            value={request.geography}
            onChange={(e) => onChange('geography', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Audience Profile</label>
          <textarea 
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
            placeholder="e.g. Adults 25-45, Health-conscious, High-disposable income"
            value={request.audienceProfile}
            onChange={(e) => onChange('audienceProfile', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Sponsorship Goal</label>
          <select 
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
            value={request.sponsorshipGoal}
            onChange={(e) => onChange('sponsorshipGoal', e.target.value)}
          >
            <option value="">Select Primary Objective</option>
            <option value="Brand Awareness">Brand Awareness</option>
            <option value="Direct Lead Generation">Direct Lead Generation</option>
            <option value="Community Engagement">Community Engagement</option>
            <option value="Product Trial / Sampling">Product Trial / Sampling</option>
            <option value="Employee Morale / Recruiting">Employee Morale / Recruiting</option>
          </select>
        </div>

        <button 
          onClick={onSubmit}
          disabled={isLoading || !request.property || !request.sponsorshipGoal}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
            isLoading || !request.property || !request.sponsorshipGoal
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100'
          }`}
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin"></i>
              Analyzing Data...
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Generate Targets
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
