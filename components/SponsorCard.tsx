
import React, { useState } from 'react';
import { Sponsor, Tier } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tag, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  Check, 
  Eye, 
  EyeOff, 
  FilePlus,
  Info
} from 'lucide-react';

interface SponsorCardProps {
  sponsor: Sponsor;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  const [showContact, setShowContact] = useState(false);
  const isTier1 = sponsor.tier === Tier.TIER_1 || sponsor.tier.toLowerCase().includes('1');

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md flex flex-col h-full ${isTier1 ? 'border-blue-100 border-l-4 border-l-blue-600' : 'border-slate-200 border-l-4 border-l-slate-400'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${isTier1 ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600'}`}>
            {isTier1 ? 'Strategic Fit' : 'Opportunistic Fit'}
          </span>
          <h3 className="text-xl font-bold text-slate-900 break-words">{sponsor.brandName}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <p className="text-xs font-medium text-blue-600 flex items-center gap-1">
              <Tag size={10} />
              {sponsor.industryCategory}
            </p>
            <a 
              href={sponsor.website.startsWith('http') ? sponsor.website : `https://${sponsor.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors break-all"
            >
              <Globe size={10} />
              {sponsor.website}
            </a>
          </div>
        </div>
        <div className="sm:text-right sm:max-w-[40%] shrink-0">
          <p className="text-[10px] text-slate-400 font-semibold uppercase">Decision Maker</p>
          <p className="text-[13px] font-semibold text-slate-700 leading-tight break-words">{sponsor.decisionMakerTitle}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-100 flex-grow">
        <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">Why it fits</p>
        <p className="text-slate-700 text-sm italic leading-relaxed">
          &ldquo;{sponsor.rationale}&rdquo;
        </p>
      </div>

      <div className="mb-6">
        <p className="text-[10px] text-slate-400 font-semibold uppercase mb-2">Key Fit Factors</p>
        <div className="flex flex-wrap gap-2">
          {sponsor.fitFactors.map((factor, idx) => (
            <span key={idx} className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1">
              <Check size={10} className="text-green-500" />
              {factor}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <User size={10} />
                    Contact Lead
                  </p>
                  <p className="text-sm font-bold text-slate-800">{sponsor.contactLead}</p>
                  <p className="text-xs text-slate-500 italic mt-0.5 flex items-center gap-1">
                    <Info size={10} />
                    {sponsor.contactClue}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Mail size={10} />
                      Email
                    </p>
                    <p className="text-xs font-medium text-slate-700 break-all">{sponsor.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Phone size={10} />
                      Phone
                    </p>
                    <p className="text-xs font-medium text-slate-700">{sponsor.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <LinkIcon size={10} />
                    Source
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {sponsor.source}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100">
        <button 
          onClick={() => setShowContact(!showContact)}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
            showContact 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {showContact ? <EyeOff size={14} /> : <Eye size={14} />}
          {showContact ? 'Hide Details' : 'View Contact Details'}
        </button>
        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
          <FilePlus size={14} />
          Send to Brief
        </button>
      </div>
    </div>
  );
};

export default SponsorCard;
