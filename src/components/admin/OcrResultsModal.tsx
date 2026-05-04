import { useState } from "react";
import { OcrResponse } from "@/services/ocrService";

interface OcrResultsModalProps {
  result: OcrResponse;
  fileName: string;
  onClose: () => void;
  onConfirm?: (data: OcrResponse["data"]) => void;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
        <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{title}</h4>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs text-slate-500 w-32 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-xs text-slate-800 font-medium">{value}</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100">
      {children}
    </span>
  );
}

export default function OcrResultsModal({ result, fileName, onClose, onConfirm }: OcrResultsModalProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "text" | "structured">("summary");
  const { data } = result;

  const extracted = data.structuredData;
  const info = extracted?.info;
  const emailList = extracted?.emails || extracted?.extractedData?.emails || [];
  const phoneList = extracted?.phones || extracted?.extractedData?.phones || [];
  const dateList = extracted?.dates || extracted?.extractedData?.dates || [];
  const amountList = extracted?.potentialAmounts || extracted?.extractedData?.potentialAmounts || [];
  const headingList = extracted?.headings || extracted?.extractedData?.headings || [];
  const sheets = extracted?.sheets;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90%] sm:max-w-4xl sm:max-h-[85vh] z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-800">Extraction Results</h2>
            <p className="text-xs text-slate-400 mt-0.5">{fileName}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium">
              {data.fileType} • {data.wordCount} words
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-4 pb-0 border-b border-slate-100 flex-shrink-0">
          {(["summary", "text", "structured"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-t-lg text-xs font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-violet-50 text-violet-700 border border-b-0 border-violet-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {tab === "summary" ? "Summary" : tab === "text" ? "Extracted Text" : "Structured Data"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {activeTab === "summary" && (
            <div className="space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Words", value: data.wordCount },
                  { label: "Characters", value: data.charCount },
                  { label: "File Type", value: data.fileType },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 rounded-lg px-4 py-3 text-center border border-slate-100">
                    <p className="text-xs text-slate-500">{stat.label}</p>
                    <p className="text-lg font-bold text-slate-800 mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* PDF info */}
              {info && (info.title || info.author) && (
                <SectionCard title="Document Info">
                  <div className="space-y-2">
                    {info.title && <DataRow label="Title" value={info.title} />}
                    {info.author && <DataRow label="Author" value={info.author} />}
                    {info.subject && <DataRow label="Subject" value={info.subject} />}
                    {info.creationDate && <DataRow label="Created" value={info.creationDate} />}
                    {extracted?.pages && <DataRow label="Pages" value={extracted.pages} />}
                    {extracted?.confidence && (
                      <DataRow label="OCR Confidence" value={`${(extracted.confidence * 100).toFixed(1)}%`} />
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Excel sheets */}
              {sheets && Object.keys(sheets).length > 0 && (
                <SectionCard title="Excel Sheets">
                  <div className="space-y-2">
                    {Object.entries(sheets).map(([sheetName, sheet]) => (
                      <div key={sheetName} className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-xs font-bold text-slate-700">{sheetName}</p>
                          <span className="text-xs text-slate-400">{sheet.rowCount} rows</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {sheet.headers.slice(0, 8).map((h, i) => (
                            <Chip key={i}>{String(h)}</Chip>
                          ))}
                          {sheet.headers.length > 8 && <Chip>...+{sheet.headers.length - 8}</Chip>}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Quick findings */}
              {(emailList.length > 0 || phoneList.length > 0 || dateList.length > 0) && (
                <SectionCard title="Quick Findings">
                  <div className="space-y-3">
                    {emailList.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-1.5">📧 Emails</p>
                        <div className="flex flex-wrap gap-1">
                          {emailList.slice(0, 10).map((e, i) => <Chip key={i}>{e}</Chip>)}
                          {emailList.length > 10 && <Chip>...+{emailList.length - 10}</Chip>}
                        </div>
                      </div>
                    )}
                    {phoneList.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-1.5">📞 Phones</p>
                        <div className="flex flex-wrap gap-1">
                          {phoneList.slice(0, 10).map((p, i) => <Chip key={i}>{p}</Chip>)}
                        </div>
                      </div>
                    )}
                    {dateList.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-1.5">📅 Dates</p>
                        <div className="flex flex-wrap gap-1">
                          {dateList.slice(0, 10).map((d, i) => <Chip key={i}>{d}</Chip>)}
                        </div>
                      </div>
                    )}
                    {amountList.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-1.5">💰 Amounts</p>
                        <div className="flex flex-wrap gap-1">
                          {amountList.slice(0, 10).map((a, i) => <Chip key={i}>{a}</Chip>)}
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}
            </div>
          )}

          {activeTab === "text" && (
            <div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <textarea
                  readOnly
                  value={data.text}
                  className="w-full h-96 text-xs font-mono text-slate-700 bg-transparent resize-none focus:outline-none leading-relaxed"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-right">
                {data.text.split(/\s+/).filter(Boolean).length} words • {data.charCount} characters
              </p>
            </div>
          )}

          {activeTab === "structured" && (
            <div className="space-y-4">
              {headingList.length > 0 && (
                <SectionCard title="Detected Headings">
                  <div className="flex flex-col gap-1.5">
                    {headingList.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-4 h-4 rounded bg-violet-100 text-violet-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i + 1}</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {sheets && Object.entries(sheets).map(([sheetName, sheet]) => (
                <SectionCard key={sheetName} title={`Sheet: ${sheetName}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-100">
                          {sheet.headers.map((h, i) => (
                            <th key={i} className="text-left px-2 py-1.5 font-semibold text-slate-500 bg-slate-50 whitespace-nowrap">
                              {String(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sheet.data.slice(0, 10).map((row, i) => (
                          <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                            {sheet.headers.map((h, j) => (
                              <td key={j} className="px-2 py-1.5 text-slate-700 whitespace-nowrap">
                                {String(row[String(h)] ?? "")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {sheet.data.length > 10 && (
                      <p className="text-xs text-slate-400 mt-2 text-center">
                        + {sheet.data.length - 10} more rows
                      </p>
                    )}
                  </div>
                </SectionCard>
              ))}

              {!headingList.length && !sheets && (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No structured data detected in this file.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={() => { onConfirm(data); onClose(); }}
              className="px-5 py-2 text-xs font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700 active:scale-95 transition-all shadow-sm"
            >
              Use Data
            </button>
          )}
        </div>
      </div>
    </>
  );
}
