"use client";
import { useState } from "react";
import { MapPin, Clock, DollarSign, ChevronRight } from "lucide-react";
import ApplyModal from "./apply-modal";

type JobPost = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string | null;
  active: boolean;
};

export default function CareersClient({ jobs }: { jobs: JobPost[] }) {
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  return (
    <>
      <div className="space-y-5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">
                  {job.department}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-amber-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-xl">{job.description}</p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {job.type}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <DollarSign className="w-4 h-4 text-amber-500" />
                      {job.salary}
                    </span>
                  )}
                </div>
                {job.requirements.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {job.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        {req}
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-xs text-gray-400">+{job.requirements.length - 3} more requirements</li>
                    )}
                  </ul>
                )}
              </div>
              <button
                onClick={() => setApplyingTo(job.title)}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all shadow-md shadow-amber-200 flex items-center gap-2 shrink-0"
              >
                Apply Now <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {applyingTo && (
        <ApplyModal jobTitle={applyingTo} onClose={() => setApplyingTo(null)} />
      )}
    </>
  );
}
