import React from 'react';
import { FileText, Lock, Download, Upload, ShieldCheck } from 'lucide-react';
import { SEEDED_DOCUMENTS } from '../../services/mockDataSeeder';

export const DocumentManager: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Neon Object Storage Document Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Secure signed URLs, consent forms, physical accessibility audit reports & receipts.
          </p>
        </div>

        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5">
          <Upload className="w-4 h-4" />
          <span>Upload Confidential Document</span>
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-extrabold">
              <th className="py-3">Filename</th>
              <th className="py-3">Classification</th>
              <th className="py-3">Uploaded By</th>
              <th className="py-3">Date</th>
              <th className="py-3 text-right">Signed Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
            {SEEDED_DOCUMENTS.map((doc) => (
              <tr key={doc.id}>
                <td className="py-3.5 font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>{doc.originalFilename}</span>
                </td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-extrabold text-[10px] rounded uppercase">
                    {doc.classification}
                  </span>
                </td>
                <td className="py-3.5 text-slate-600 dark:text-slate-400">{doc.uploadedByName}</td>
                <td className="py-3.5 text-slate-500">{doc.createdAt.split('T')[0]}</td>
                <td className="py-3.5 text-right">
                  <a
                    href={doc.signedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-800 dark:text-slate-200 font-bold rounded-lg text-xs inline-flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Signed File</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
