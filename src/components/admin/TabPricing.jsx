import React, { useState } from 'react';
import { CreditCard, Check, Plus, Trash2, Sparkles, Trophy, Rocket } from 'lucide-react';

export function TabPricing({ pricing = [], onRequestSave }) {
  const [plans, setPlans] = useState(pricing.length ? JSON.parse(JSON.stringify(pricing)) : []);

  const handlePlanChange = (index, field, value) => {
    setPlans((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddFeature = (planIndex) => {
    setPlans((prev) => {
      const copy = [...prev];
      copy[planIndex].features = [...(copy[planIndex].features || []), 'New Included Service / Feature'];
      return copy;
    });
  };

  const handleFeatureChange = (planIndex, featureIndex, value) => {
    setPlans((prev) => {
      const copy = [...prev];
      const newFeatures = [...copy[planIndex].features];
      newFeatures[featureIndex] = value;
      copy[planIndex].features = newFeatures;
      return copy;
    });
  };

  const handleRemoveFeature = (planIndex, featureIndex) => {
    setPlans((prev) => {
      const copy = [...prev];
      copy[planIndex].features = copy[planIndex].features.filter((_, i) => i !== featureIndex);
      return copy;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onRequestSave('Pricing & Plans', {
      pricing: plans,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase block mb-1">
            SECTION CONFIGURATION // 06
          </span>
          <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            PRICING TIERS & PLANS ({plans.length})
          </h2>
          <p className="font-chakra text-xs text-neutral-400 mt-1">
            Configure tier names, prices ($), features, deliverables, and featured highlights.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save Pricing Changes</span>
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan, planIdx) => (
          <div
            key={planIdx}
            className={`p-6 rounded-2xl bg-[#090b12] border transition-all flex flex-col justify-between ${
              plan.featured
                ? 'border-[#00F0FF]/60 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative'
                : 'border-white/10'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00F0FF] text-black text-[10px] font-mono font-bold uppercase tracking-widest">
                MOST POPULAR // FEATURED
              </span>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                  PLAN 0{planIdx + 1}
                </span>

                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-neutral-400">
                  <input
                    type="checkbox"
                    checked={!!plan.featured}
                    onChange={(e) => handlePlanChange(planIdx, 'featured', e.target.checked)}
                    className="accent-[#00F0FF]"
                  />
                  <span>Featured</span>
                </label>
              </div>

              {/* Plan Name & Price */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-neutral-400 uppercase">TIER NAME</label>
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => handlePlanChange(planIdx, 'name', e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 focus:border-[#00F0FF] rounded text-sm font-orbitron font-bold text-white uppercase focus:outline-none"
                />

                <label className="block text-[10px] font-mono text-neutral-400 uppercase mt-2">SUBTITLE</label>
                <input
                  type="text"
                  value={plan.subtitle}
                  onChange={(e) => handlePlanChange(planIdx, 'subtitle', e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 focus:border-[#00F0FF] rounded text-xs text-neutral-300 focus:outline-none font-chakra"
                />

                <label className="block text-[10px] font-mono text-neutral-400 uppercase mt-2">PRICE (DOLLARS)</label>
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) => handlePlanChange(planIdx, 'price', e.target.value)}
                  placeholder="$490"
                  className="w-full px-3 py-1.5 bg-black/40 border border-white/10 focus:border-[#00F0FF] rounded text-lg font-orbitron font-extrabold text-[#00F0FF] focus:outline-none"
                />
              </div>

              {/* Included Features List */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                    INCLUDED FEATURES ({plan.features?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddFeature(planIdx)}
                    className="text-[10px] font-mono text-[#00F0FF] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                  {plan.features?.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(planIdx, fIdx, e.target.value)}
                        className="flex-1 px-2.5 py-1 bg-black/50 border border-white/10 focus:border-[#00F0FF] rounded text-xs text-neutral-200 focus:outline-none font-chakra"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(planIdx, fIdx)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
