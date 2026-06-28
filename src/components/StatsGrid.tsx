import React from 'react';
import { 
  Award, 
  Users, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  FileText, 
  CheckCircle,
  Clock,
  Coins,
  AlertTriangle
} from 'lucide-react';
import { CandidateInfo } from '../types';

interface StatsGridProps {
  data: CandidateInfo;
}

export default function StatsGrid({ data }: StatsGridProps) {
  // Simple calculation of total votes cast for comparison
  const totalVotesCast = data.votesReceived + data.runnerUpVotes;

  return (
    <div className="space-y-6 font-sans">
      {/* Overview Highlight Banner */}
      <div 
        id="quick-highlights-bar"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-xs"
      >
        <div className="flex items-center gap-3 border-r border-slate-100 last:border-0 pr-2">
          <div className="p-2 bg-slate-50 rounded-lg text-saffron-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Elected Year</p>
            <p className="text-lg font-bold text-slate-800 font-mono">{data.electionYear}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:border-r border-slate-100 last:border-0 pr-2">
          <div className="p-2 bg-slate-50 rounded-lg text-bjp-green-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Constituency No.</p>
            <p className="text-lg font-bold text-slate-800 font-mono">AC #{data.constituencyNo}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-r border-slate-100 last:border-0 pr-2">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Vote Share</p>
            <p className="text-lg font-bold text-slate-800 font-mono">{data.votePercentage}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-lg text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Age in 2026</p>
            <p className="text-lg font-bold text-slate-800 font-mono">{data.age} Yrs</p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 2026 Election Victory Margin (Span 7) */}
        <div 
          id="election-results-card"
          className="lg:col-span-7 bg-white rounded-xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Election Outcome</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5 font-display">2026 Election Verdict</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Victory Margin</span>
                <p className="text-base font-bold text-saffron-600 font-mono">+{data.margin.toLocaleString()} votes</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              In the 2026 West Bengal Assembly elections, Sri Vijay Ojha (BJP) won the Jorasanko seat representing the aspirations of Kolkata Uttar.
            </p>

            {/* Candidate Vote Comparison Visualizer */}
            <div className="space-y-4">
              {/* Winner: Vijay Ojha */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-800 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-saffron-500"></span>
                    Sri Vijay Ojha (BJP) <span className="text-[9px] text-saffron-600 bg-saffron-50 border border-saffron-100 px-1.5 py-0.5 rounded font-bold">Winner</span>
                  </span>
                  <span className="text-slate-600 font-mono text-[11px]">{data.votesReceived.toLocaleString()} votes ({data.votePercentage}%)</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="bg-saffron-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${data.votePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Runner Up: Vijay Upadhyay */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    Vijay Upadhyay (AITC)
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">{data.runnerUpVotes.toLocaleString()} votes ({data.runnerUpPercentage}%)</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="bg-slate-300 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${data.runnerUpPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-50 grid grid-cols-2 gap-4 text-center">
            <div className="p-2.5 rounded-lg border border-slate-100/60 bg-slate-50/50">
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Candidate Share</p>
              <p className="text-base font-bold text-slate-800 font-mono mt-0.5">{data.votePercentage}%</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-100/60 bg-slate-50/50">
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Total Ballots</p>
              <p className="text-base font-bold text-slate-800 font-mono mt-0.5">{totalVotesCast.toLocaleString()}</p>
            </div>
          </div>

        </div>

        {/* Right Column: Key Candidate Metrics (Span 5) */}
        <div 
          id="affidavit-metrics-card"
          className="lg:col-span-5 grid grid-cols-1 gap-6"
        >
          {/* Asset & Liability Card */}
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Affidavit Filings</span>
              <h4 className="text-sm font-bold text-slate-900 mb-4 font-display flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-500" />
                Financial Declarations
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-100/60">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-medium text-slate-600">Declared Assets</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-mono">{data.assets}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-100/60">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span className="text-xs font-medium text-slate-600">Declared Liabilities</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-mono">{data.liabilities}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-[10px] text-slate-400 flex items-start gap-1 p-2 rounded bg-slate-50/30">
              <FileText className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
              <span>Sourced directly from the official ECI candidate affidavit.</span>
            </div>
          </div>

          {/* Credentials Card */}
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-4 font-display">Biography Summary</h4>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg text-saffron-600">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase">Primary Profession</p>
                  <p className="text-xs font-semibold text-slate-800">{data.profession}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg text-bjp-green-600">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase">Educational Level</p>
                  <p className="text-xs font-semibold text-slate-800">{data.education}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg text-sky-600">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase">Office Status</p>
                  <p className="text-xs font-semibold text-slate-800">MLA (Jorasanko, West Bengal)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Affidavit Legal Clarification: Criminal Cases Declarations (Sober & Objective) */}
      <div 
        id="legal-declarations-panel"
        className="bg-slate-50/50 rounded-xl border border-slate-150 p-4"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
              Statutory Disclosures
              <span className="text-[10px] font-bold bg-amber-50 border border-amber-200/80 text-amber-800 px-2 py-0.5 rounded-full">
                {data.criminalCases} Cases Disclosed
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              As disclosed in the 2026 nomination affidavit, Sri Vijay Ojha has listed 7 pending cases. These represent declarations of allegations under judicial process, and do not constitute legal guilt or conviction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
