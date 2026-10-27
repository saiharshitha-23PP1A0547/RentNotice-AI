import React, { useState, useRef } from 'react';
import { NoticeDraft } from '../types';
import { Download, Printer, Save, ArrowLeft, ShieldCheck, AlertCircle, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DocumentEditorProps {
  draft: NoticeDraft;
  onSave: (updatedDraft: NoticeDraft) => void;
  onBack: () => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  draft,
  onSave,
  onBack
}) => {
  const [currentDraft, setCurrentDraft] = useState<NoticeDraft>({ ...draft });
  const [savedMessage, setSavedMessage] = useState(false);
  const [exporting, setExporting] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (field: keyof NoticeDraft['content'], value: string) => {
    setCurrentDraft(prev => ({
      ...prev,
      updatedAt: new Date().toISOString().split('T')[0],
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(currentDraft);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleExportPDF = async () => {
    if (!documentRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(documentRef.current, { scale: 2, logging: false });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`${currentDraft.title.replace(/\s+/g, '_')}_Legal_Notice.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Error exporting PDF. Please use browser print.');
    } finally {
      setExporting(false);
    }
  };

  const handleExportDOCX = () => {
    const textContent = `
${currentDraft.content.subject}

${currentDraft.content.senderRecipientBlock}

FACTUAL BACKGROUND:
${currentDraft.content.factualBackground}

CONTRACTUAL PROVISIONS:
${currentDraft.content.contractualProvisions}

LEGAL PROVISIONS:
${currentDraft.content.legalProvisions}

REQUESTED ACTION:
${currentDraft.content.requestedAction}

RESPONSE DEADLINE:
${currentDraft.content.responseDeadline}

RESERVATION OF RIGHTS:
${currentDraft.content.reservationOfRights}

${currentDraft.content.signatureBlock}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentDraft.title.replace(/\s+/g, '_')}_Notice.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{currentDraft.title}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold uppercase">
                  {currentDraft.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Last updated: {currentDraft.updatedAt}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedMessage && (
              <span className="text-xs text-teal-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4 text-teal-600" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handleExportDOCX}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Export Text</span>
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Prominent Legal Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Legal Review Checkpoint:</strong> AI-generated draft for review. Consult a qualified advocate before sending this notice via Registered Post Acknowledgment Due (RPAD).
          </span>
        </div>

        {/* AI Review Flags Box */}
        {currentDraft.content.aiReviewFlags && currentDraft.content.aiReviewFlags.length > 0 && (
          <div className="p-5 bg-teal-50/80 rounded-2xl border border-teal-200 space-y-2">
            <h3 className="font-bold text-teal-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>AI Advocate Review Recommendations</span>
            </h3>
            <ul className="list-disc pl-5 text-xs text-teal-800 space-y-1">
              {currentDraft.content.aiReviewFlags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notice Document Editor Canvas (Print / PDF container) */}
        <div ref={documentRef} className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200 space-y-8 font-serif text-slate-900">
          
          {/* Subject Line */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">Subject Line</label>
            <textarea
              rows={2}
              value={currentDraft.content.subject}
              onChange={(e) => handleContentChange('subject', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 font-bold text-sm sm:text-base focus:outline-none focus:border-teal-500 font-sans uppercase"
            ></textarea>
          </div>

          {/* Sender & Recipient Block */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">Sender & Recipient Particulars</label>
            <textarea
              rows={4}
              value={currentDraft.content.senderRecipientBlock}
              onChange={(e) => handleContentChange('senderRecipientBlock', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 font-sans whitespace-pre-line"
            ></textarea>
          </div>

          {/* Factual Background */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">1. Factual Background</label>
            <textarea
              rows={5}
              value={currentDraft.content.factualBackground}
              onChange={(e) => handleContentChange('factualBackground', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 leading-relaxed whitespace-pre-line"
            ></textarea>
          </div>

          {/* Contractual Provisions */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">2. Contractual Provisions</label>
            <textarea
              rows={3}
              value={currentDraft.content.contractualProvisions}
              onChange={(e) => handleContentChange('contractualProvisions', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 leading-relaxed whitespace-pre-line"
            ></textarea>
          </div>

          {/* Legal Provisions */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">3. Applicable Legal Provisions (Transfer of Property Act / State Rent Act)</label>
            <textarea
              rows={3}
              value={currentDraft.content.legalProvisions}
              onChange={(e) => handleContentChange('legalProvisions', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 leading-relaxed whitespace-pre-line"
            ></textarea>
          </div>

          {/* Requested Action */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">4. Requested Action & Compliance</label>
            <textarea
              rows={3}
              value={currentDraft.content.requestedAction}
              onChange={(e) => handleContentChange('requestedAction', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 leading-relaxed whitespace-pre-line"
            ></textarea>
          </div>

          {/* Response Deadline */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">5. Stated Response Deadline</label>
            <textarea
              rows={2}
              value={currentDraft.content.responseDeadline}
              onChange={(e) => handleContentChange('responseDeadline', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 leading-relaxed whitespace-pre-line"
            ></textarea>
          </div>

          {/* Reservation of Rights */}
          <div className="space-y-2 pb-6 border-b border-slate-200">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">6. Reservation of Rights</label>
            <textarea
              rows={2}
              value={currentDraft.content.reservationOfRights}
              onChange={(e) => handleContentChange('reservationOfRights', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 leading-relaxed whitespace-pre-line"
            ></textarea>
          </div>

          {/* Signature Block */}
          <div className="space-y-2">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">Signature & Date Block</label>
            <textarea
              rows={4}
              value={currentDraft.content.signatureBlock}
              onChange={(e) => handleContentChange('signatureBlock', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-teal-500 font-sans whitespace-pre-line"
            ></textarea>
          </div>

        </div>

      </div>
    </div>
  );
};
