import React, { useState } from 'react';
import { FileText, Sparkles, Upload, ArrowRight, ShieldCheck, AlertCircle, Loader2, MessageSquare } from 'lucide-react';

interface DocumentAssistantProps {
  onProceedToNoticeWithData: (extractedData: any) => void;
}

export const DocumentAssistant: React.FC<DocumentAssistantProps> = ({ onProceedToNoticeWithData }) => {
  const [agreementText, setAgreementText] = useState(`LEAVE AND LICENSE AGREEMENT
This agreement is made on this 1st day of January 2025 between Mr. Rajesh Sharma (hereinafter called the 'Licensor') and Mr. Amit Patel (hereinafter called the 'Licensee').
Property: Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053.
1. Monthly License Fee: The Licensee shall pay ₹35,000/- per month on or before the 7th day of each calendar month.
2. Security Deposit: An interest-free security deposit of ₹1,00,000/- has been paid by the Licensee.
3. Tenure: The agreement is valid for 11 months from 01.01.2025 to 30.11.2025.
4. Notice Period: Either party may terminate this agreement by giving 1 month prior written notice after a lock-in period of 6 months.`);
  
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/analyze-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText: agreementText, fileName: 'Rental_Agreement_Mumbai.pdf' })
      });
      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        throw new Error('Analysis failed.');
      }
    } catch (err: any) {
      alert(err.message || 'Error analyzing agreement.');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;
    const q = chatQuestion;
    setChatQuestion('');
    setChatHistory(prev => [...prev, { sender: 'user', text: q }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/legal-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, context: agreementText })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.answer || 'No answer returned.' }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'ai', text: 'Error fetching response from legal assistant.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AI Document Assistant & Agreement Analyzer</h1>
              <p className="text-sm text-slate-600">Upload or paste rental agreements to extract key clauses, identify missing information, and flag legal risks.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input & Upload Column */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Rental Agreement Content</label>
              <textarea
                rows={12}
                value={agreementText}
                onChange={(e) => setAgreementText(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-teal-500 bg-slate-50/50 leading-relaxed"
                placeholder="Paste extracted text from rental agreement..."
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Supports PDF, DOCX text extraction</span>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-teal-400 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Agreement...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Agreement with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Q&A Section */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>Ask Questions About This Agreement</span>
              </h3>
              
              <div className="max-h-60 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                {chatHistory.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">Ask things like: "What is the notice period?" or "Is there a penalty for late rent?"</p>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div key={idx} className={`p-3 rounded-xl ${msg.sender === 'user' ? 'bg-teal-600 text-white ml-8' : 'bg-white text-slate-800 border border-slate-200 mr-8'}`}>
                      <p className="font-semibold mb-1 uppercase text-[10px] opacity-75">{msg.sender === 'user' ? 'You' : 'RentNotice AI'}</p>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))
                )}
                {chatLoading && <p className="text-xs text-teal-600 italic">Thinking...</p>}
              </div>

              <form onSubmit={handleAskQuestion} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a legal or contractual question..."
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
                />
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold">
                  Ask
                </button>
              </form>
            </div>
          </div>

          {/* Analysis Results Column */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Agreement Analysis Summary</span>
              {analysisResult && (
                <button
                  onClick={() => onProceedToNoticeWithData(analysisResult)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <span>Draft Notice from Agreement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </h3>

            {!analysisResult ? (
              <div className="py-24 text-center text-slate-400 space-y-3">
                <FileText className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                <p className="text-sm">Click "Analyze Agreement with AI" to generate structural extraction and legal risk flags.</p>
              </div>
            ) : (
              <div className="space-y-6 text-sm">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 text-teal-700">Executive Summary</h4>
                  <p className="text-slate-700 text-xs leading-relaxed">{analysisResult.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Rent</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{analysisResult.keyTerms?.monthlyRent}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Security Deposit</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{analysisResult.keyTerms?.securityDeposit}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Key Clauses Extracted</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {analysisResult.clauses?.map((c: any, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <span className="font-bold text-teal-700">{c.clauseNo}: {c.title}</span>
                        <p className="text-slate-600 mt-1">{c.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {analysisResult.riskFlags && analysisResult.riskFlags.length > 0 && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                    <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Legal Risk & Ambiguity Flags</span>
                    </h4>
                    <ul className="list-disc pl-5 text-xs text-amber-800 space-y-1">
                      {analysisResult.riskFlags.map((risk: string, idx: number) => (
                        <li key={idx}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
