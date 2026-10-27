import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const port = process.env.PORT || 8080;

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

// API Endpoints

// 1. Generate Notice Draft
app.post('/api/ai/generate-notice', async (req, res) => {
  try {
    const {
      noticeType,
      landlordName,
      landlordAddress,
      tenantName,
      tenantAddress,
      propertyAddress,
      state,
      monthlyRent,
      amountOverdue,
      securityDeposit,
      dueDate,
      reason,
      desiredResolution,
      clauses,
      responseDays
    } = req.body;

    if (!apiKey) {
      // Fallback mock generation if API key is not configured
      return res.json({
        success: true,
        source: 'mock',
        draft: generateMockNotice({
          noticeType,
          landlordName,
          landlordAddress,
          tenantName,
          tenantAddress,
          propertyAddress,
          state,
          monthlyRent,
          amountOverdue,
          securityDeposit,
          dueDate,
          reason,
          desiredResolution,
          clauses,
          responseDays
        })
      });
    }

    const prompt = `You are a senior Indian legal tech AI expert specializing in Indian property law (Transfer of Property Act 1882, Indian Contract Act 1872, and State Rent Control Acts such as Maharashtra, Delhi, Karnataka, Tamil Nadu).
Generate a formal, professionally structured Indian Legal Notice based on the following input parameters.

INPUT DETAILS:
- Notice Type: ${noticeType || 'Demand for Arrears of Rent & Notice to Quit'}
- Landlord Name: ${landlordName || '[Landlord Name]'}
- Landlord Address: ${landlordAddress || '[Landlord Address]'}
- Tenant Name: ${tenantName || '[Tenant Name]'}
- Tenant Address: ${tenantAddress || '[Tenant Address]'}
- Property Address: ${propertyAddress || '[Property Address]'}
- State Jurisdiction: ${state || 'Maharashtra'}
- Monthly Rent: ₹${monthlyRent || '0'}
- Amount Overdue: ₹${amountOverdue || '0'}
- Security Deposit Held: ₹${securityDeposit || '0'}
- Relevant Due Dates: ${dueDate || 'As per agreement'}
- Reason / Breach: ${reason || 'Non-payment of rent and breach of rental agreement terms'}
- Desired Resolution: ${desiredResolution || 'Payment of outstanding arrears and vacation of premises'}
- Agreement Clauses Referenced: ${clauses || 'Standard lease covenants'}
- Proposed Response Deadline: ${responseDays || '15'} days

STRUCTURE REQUIRED:
Return a JSON object with keys:
1. "subject": A formal subject line for the legal notice.
2. "senderRecipientBlock": Formatted block for Sender and Recipient details with advocate placeholder.
3. "factualBackground": Clear, chronological narrative of facts, tenancy commencement, and defaults.
4. "contractualProvisions": Specific clauses from the rental agreement breached.
5. "legalProvisions": Applicable legal provisions under Indian Law (e.g., Section 106 of Transfer of Property Act 1882, relevant State Rent Control Act sections, Section 73/74 of Indian Contract Act for damages/interest).
6. "requestedAction": Clear demand for payment/vacation/cure.
7. "responseDeadline": Stated deadline (${responseDays || '15'} days from receipt) with warning of legal proceedings (civil suit for recovery, eviction proceedings, summary suit under Order 37 CPC if applicable).
8. "reservationOfRights": Reservation of right to initiate legal action, claim interest (e.g., 18% p.a.), and legal costs.
9. "signatureBlock": Advocate signature placeholder and date.
10. "aiReviewFlags": Array of strings highlighting items that require human lawyer review (e.g., "Verify exact notice period under state law", "Check if lease is unregistered").

Return ONLY valid JSON format without markdown code fences or conversational text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '{}';
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseErr) {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      result = JSON.parse(cleaned);
    }

    res.json({
      success: true,
      source: 'gemini',
      draft: result
    });
  } catch (error: any) {
    console.error('Error generating notice:', error);
    res.json({
      success: true,
      source: 'mock-fallback',
      draft: generateMockNotice(req.body),
      errorNotice: error.message
    });
  }
});

// 2. Analyze Uploaded Agreement
app.post('/api/ai/analyze-agreement', async (req, res) => {
  try {
    const { documentText, fileName } = req.body;

    if (!apiKey) {
      return res.json({
        success: true,
        source: 'mock',
        analysis: {
          summary: "This is a standard Residential Leave and License / Rental Agreement governed under Indian tenancy laws. It outlines monthly rent, security deposit, lock-in period, and maintenance responsibilities.",
          parties: {
            landlord: "A. K. Sharma (Lessor / Licensor)",
            tenant: "Rajesh Kumar (Lessee / Licensee)"
          },
          keyTerms: {
            monthlyRent: "₹25,000",
            securityDeposit: "₹1,00,000",
            tenancyDuration: "11 Months",
            noticePeriod: "1 Month written notice",
            lockInPeriod: "6 Months",
            jurisdiction: "Mumbai, Maharashtra"
          },
          clauses: [
            { clauseNo: "Clause 4", title: "Rent Payment", content: "Rent shall be paid on or before the 7th day of every calendar month." },
            { clauseNo: "Clause 8", title: "Termination", content: "Either party may terminate this agreement by giving 1 month prior written notice after completion of 6 months lock-in." },
            { clauseNo: "Clause 12", title: "Security Deposit", content: "Interest-free security deposit refundable upon vacating after deducting dues." }
          ],
          missingInformation: [
            "Emergency contact details of tenant",
            "Specific bank account details for rent transfer",
            "Inventory list of furniture and fixtures"
          ],
          riskFlags: [
            "No explicit late fee penalty clause mentioned for delayed rent.",
            "Agreement registration status should be verified with Sub-Registrar."
          ]
        }
      });
    }

    const prompt = `Analyze the following rental agreement text extracted from "${fileName || 'document.pdf'}". Provide a structured legal extraction and risk analysis.

AGREEMENT TEXT:
"""
${documentText ? documentText.substring(0, 15000) : 'Standard Residential Rental Agreement'}
"""

Return a JSON object with keys:
1. "summary": Summary of the agreement (string).
2. "parties": Object with landlord and tenant names.
3. "keyTerms": Object with monthlyRent, securityDeposit, tenancyDuration, noticePeriod, lockInPeriod, jurisdiction.
4. "clauses": Array of objects { clauseNo, title, content }.
5. "missingInformation": Array of strings of missing key terms.
6. "riskFlags": Array of strings of legal risks or ambiguities.

Return ONLY valid JSON format.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const textContent = response.text || '{}';
    const parsed = JSON.parse(textContent.replace(/```json/g, '').replace(/```/g, '').trim());
    res.json({ success: true, source: 'gemini', analysis: parsed });
  } catch (error: any) {
    console.error('Error analyzing agreement:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Legal Chat / Q&A
app.post('/api/ai/legal-chat', async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!apiKey) {
      return res.json({
        success: true,
        source: 'mock',
        answer: `Under Indian property law (such as the Transfer of Property Act 1882 and relevant State Rent Control Acts), ${question}. Always ensure proper written notice is served via registered post acknowledgment due (RPAD) or verified email/courier with proof of delivery. Consult a qualified advocate for specific litigation matters.`
      });
    }

    const prompt = `You are RentNotice AI Legal Assistant, an expert in Indian property and tenancy law (Transfer of Property Act 1882, Indian Contract Act 1872, state rent control acts).
Answer the user's question accurately, citing relevant Indian legal principles and advising professional lawyer review where litigation is involved.

Context: ${context || 'General Indian property tenancy context'}
Question: ${question}

Provide a concise, professional, accurate response with appropriate legal citations and disclaimers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.json({ success: true, source: 'gemini', answer: response.text || 'No response.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper for Mock Notice Generation
function generateMockNotice(data: any) {
  const landlord = data.landlordName || 'Rajesh Sharma';
  const tenant = data.tenantName || 'Amit Patel';
  const property = data.propertyAddress || 'Flat No. 402, Sunshine Apartments, Andheri West, Mumbai - 400053';
  const rent = data.monthlyRent || '35,000';
  const overdue = data.amountOverdue || '1,05,000';
  const days = data.responseDays || '15';

  return {
    subject: "LEGAL NOTICE UNDER SECTION 106 OF THE TRANSFER OF PROPERTY ACT, 1882 FOR DEMAND OF ARREARS OF RENT AND TERMINATION OF TENANCY",
    senderRecipientBlock: `FROM:\nAdvocate Rajesh Verma (Counsel for Landlord)\n Chamber No. 12, High Court Chambers, Mumbai\n\nTO:\nMr. ${tenant}\n${property}`,
    factualBackground: `1. That my client, ${landlord}, is the lawful owner and lessor of the residential property bearing address ${property} (hereinafter referred to as the 'Demised Premises').\n2. That vide Registered Leave and License Agreement dated 01.01.2025, the Demised Premises was licensed to you, Mr. ${tenant}, for a monthly license fee/rent of ₹${rent}/- payable on or before the 7th day of each English calendar month.\n3. That you have defaulted in the regular payment of rent for the past 3 months (totaling ₹${overdue}/-) despite repeated oral reminders and WhatsApp messages.`,
    contractualProvisions: `4. That as per Clause 4 of the said Leave and License Agreement, timely payment of monthly rent is an essential condition of the tenancy. Failure to pay for two consecutive months constitutes a material breach of the agreement, entitling the Licensor to terminate the agreement and demand vacant possession.`,
    legalProvisions: `5. That your failure to pay rent constitutes a breach under Section 108(l) of the Transfer of Property Act, 1882. Furthermore, this notice serves as formal notice under Section 106 of the Transfer of Property Act, 1882 terminating your tenancy upon expiry of ${days} days from the receipt of this notice.`,
    requestedAction: `6. You are hereby called upon to make full payment of the outstanding arrears of ₹${overdue}/- along with interest @ 18% per annum and hand over peaceful, vacant, and physical possession of the Demised Premises to my client within ${days} days of receiving this notice.`,
    responseDeadline: `7. If you fail to comply with this notice within ${days} days of receipt, my client shall be constrained to initiate appropriate civil and criminal proceedings against you, including filing a Summary Suit for recovery of money and eviction proceedings before the competent court, holding you liable for all legal costs and damages.`,
    reservationOfRights: `8. This notice is issued without prejudice to all other legal rights, remedies, and claims available to my client under law or equity.`,
    signatureBlock: `Date: ${new Date().toLocaleDateString('en-IN')}\nPlace: Mumbai, Maharashtra\n\n(Advocate Rajesh Verma)\nCounsel for Landlord`,
    aiReviewFlags: [
      "Verify whether the Leave and License agreement was duly stamped and registered with the Sub-Registrar of Assurances.",
      "Check if security deposit adjustment against unpaid rent is contractually permitted."
    ]
  };
}

// Static files / Vite middleware setup
const isProd = process.env.NODE_ENV === 'production' || fs.existsSync(path.join(__dirname, 'dist'));

if (!isProd) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: false }
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`RentNotice AI server running on port ${port} (prod mode: ${isProd})`);
});
