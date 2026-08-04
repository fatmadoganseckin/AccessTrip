import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Send, HelpCircle } from 'lucide-react';
import { PREDEFINED_QUESTIONS } from '../../types/enquiry';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  caseReference: string;
}

export const HotelEnquiryModal: React.FC<Props> = ({ isOpen, onClose, caseReference }) => {
  const [recipientEmail, setRecipientEmail] = useState('accessibility@wbarcelona.com');
  const [propertyName, setPropertyName] = useState('W Barcelona Accessible Suite');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(['q1', 'q3', 'q6', 'q8']);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const toggleQuestion = (id: string) => {
    if (selectedQuestionIds.includes(id)) {
      setSelectedQuestionIds(selectedQuestionIds.filter(q => q !== id));
    } else {
      setSelectedQuestionIds([...selectedQuestionIds, id]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
                Send Hotel Accessibility Questionnaire
              </h2>
              <span className="text-xs text-slate-500 font-semibold">Case: {caseReference}</span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Questionnaire Dispatched!
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              The property front desk received your structured email request. Replies will be converted into verified evidence records.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            
            {/* Property Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  required
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Select Predefined Questions */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400">
                Select Predefined Questions ({selectedQuestionIds.length} selected)
              </label>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {PREDEFINED_QUESTIONS.map((q) => {
                  const isChecked = selectedQuestionIds.includes(q.id);
                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleQuestion(q.id)}
                      className={`p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{q.question}</span>
                      <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-[10px] font-extrabold rounded">
                        {q.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dispatch CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Questionnaire Email</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
